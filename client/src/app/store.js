import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import runsReducer from '../features/runs/runsSlice';
import routesReducer from '../features/routes/routesSlice';
import challengesReducer from '../features/challenges/challengesSlice';
import achievementsReducer from '../features/achievements/achievementsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    runs: runsReducer,
    routes: routesReducer,
    challenges: challengesReducer,
    achievements: achievementsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
