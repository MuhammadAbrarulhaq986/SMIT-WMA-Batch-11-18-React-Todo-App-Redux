// * Import a special function called configureStore from a library.
// * This function helps us create a store for our application.
import { configureStore } from '@reduxjs/toolkit';

// * Import a function called todoReducer from another file.
// * This function helps us manage the state of our todo list.
import todoReducer from "../reducers/todoSlice"

// * Create a store for our application using the configureStore function.
// * We pass an object to this function that tells it how to manage our state.
export const store = configureStore({
    // * The reducer property is an object that tells the store how to manage our state.
    reducer: {
        // * The todos property tells the store to use the todoReducer function to manage our todo list.
        todos: todoReducer,
    }
})