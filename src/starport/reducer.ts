import { ReactElement } from "react";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface PortMap {
  [k: string]: PortState;
}

export interface PortState {
  status: string;
  cargo: ReactElement | null;
  rect: { width?: number; height?: number; top?: number; left?: number };
}

// Define the initial state using that type
const initialState: PortMap = {};

export const counterSlice = createSlice({
  name: "starport",
  initialState,
  reducers: {
    updatePort: (
      state,
      action: PayloadAction<{ id: string; portState: PortState }>
    ) => {
      const { id, portState } = action.payload;
      state[id] = portState;
    },
    landing: (state, action: PayloadAction<{ id: string; status: string }>) => {
      const { id, status } = action.payload;
      state[id] = Object.assign(state[id] || {}, { status });
    },
    remove: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (state[id]?.status === "LIFTING") {
        delete state[id];
      }
    },
  },
});

export const { updatePort, landing, remove } = counterSlice.actions;

export default counterSlice.reducer;
