import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "@state";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { api } from "@state/api";

const store = configureStore({
  reducer: {
    global: globalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});
setupListeners(store.dispatch);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import "./index.css";
// import { store, persistor } from './redux/store.js'; // Use the persisted store
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react"; // Use PersistGate for persistence
// import { setupListeners } from "@reduxjs/toolkit/query";
// import { api } from "@state/api"; // Assuming api slice is needed
// import globalReducer from "@state"; // Assuming global state slice

// // No need to redefine store since it's already imported from redux/store.js

// // Setting up listeners for RTK Query (optional if you're using RTK Query)
// setupListeners(store.dispatch);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <PersistGate persistor={persistor}> {/* Ensure PersistGate is wrapping the store */}
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </PersistGate>
//   </React.StrictMode>
// );
