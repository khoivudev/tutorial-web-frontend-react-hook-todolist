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
      try {
        const res = await axios.get("/api/todotask");
        setTodoList(res.data);
        setIsLoaded(true);
      } catch (err) {
        console.log("Oops");
      }
    }
    fetchTodoList();
  }, []);

  async function handleTodoDeleteBtnClick(todo) {
    setIsLoaded(false);
    try {
      await axios.delete(`/api/todotask/${todo._id}`);
      const index = todoList.findIndex((x) => x._id === todo._id);
      if (index < 0) return;
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    } catch (err) {
      console.log("Oops");
    }
    setIsLoaded(true);
  }

  async function handleTodoFormSubmit(formValues) {
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
      console.log("Oops");
    }
    setIsLoaded(true);
  }

  return (
    <div className="App">
      <header>
        <h1>VHK's Todo List</h1>
      </header>
      {isLoaded ? (
        <div>
          <TodoForm onSubmit={handleTodoFormSubmit} />
          <TodoList
            todos={todoList}
            onTodoTrashBtnClick={handleTodoDeleteBtnClick}
          />
        </div>
      ) : (
        <div className="loading-container">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default App;
