import {
  createContext,
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { createReparentableSpace } from "react-reparenting";

export interface StarportState {
  Reparentable: any;
  sendReparentableChild: any;
  portMap: PortMap;
  setPortMap: Dispatch<SetStateAction<PortMap>>;
}

interface PortMap {
  [k: string]: PortState;
}

interface PortState {
  status: string;
  cargo: ReactElement | null;
  rect?: DOMRect;
}

const StarportContext = createContext<StarportState>({
  portDetail: { location: "LAND", cargo: null },
} as any);

const { Reparentable, sendReparentableChild } = createReparentableSpace();

export const StarportProvider: FC<{
  children: ReactElement | ReactElement[];
}> = ({ children }) => {
  const [portMap, setPortMap] = useState<PortMap>({});

  return (
    <StarportContext.Provider
      value={{
        portMap,
        Reparentable,
        sendReparentableChild,
        setPortMap,
      }}
    >
      {children}
    </StarportContext.Provider>
  );
};

export const useStarport = () => useContext(StarportContext);
