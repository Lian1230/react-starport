import { Component } from "react";
import type { FC, ReactElement } from "react";
import { landing, PortState, remove, updatePort } from "./reducer";
import { StarportState, useStarport } from "./starport-provider";
import { useAppDispatch, useAppSelector } from "./store";

interface PortEnhanceState extends PortProps {
  starportState: StarportState;
  dispatch: any;
  portState: PortState;
}
interface PortCompState {
  portId: string;
}
class PortLand extends Component<PortEnhanceState, PortCompState> {
  constructor(props: PortEnhanceState) {
    super(props);
    this.state = { portId: (Math.random() * 100).toFixed(10) };
  }

  static getDerivedStateFromProps(
    props: PortEnhanceState,
    state: PortCompState
  ) {
    const { id, starportState, portState, dispatch, children } = props;

    const currentStatus = portState?.status;
    const expectStatus = `LANDED-${state.portId}`;

    if (currentStatus !== expectStatus) {
      if (!currentStatus) {
        dispatch(landing({ id, status: `LANDED-${state.portId}` }));
      } else if (currentStatus === "LIFTING") {
        const { width, height, top, left } =
          document
            .getElementById(`${id}-${state.portId}`)
            ?.getBoundingClientRect() ?? {};

        setTimeout(() => {
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
        }, 10);
      } else if (currentStatus === "MOVING") {
        setTimeout(() => {
          starportState.sendReparentableChild(`${id}-air`, `${id}-land`, 0, 0);
          dispatch(landing({ id, status: `LANDED-${state.portId}` }));
        }, 1000);
      }
    }
    return null;
  }

  componentWillUnmount() {
    const { portId } = this.state;
    const { id, children, starportState, dispatch } = this.props;

    const { width, height, top, left } =
      document.getElementById(`${id}-${portId}`)?.getBoundingClientRect() ?? {};

    // console.log({ id, rect });

    starportState.sendReparentableChild(`${id}-land`, `${id}-air`, 0, 0);
    dispatch(
      updatePort({
        id,
        portState: {
          status: "LIFTING",
          cargo: children,
          rect: { width, height, top, left },
        },
      })
    );

    setTimeout(() => dispatch(remove(id)), 300);
  }

  render() {
    const { portId } = this.state;
    const { id, children, starportState, portState } = this.props;
    const landed = portState?.status === `LANDED-${portId}`;

    return (
      <>
        {!landed && (
          <div id={`${id}-${portId}`} className="invisible">
            {children}
          </div>
        )}
        <starportState.Reparentable id={`${id}-land`}>
          {landed ? <div id={`${id}-${portId}`}>{children}</div> : null}
        </starportState.Reparentable>
      </>
    );
  }
}

interface PortProps {
  id: string;
  children: ReactElement;
}
const wrapper = (Child: any) => (props: PortProps) => {
  const starportState = useStarport();
  const dispatch = useAppDispatch();
  const portState = useAppSelector((state) => state.starport[props.id]);
  return (
    <Child
      {...props}
      dispatch={dispatch}
      portState={portState}
      starportState={starportState}
    />
  );
};

export const Port = wrapper(PortLand);

const PortAir: FC<{ id: string; portState: any }> = ({ id, portState }) => {
  const { Reparentable } = useStarport();

  return (
    <Reparentable id={`${id}-air`}>
      {["LIFTING", "MOVING"].includes(portState?.status) ? (
        <div
          style={portState.rect}
          className="fixed transition-all duration-1000"
        >
          {portState?.cargo}
        </div>
      ) : null}
    </Reparentable>
  );
};

export const AirStation = () => {
  const portMap = useAppSelector((state) => state.starport);

  return (
    <div id="air-station">
      {Object.keys(portMap).map((id) => (
        <PortAir key={id} id={id} portState={portMap[id]} />
      ))}
    </div>
  );
};
