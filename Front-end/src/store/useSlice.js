import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
      userId: null, // Initially null
    },
    reducers: {
      setUserId: (state, action) => {
        console.log('Setting user ID:', action.payload);
        state.userId = action.payload; // Store user ID in Redux state
      },
    },
  });
  
  export const { setUserId } = userSlice.actions;
  export default userSlice.reducer;
  
