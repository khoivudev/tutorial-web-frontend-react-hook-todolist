import React from "react";
import PropTypes from "prop-types";
import Todo from "../Todo";

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoTrashBtnClick: PropTypes.func,
  onTodoCompletedBtnClick: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  onTodoTrashBtnClick: null,
  onTodoCompletedBtnClick: null,
};

function TodoList(props) {
  const { todos, onTodoTrashBtnClick, onTodoCompletedBtnClick } = props;

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onTodoTrashBtnClick={onTodoTrashBtnClick}
            onTodoCompletedBtnClick={onTodoCompletedBtnClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
