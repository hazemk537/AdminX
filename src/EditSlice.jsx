import { createSlice, combineReducers } from "@reduxjs/toolkit";

const EditModelOpenSlice = createSlice({
  name: 'EditModelOpen',
  initialState: {
    value: 0,
    toggleDisplay: 0
  },
  reducers: {
    ToggleEditModelOpen: (state) => {
      state.value = !state.value;
    },
    ToggleDisplay: (state) => {
      state.toggleDisplay = !state.toggleDisplay;
    }
  }
});

const editReducer = combineReducers({
  EditModelOpen: EditModelOpenSlice.reducer
});

export const { ToggleEditModelOpen, ToggleDisplay } = EditModelOpenSlice.actions;
export default editReducer;