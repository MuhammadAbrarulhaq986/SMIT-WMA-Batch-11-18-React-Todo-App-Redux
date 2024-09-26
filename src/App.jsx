import React, { useRef, useEffect, useState } from "react";

// * Import the useDispatch and useSelector hooks from the "react-redux" library
import { useDispatch, useSelector } from "react-redux";

// * Import the addTodo and removeTodo action creators from the todoSlice reducer
import { addTodo, editTodo, removeTodo } from "./redux/reducers/todoSlice";

// * Define the App component
const App = () => {
  // * Create a reference to the input field
  const [error, setError] = useState("");

  // * Create a reference to the input field using the useRef hook
  const todoVal = useRef();

  // * Get the dispatch function from the Redux store using the useDispatch hook
  const dispatch = useDispatch();

  // * Get the state of the todos from the Redux store using the useSelector hook
  const selector = useSelector((state) => state.todos.todo);

  useEffect(() => {
    console.log(selector?.length);
  }, [selector]);

  // * Define a function to add a new todo item to the Redux store
  const addTodoInRedux = (event) => {
    event.preventDefault();
    const todoValue = todoVal.current.value.trim();
    if (todoValue === "") {
      alert("Please enter a Todo before submiting ");
      return;
    }
    console.log("todo added", todoValue);
    dispatch(
      addTodo({
        title: todoValue,
      })
    );
    //* Clear the input field
    todoVal.current.value = "";
  };

  // * Define a function to delete a todo item from the Redux store
  const deleteItemFromRedux = (index) => {
    console.log("delete item", index);
    dispatch(
      removeTodo({
        index,
      })
    );
  };

  // * Return the JSX for the App component
  return (
    <>
      <div className="container mx-auto p-auto pt-12 md:p-12 lg:p-16 shadow-md rounded">
        <div className="max-w-full mx-auto p-14 rounded shadow-md todo">
          <h1 className="text-3xl font-bold text-center text-white mb-4">
            Redux Todo app
          </h1>
          <form className="flex flex-wrap justify-center mb-4">
            <input
              type="text"
              ref={todoVal}
              className="w-1/2 p-2 pl-10 text-sm text-black  bg-white rounded"
              placeholder="Add a new todo..."
              style={{ color: "black" }}
            />
            <button
              onClick={addTodoInRedux}
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold text-2xl p-3  rounded ml-2"
            >
              Add Todo
            </button>
          </form>
          <ul className="list-none mb-4">
            {selector.length > 0 ? (
              selector.map((item, index) => {
                return (
                  <li key={item.id} className="flex items-center mb-2">
                    {item.isEditing ? (
                      <input
                        type="text"
                        value={item.title}
                        onChange={(e) => {
                          dispatch(
                            editTodo({
                              id: item.id,
                              title: e.target.value,
                            })
                          );
                        }}
                        className="w-1/2 p-2 pl-10 text-sm text-black bg-gray-100 shadow-md rounded"
                      />
                    ) : (
                      <span className="text-lg">{item.title}</span>
                    )}
                    <button
                      onClick={() => deleteItemFromRedux(index)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        dispatch(
                          editTodo({
                            id: item.id,
                            isEditing: !item.isEditing,
                          })
                        );
                      }}
                      className="bg-blue-500 hover:bg-lightgreen-500 active:bg-green-500 text-white font-bold py-2 px-4 rounded ml-2"
                    >
                      {item.isEditing ? "Save" : "Edit"}
                    </button>
                  </li>
                );
              })
            ) : (
              <h1 className="text-2xl text-center text-white font-bold">
                No Todos Found!
              </h1>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

export default App;
