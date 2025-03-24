import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../app/axios';

const initialState = {
  challenges: [],
  challenge: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Get all challenges
export const getChallenges = createAsyncThunk(
  'challenges/getAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/challenges');
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

// Get challenge by ID
export const getChallengeById = createAsyncThunk(
  'challenges/getById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/challenges/${id}`);
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

export const challengesSlice = createSlice({
  name: 'challenges',
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
      .addCase(getChallenges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChallenges.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.challenges = action.payload;
      })
      .addCase(getChallenges.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getChallengeById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getChallengeById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.challenge = action.payload;
      })
      .addCase(getChallengeById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = challengesSlice.actions;
export default challengesSlice.reducer; 