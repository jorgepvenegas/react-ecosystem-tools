import {
  loadTodosInProgress,
  loadTodosSuccess,
  loadTodosFailure,
  createTodo,
  removeTodo,
  markAsCompleted,
} from "./actions";

export const displayAlert = (text) => () => {
  alert(`This happened: ${text}`);
};

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodosInProgress());
    const response = await fetch(`http://localhost:8080/todos`);
    const todos = await response.json();
    dispatch(loadTodosSuccess(todos));
  } catch (err) {
    dispatch(loadTodosFailure);
    displayAlert(err);
  }
};

export const addTodoRequest = (text) => async (dispatch, getState) => {
  try {
    const body = JSON.stringify({ text });
    const request = await fetch(`http://localhost:8080/todos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const todo = await request.json();
    console.log(`Created todo: ${todo}`);
    dispatch(createTodo(todo));
  } catch (err) {
    dispatch(displayAlert(err));
  }
};

export const removeTodoRequest = (id) => async (dispatch, getState) => {
  try {
    // const body = JSON.stringify({ text });
    const request = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "DELETE",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      // body,
    });

    const removedTodo = await request.json();
    console.log(`Removed todo: ${removedTodo}`);
    dispatch(removeTodo(removedTodo));
  } catch (err) {
    dispatch(displayAlert(err));
  }
};

export const updateTodoRequest = (id) => async (dispatch, getState) => {
  try {
    const request = await fetch(`http://localhost:8080/todos/${id}/completed`, {
      method: "POST",
    });
    const completedTodo = await request.json();
    dispatch(markAsCompleted(completedTodo));
  } catch (err) {
    dispatch(displayAlert(err));
  }
};
