import {createSlice, PayloadAction} from '@reduxjs/toolkit';
interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 3,
};

const countSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.value++;
    },
    addAmount(state, action: PayloadAction<number>) {
      state.value = state.value + action.payload;
    },
  },
});

export const {increment, addAmount} = countSlice.actions;
export default countSlice.reducer;
