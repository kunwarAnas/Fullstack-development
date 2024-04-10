import { createSlice } from "@reduxjs/toolkit";
import { reset } from "../actions";

const moviesSlice = createSlice({
    name: "movie",
    initialState: [],
    reducers: {
      addMovie(state, action) {
        state.push(action.payload);
      },
      removeMovie(state, action) {
        const index = state.indexOf(action.payload);
        state.splice(index, 1);
      },
      reset(state, action) {
        return []; // this will reset the state , state = [] won't work
      },
    },
    extraReducers(builder) {
      // also run when movie reset reducer called
      builder.addCase(reset, (state, action) => {
        return [];
      });
    },
  });

  export const { addMovie, removeMovie } = moviesSlice.actions;

  export const movieReducer = moviesSlice.reducer;