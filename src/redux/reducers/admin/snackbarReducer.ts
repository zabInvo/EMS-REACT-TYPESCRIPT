import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SnackbarInterface {
  status: boolean;
  type: string | null;
  message: string | null;
  error: boolean;
}

interface ClearSnackbar {
  snackPayload: SnackbarInterface;
}

const initialState: SnackbarInterface = {
  status: false,
  type: null,
  message: "",
  error: false,
};

const snackbarReducer = createSlice({
  name: "Snackbar",
  initialState,
  reducers: {
    SET_SNACKBAR(state, action: PayloadAction<SnackbarInterface>) {
      state.type = action.payload.type;
      state.message = action.payload.message;
      state.error = action.payload.error;
      state.status = action.payload.status;
    },
    CLEAR_SNACKBAR(state, action: PayloadAction<ClearSnackbar>) {
      state.status = action.payload.snackPayload.status;
      state.type = action.payload.snackPayload.type;
      state.message = action.payload.snackPayload.message;
      state.error = action.payload.snackPayload.error;
    },
  },
});

export const { SET_SNACKBAR, CLEAR_SNACKBAR } = snackbarReducer.actions;
export default snackbarReducer.reducer;
