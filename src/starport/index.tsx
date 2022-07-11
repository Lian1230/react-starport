import { Component } from "react";
import type { FC, ReactElement } from "react";
import { landing, PortState, remove, updatePort } from "./reducer";
import { StarportState, useStarport } from "./starport-provider";
import { useAppDispatch, useAppSelector } from "./store";

const DURATION = 1000;

interface PortEnhanceState extends PortProps {
  starportContext: StarportState;
  dispatch: any;
  portState: PortState;
}
interface PortCompState {
  portId: string;
}
class GroundPort extends Component<PortEnhanceState, PortCompState> {
  constructor(props: PortEnhanceState) {
    super(props);
    this.state = { portId: (Math.random() * 100).toFixed(10) };
  }

  static getDerivedStateFromProps(
    props: PortEnhanceState,
    state: PortCompState
  ) {
    const { id, starportContext, portState, dispatch, children } = props;

    const currentStatus = portState?.status;
    const expectStatus = `LANDED-${state.portId}`;

    if (currentStatus !== expectStatus) {
      if (!currentStatus) {
        dispatch(landing({ id, status: `LANDED-${state.portId}` }));
      } else if (currentStatus === "LIFTING") {
        // delay to get accurate rect
        setTimeout(() => {
          const { width, height, top, left } =
            document
              .getElementById(`${id}-${state.portId}`)
              ?.getBoundingClientRect() ?? {};

          dispatch(
            updatePort({
              id,
              portState: {
                rect: { width, height, top, left },
                status: "MOVING",
                cargo: children,
              },
            })
          );
        }, 100);
      } else if (currentStatus === "MOVING") {
        setTimeout(() => {
          starportContext.sendReparentableChild(
            `${id}-air`,
            `${id}-land`,
            0,
            0
          );
          dispatch(landing({ id, status: `LANDED-${state.portId}` }));
        }, DURATION);
      }
    }
    return null;
  }

  rect = {};

  componentDidMount() {
    const { portId } = this.state;
    const { id } = this.props;

    // delay to get accurate rect
    setTimeout(() => {
      const { width, height, top, left } = document
        .getElementById(`${id}-${portId}`)
        ?.getBoundingClientRect()!;
      this.rect = { width, height, top, left };
    }, 100);
  }

  componentWillUnmount() {
    const { id, children, starportContext, dispatch } = this.props;

    starportContext.sendReparentableChild(`${id}-land`, `${id}-air`, 0, 0);
    dispatch(
      updatePort({
        id,
        portState: {
          status: "LIFTING",
          cargo: children,
          rect: this.rect,
        },
      })
    );

    setTimeout(() => {
      dispatch(remove(id));
    }, 300);
  }

  render() {
    const { portId } = this.state;
    const { id, children, starportContext, portState } = this.props;
    const landed = portState?.status === `LANDED-${portId}`;

    return (
      <>
        {!landed && (
          <div id={`${id}-${portId}`} className="invisible">
            {children}
          </div>
        )}
        <starportContext.Reparentable id={`${id}-land`}>
          {landed ? <div id={`${id}-${portId}`}>{children}</div> : null}
        </starportContext.Reparentable>
      </>
    );
  }
}

interface PortProps {
  id: string;
  children: ReactElement;
}
const wrapper = (Child: any) => (props: PortProps) => {
  const starportContext = useStarport();
  const dispatch = useAppDispatch();
  const portState = useAppSelector((state) => state.starport[props.id]);
  return (
    <Child
      {...props}
      dispatch={dispatch}
      portState={portState}
      starportContext={starportContext}
    />
  );
};

export const Port = wrapper(GroundPort);

const SkyPort: FC<{ id: string; portState: any }> = ({ id, portState }) => {
  const { Reparentable } = useStarport();

  const isVisible = ["LIFTING", "MOVING"].includes(portState?.status);

  return (
    <div
      className={`fixed transition-all duration-${DURATION}`}
      style={{ ...portState.rect, display: isVisible ? "block" : "none" }}
    >
      <Reparentable id={`${id}-air`}>
        {isVisible && <div>{portState?.cargo}</div>}
      </Reparentable>
    </div>
  );
};

export const SkyStation = () => {
  const portMap = useAppSelector((state) => state.starport);

  return (
    <div id="air-station">
      {Object.keys(portMap).map((id) => (
        <SkyPort key={id} id={id} portState={portMap[id]} />
      ))}
    </div>
  );
};
