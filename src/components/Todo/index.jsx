import React from "react";
import PropTypes from "prop-types";

Todo.propTypes = {
  todo: PropTypes.object,
  onTodoTrashBtnClick: PropTypes.func,
  onTodoCompletedBtnClick: PropTypes.func,
};

Todo.defautProps = {
  todo: null,
  onTodoTrashBtnClick: null,
  onTodoCompletedBtnClick: null,
};

function Todo(props) {
  const { todo, onTodoTrashBtnClick, onTodoCompletedBtnClick } = props;

  const handleTrashBtnClick = () => {
    if (onTodoTrashBtnClick) {
      onTodoTrashBtnClick(todo);
    }
  };

  const handleDeleteBtnClick = () => {
    if (handleDeleteBtnClick) {
      onTodoCompletedBtnClick(todo);
    }
  };
  return (
    <div className="todo">
      <li
        className={`todo-item ${todo.completed ? "completed" : ""}`}
        key={todo._id}
      >
        {todo.content}
      </li>
      <button className="complete-btn" onClick={handleDeleteBtnClick}>
        <i className="fas fa-check"></i>
      </button>
      <button className="trash-btn" onClick={handleTrashBtnClick}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Todo;
