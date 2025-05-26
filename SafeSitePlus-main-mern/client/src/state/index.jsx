import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mode: "dark",
//   userId: "63701cc1f03239b7f700000e",
// };

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setMode: (state) => {
//       state.mode = state.mode === "light" ? "dark" : "light";
//     },
//   },
// });

// export const { setMode } = globalSlice.actions;

// export default globalSlice.reducer;

const initialState = {
  mode: "dark",
  userId: null, // Initially, no user is signed in
  type : null 
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    signIn: (state, action) => {
      state.userId = action.payload; // Set the user ID on successful login
    },
    signOut: (state) => {
      state.userId = null; // Clear the user ID on logout
    },
    setType: (state,action) => {
      state.type = action.payload; // Clear the user ID on logout
    }, 
    remType: (state) => {
      state.type = null; // 
    },
  },
});

export const { setMode, signIn, signOut , setType, remType} = globalSlice.actions;

export default globalSlice.reducer;

