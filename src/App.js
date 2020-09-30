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
  const [filteredtodoList, setFilteredTodoList] = useState([""]);
  const [todoStatus, setTodoStatus] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchTodoList = async () => {
      try {
        const res = await axios.get("/api/todotask");
        setTodoList(res.data);
        setIsLoaded(true);
      } catch (err) {}
    };
    fetchTodoList();
  }, []);

  useEffect(() => {
    //Function
    const filterHandler = () => {
      switch (todoStatus) {
        case "completed":
          setFilteredTodoList(
            todoList.filter((todo) => todo.completed === true)
          );
          break;
        case "uncompleted":
          setFilteredTodoList(
            todoList.filter((todo) => todo.completed === false)
          );
          break;
        default:
          setFilteredTodoList(todoList);
          break;
      }
    };

    filterHandler();
  }, [todoList, todoStatus]);

  const handleTodoDeleteBtnClick = async (todo) => {
    setIsLoaded(false);
    try {
      await axios.delete(`/api/todotask/${todo._id}`);
      const index = todoList.findIndex((x) => x._id === todo._id);
      if (index < 0) return;
      const newTodoList = [...todoList];
      newTodoList.splice(index, 1);
      setTodoList(newTodoList);
    } catch (err) {}
    setIsLoaded(true);
  };

  const handleTodoCompletedBtnClick = async (todo) => {
    setIsLoaded(false);
    try {
      const updateField = { completed: `${!todo.completed}` };
      await axios
        .patch(`/api/todotask/${todo._id}`, updateField)
        .then((res) => {
          const newTodoList = todoList.map((item) => {
            if (item._id === res.data._id) {
              return {
                ...item,
                completed: res.data.completed,
              };
            }
            return item;
          });
          setTodoList(newTodoList);
        });
    } catch (err) {}

    setIsLoaded(true);
  };

  const handleTodoFormSubmit = async (formValues) => {
    setIsLoaded(false);
    try {
      const newTodo = {
        ...formValues,
      };
      await axios.post(`/api/todotask`, newTodo).then((res) => {
        const newTodoList = [...todoList];
        newTodoList.push(res.data);
        setTodoList(newTodoList);
        setTodoStatus("all");
      });
    } catch (err) {}
    setIsLoaded(true);
  };

  const handleTodoStatusChange = (status) => {
    setTodoStatus(status);
  };

  return (
    <div className="App">
      <header>
        <h1>VHK's Todo List</h1>
      </header>
      {isLoaded ? (
        <div>
          <TodoForm
            onSubmit={handleTodoFormSubmit}
            onSelectTodoStatus={handleTodoStatusChange}
          />
          <TodoList
            todos={filteredtodoList}
            onTodoTrashBtnClick={handleTodoDeleteBtnClick}
            onTodoCompletedBtnClick={handleTodoCompletedBtnClick}
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
