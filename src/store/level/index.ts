// levelStore.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentLevel: 1, // Number
  score: 0, // Number
  experience: 0, // Number for progress to next level
  // Add other level-related data as needed
};

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    incrementLevel: (state) => {
      state.currentLevel++;
      // Reset experience or set a new threshold based on game logic
      state.experience = 0;
    },
    incrementScore: (state, action) => {
      state.score += action.payload;
   
    },
    resetLevel: () => initialState,
  },
});

export const { incrementLevel, incrementScore, resetLevel } = levelSlice.actions;
export default levelSlice.reducer;

