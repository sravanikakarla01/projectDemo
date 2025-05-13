// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';  // Import configureStore from Redux Toolkit
import rootReducer from './rootReducer';  // Import your combined reducers

// Create the Redux store using configureStore
const store = configureStore({
  reducer: rootReducer,  // Pass the rootReducer to configureStore
});

export default store;
