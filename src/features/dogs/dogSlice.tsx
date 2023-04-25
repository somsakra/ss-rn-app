import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

// const API_KEY = process.env.API_KEY
const API_KEY = 'xxx';
interface State {
  value: Breed[];
  loading: boolean;
}

const initialState: State = {
  value: [],
  loading: false,
};

interface Breed {
  id: string;
  name: string;
  image: {
    url: string;
  };
}

export const getDog = createAsyncThunk('get/dogs', async thunkAPI => {
  const response = await axios({
    method: 'get',
    url: 'https://api.thedogapi.com/v1/breeds?limit=10&page=0',
    headers: {'x-api-key': API_KEY},
  });
  console.log(response.data);
  return response.data;
});

const dogSlice = createSlice({
  name: 'dog',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getDog.pending, (state, action) => {
        if (state.loading === false) {
          state.loading = true;
        }
      })
      .addCase(getDog.fulfilled, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
          state.value = action.payload;
        }
      });
  },
});

export default dogSlice.reducer;
