import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from "../feature/User/UserSlice";
import movieReducer from "../feature/movie/movieSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    movie:movieReducer,
   
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      
    })
});