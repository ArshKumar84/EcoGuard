// store/index.js

import { configureStore } from '@reduxjs/toolkit';
import userSlice from './useSlice'; // Import your user slice

const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export default store;
