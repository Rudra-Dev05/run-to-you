import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/axios';

const initialState = {
  routes: [],
  route: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all routes
export const getRoutes = createAsyncThunk(
  'routes/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/routes');
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

// Get route by ID
export const getRouteById = createAsyncThunk(
  'routes/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/routes/${id}`);
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

export const routesSlice = createSlice({
  name: 'routes',
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
      .addCase(getRoutes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.routes = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getRouteById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRouteById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.route = action.payload;
      })
      .addCase(getRouteById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = routesSlice.actions;
export default routesSlice.reducer; 