// store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './useSlice'; // Import your slice

const store = configureStore({
  reducer: {
    user: userReducer, // Attach your user slice to the store
  },
});

export default store;
