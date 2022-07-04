import { Component, createRef, FC, ReactElement } from "react";
import { StarportState, useStarport } from "./starport-provider";

interface PortEnhanceState extends PortProps {
  starportState: StarportState;
}
interface PortState {
  portId: string;
}
class PortLand extends Component<PortEnhanceState, PortState> {
  constructor(props: PortEnhanceState) {
    super(props);
    this.state = { portId: (Math.random() * 100).toFixed(10) };
  }

  static getDerivedStateFromProps(props: PortEnhanceState, state: PortState) {
    const { id, starportState, children } = props;

    const currentLocation = starportState.portDetail.location;
    const targetLocation = `LAND-${state.portId}`;

    if (currentLocation !== targetLocation) {
      if (!currentLocation) {
        starportState.setPortDetail((prev) => {
          return { ...prev, location: `LAND-${state.portId}` };
        });
      } else if (currentLocation === "AIR") {
        const rect = document
          .getElementById(`${id}-${state.portId}`)
          ?.getBoundingClientRect();
        console.log("landing", targetLocation, rect);

        setTimeout(() => {
          starportState.setPortDetail((prev) => ({
            ...prev,
            rect,
            location: "AIR-MOVING",
            cargo: children,
          }));
        }, 0);
      } else if (currentLocation === "AIR-MOVING") {
        setTimeout(() => {
          starportState.setPortDetail((prev) => {
            starportState.sendReparentableChild(
              `${id}-air`,
              `${id}-land`,
              0,
              0
            );
            return { ...prev, location: `LAND-${state.portId}` };
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

    starportState.setPortDetail((prev) => {
      starportState.sendReparentableChild(`${id}-land`, `${id}-air`, 0, 0);
      return { ...prev, location: "AIR", cargo: children, rect };
    });
  }

  render() {
    const { portId } = this.state;
    const { id, children, starportState } = this.props;
    const landed = starportState.portDetail.location === `LAND-${portId}`;

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
  const { portDetail, Reparentable } = useStarport();
  const { width, height, top, left } = portDetail.rect || {};

  return (
    <Reparentable id={`${id}-air`}>
      {["AIR", "AIR-MOVING"].includes(portDetail.location) ? (
        <div
          style={{ width, height, top, left }}
          className="fixed transition-all duration-1000"
        >
          {portDetail.cargo}
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
