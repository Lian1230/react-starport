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
  portDetail: PortDetail;
  setPortDetail: Dispatch<SetStateAction<PortDetail>>;
}

interface PortDetail {
  location: string;
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
  const [portDetail, setPortDetail] = useState<PortDetail>({
    location: "",
    cargo: null,
  });

  return (
    <StarportContext.Provider
      value={{
        portDetail,
        Reparentable,
        sendReparentableChild,
        setPortDetail,
      }}
    >
      {children}
    </StarportContext.Provider>
  );
};

export const useStarport = () => useContext(StarportContext);
