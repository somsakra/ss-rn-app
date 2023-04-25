import {
  createAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import axios from 'axios';

interface INote {
  id: string;
  title: string;
  content: string;
  isDone: boolean;
  request: {
    type: string;
    url: string;
  };
}

interface IValue {
  count: number;
  notes: INote[];
}

interface State {
  value: IValue;
  isLoading: boolean;
}

const initialState: State = {
  value: {count: 0, notes: []},
  isLoading: false,
};

//   const API_URL = import.meta.env.VITE_API_URL;
const API_URL = 'https://api.somsakra.com';
const token: string =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbXNha3JhQGxpdmUuY29tIiwidXNlcklkIjoiNjQzZmMyZGRhYjA5MWZiMTdhOTZmOTg4IiwiaWF0IjoxNjgyNDE0MzUzLCJleHAiOjE2ODI1MDA3NTN9.L5NSC9Ikat9PtG2JZdobzx8NASsaDEHV9KyOLhGFhZY';

export const getAllNote = createAsyncThunk('getAllNote', async () => {
  const response = await axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNvbXNha3JhQGxpdmUuY29tIiwidXNlcklkIjoiNjQzZmMyZGRhYjA5MWZiMTdhOTZmOTg4IiwiaWF0IjoxNjgyNDE0MzUzLCJleHAiOjE2ODI1MDA3NTN9.L5NSC9Ikat9PtG2JZdobzx8NASsaDEHV9KyOLhGFhZY`,
    },
    url: `${API_URL}/note`,
  });
  return response.data;
});

export const addNote = createAsyncThunk(
  'addNote',
  async (newNoteData: {title: string; content: string}) => {
    //   const token = localStorage.getItem("token");
    const response = await axios({
      method: 'post',
      headers: {Authorization: `Bearer ${token}`},
      data: {title: newNoteData.title, content: newNoteData.content},
      url: `${API_URL}/note/`,
    });
    return response.data;
  },
);

export const deleteNote = createAsyncThunk('deleteNote', async (id: string) => {
  // const token = localStorage.getItem("token");
  const response = await axios({
    method: 'DELETE',
    headers: {Authorization: `Bearer ${token}`},
    url: `${API_URL}/note/${id}`,
  });
  return {message: response.data.message, id: id};
});

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllNote.pending, (state, action) => {
        if (state.isLoading === false) {
          state.isLoading = true;
        }
      })
      .addCase(getAllNote.fulfilled, (state, action) => {
        if (state.isLoading === true) {
          state.isLoading = false;
          state.value = action.payload;
        }
      })
      .addCase(getAllNote.rejected, (state, action) => {
        if (state.isLoading === true) {
          state.isLoading = false;
          // localStorage.removeItem("token");
          // localStorage.removeItem("email");
        }
      })
      .addCase(addNote.pending, (state, action) => {
        if (state.isLoading === false) {
          state.isLoading = true;
        }
      })
      .addCase(addNote.fulfilled, (state, action) => {
        if (state.isLoading === true) {
          state.isLoading = false;
          const newNotes = [...state.value.notes, action.payload.createdNote];
          state.value.notes = newNotes;
        }
      })
      .addCase(addNote.rejected, (state, action) => {
        if (state.isLoading === true) {
          state.isLoading = false;
        }
      })
      .addCase(deleteNote.pending, (state, action) => {
        if (state.isLoading === false) {
          state.isLoading = true;
        }
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        if (state.isLoading === true) {
          state.isLoading = false;
          const newNotes = state.value.notes.filter(
            note => note.id !== action.payload.id,
          );
          state.value.notes = newNotes;
        }
      })
      .addCase(deleteNote.rejected, (state, action) => {
        if (state.isLoading === true) {
          state.isLoading = false;
        }
      });
  },
});

export default noteSlice.reducer;
