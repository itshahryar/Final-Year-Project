import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./userThemeSlice"; // Path to your combined slice file

const store = configureStore({
  reducer: rootReducer,  // This should include both 'global' and 'user'
});

export default store;
