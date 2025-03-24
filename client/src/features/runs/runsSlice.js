import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/axios';

const initialState = {
  runs: [],
  run: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all runs
export const getRuns = createAsyncThunk(
  'runs/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/runs');
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get run by ID
export const getRunById = createAsyncThunk(
  'runs/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/runs/${id}`);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const runsSlice = createSlice({
  name: 'runs',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRuns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRuns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.runs = action.payload;
      })
      .addCase(getRuns.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRunById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRunById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.run = action.payload;
      })
      .addCase(getRunById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = runsSlice.actions;
export default runsSlice.reducer; 