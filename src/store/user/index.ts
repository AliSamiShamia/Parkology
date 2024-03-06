import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  email: '',
  phone: '',
  city: '',
  pharmacy: '',
  type_id: '',
  type: '',
  role: '',
  language: '',
  token: '',
  score: '',
  attempts: 0,
  avatar: ''
  // Add other user profile information as needed
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // Check for validation or data transformation as needed
      return {
        ...state,
        ...action.payload,
      };
    },
    updateScore: (state, action) => {
      state.score = action.payload;
    },
    updateAvatar: (state, action) => {
      state.avatar = action.payload;
    },
    updateLife: (state, action) => {
      state.attempts = action.payload;
    },
    updateUsername: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
      return state;
    },
    updateToken: (state, action) => {
      state.token = action.payload;
      return state;
    },
    // Add reducers for updating other user profile fields
    resetUser: () => initialState,
  },
});

export const {
  setUser,
  updateScore,
  updateLife,
  updateUsername,
  updateEmail,
  updateToken,
  resetUser,
  updateAvatar,
} = userSlice.actions;
export default userSlice.reducer;
