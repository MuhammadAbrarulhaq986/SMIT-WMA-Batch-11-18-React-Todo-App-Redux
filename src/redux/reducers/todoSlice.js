// * Import two functions from the @reduxjs/toolkit library:
// * createSlice: a function that helps us create a slice of state in our application
// * nanoid: a function that generates a unique ID for each todo item
import { createSlice, nanoid } from "@reduxjs/toolkit";

// * Create a slice of state called "Todos" using the createSlice function
export const todoSlice = createSlice({
    // * The name of this slice of state
    name: "Todos",

    // * The initial state of this slice (an empty array of todos)
    initialState: {
        todo: []
    },

    // * The reducers for this slice of state (functions that change the state)
    reducers: {
        // * The addTodo reducer: adds a new todo item to the state
        addTodo: (state, action) => {
            // * Add a new todo item to the state with a unique ID
            state.todo.push({
                title: action.payload.title,
                id: nanoid()
            })
        },


        editTodo: (state, action) => {
            // * Find the todo item to be updated
            const todoItem = state.todo.find((todo) => todo.id === action.payload.id);
            if (todoItem) {
                // * Update the text of the todo item
                if (action.payload.title) {
                    todoItem.title = action.payload.title;
                }
                // * Update the isEditing property of the todo item
                if (action.payload.isEditing !== undefined) {
                    todoItem.isEditing = action.payload.isEditing;
                }
            }
        },

        // * The removeTodo reducer: removes a todo item from the state
        removeTodo: (state, action) => {
            // * Remove the todo item at the specified index from the state
            state.todo.splice(action.payload.index, 1)
        }
    }
})

// * Export the action creators for this slice of state
export const { addTodo, editTodo, removeTodo } = todoSlice.actions

// * Export the reducer function for this slice of state
export default todoSlice.reducer