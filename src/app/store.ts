import {configureStore} from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import noteReducer from '../features/note/noteSlice';
import dogReducer from '../features/dogs/dogSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    note: noteReducer,
    dog: dogReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
