import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/axios';

const initialState = {
  achievements: [],
  achievement: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all achievements
export const getAchievements = createAsyncThunk(
  'achievements/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/achievements');
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

// Get achievement by ID
export const getAchievementById = createAsyncThunk(
  'achievements/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/achievements/${id}`);
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

export const achievementsSlice = createSlice({
  name: 'achievements',
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
      .addCase(getAchievements.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAchievements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.achievements = action.payload;
      })
      .addCase(getAchievements.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getAchievementById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAchievementById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.achievement = action.payload;
      })
      .addCase(getAchievementById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = achievementsSlice.actions;
export default achievementsSlice.reducer; 