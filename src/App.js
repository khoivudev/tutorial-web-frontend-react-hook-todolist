import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./App.scss";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import CircularProgress from "@material-ui/core/CircularProgress";

function App() {
  const [todoList, setTodoList] = useState([""]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function fetchTodoList() {
      console.log("getting data");
      try {
        const res = await axios.get("/api/todotask");
        setTodoList(res.data);
        setIsLoaded(true);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchTodoList();
  }, []);

  async function handleTodoClick(todo) {
    setIsLoaded(false);
    console.log("deleting data");
    try {
      await axios.delete(`/api/todotask/${todo._id}`);
      const index = todoList.findIndex((x) => x._id === todo._id);
      if (index < 0) return;
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    } catch (err) {
      console.log(err.message);
    }
    setIsLoaded(true);
  }

  async function handleTodoFormSubmit(formValues) {
    console.log("adding data");
    setIsLoaded(false);
    try {
      const newTodo = {
        ...formValues,
      };
      await axios.post(`/api/todotask`, newTodo).then((res) => {
        const newTodoList = [...todoList];
        newTodoList.push(res.data);
        setTodoList(newTodoList);
      });
    } catch (err) {
      console.log(err.message);
    }
    setIsLoaded(true);
  }

  return (
    <div className="app">
      <h1>React hooks- Todolist</h1>
      {isLoaded ? (
        <div>
          <TodoForm onSubmit={handleTodoFormSubmit} />
          <TodoList todos={todoList} onTodoClick={handleTodoClick} />
        </div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
