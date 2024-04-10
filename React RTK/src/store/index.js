import { configureStore } from "@reduxjs/toolkit";
import { movieReducer } from "./slices/movieSlice";
import { songReducer } from "./slices/songSlice";

const store = configureStore({
  reducer: {
    songs: songReducer,
    movies: movieReducer,
  },
});

export { store };
