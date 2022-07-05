import { Component, createRef, FC, ReactElement } from "react";
import { StarportState, useStarport } from "./starport-provider";

interface PortEnhanceState extends PortProps {
  starportState: StarportState;
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
    const { id, starportState, children } = props;

    const portState = starportState.portMap[id];
    const currentStatus = portState?.status;
    const expectStatus = `LANDED-${state.portId}`;

    if (currentStatus !== expectStatus) {
      if (!currentStatus) {
        starportState.setPortMap((prev) => {
          return {
            ...prev,
            [id]: { ...prev[id], status: `LANDED-${state.portId}` },
          };
        });
      } else if (currentStatus === "LIFTING") {
        const rect = document
          .getElementById(`${id}-${state.portId}`)
          ?.getBoundingClientRect();

        setTimeout(() => {
          starportState.setPortMap((prev) => ({
            ...prev,
            [id]: { rect, status: "MOVING", cargo: children },
          }));
        }, 0);
      } else if (currentStatus === "MOVING") {
        setTimeout(() => {
          starportState.setPortMap((prev) => {
            starportState.sendReparentableChild(
              `${id}-air`,
              `${id}-land`,
              0,
              0
            );
            return {
              ...prev,
              [id]: { ...prev[id], status: `LANDED-${state.portId}` },
            };
          });
        }, 1000);
      }
    }
    return null;
  }

  componentWillUnmount() {
    const { portId } = this.state;
    const { id, children, starportState } = this.props;

    const rect = document
      .getElementById(`${id}-${portId}`)
      ?.getBoundingClientRect();

    starportState.setPortMap((prev) => {
      starportState.sendReparentableChild(`${id}-land`, `${id}-air`, 0, 0);
      return { ...prev, [id]: { status: "LIFTING", cargo: children, rect } };
    });
    // setTimeout(() => {
    //   starportState.setPortDetail(prev => {
    //     if (prev.status === 'LIFTING'){
    //       const copy = {...prev}
    //       delete co
    //     }
    //     return prev
    //   })
    // }, 300);
  }

  render() {
    const { portId } = this.state;
    const { id, children, starportState } = this.props;
    const portState = starportState.portMap[id];
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
  return <Child {...props} starportState={starportState} />;
};

export const Port = wrapper(PortLand);

const PortAir: FC<{ id: string }> = ({ id }) => {
  const { portMap, Reparentable } = useStarport();
  const portState = portMap[id];
  const { width, height, top, left } = portState?.rect || {};

  return (
    <Reparentable id={`${id}-air`}>
      {["LIFTING", "MOVING"].includes(portState?.status) ? (
        <div
          style={{ width, height, top, left }}
          className="fixed transition-all duration-1000"
        >
          {portState?.cargo}
        </div>
      ) : null}
    </Reparentable>
  );
};

export const AirStation = () => {
  return (
    <div id="air-station">
      <PortAir id="image-1" />
    </div>
  );
};
