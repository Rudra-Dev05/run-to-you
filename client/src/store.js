import { configureStore } from '@reduxjs/toolkit';

// Initial state with mock user data
const initialState = {
  auth: {
    user: {
      id: 'user123',
      name: 'Rudra Dev',
      email: 'rudra@example.com',
      profilePicture: 'https://randomuser.me/api/portraits/men/85.jpg',
      profile: {
        bio: 'Running enthusiast and fitness lover'
      }
    }
  }
};

// This is a temporary reducer - in a real app, we would use createSlice
const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    app: (state = {}, action) => state
  },
});

export default store; 