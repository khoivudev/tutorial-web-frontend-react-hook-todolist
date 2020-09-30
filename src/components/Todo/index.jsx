import React from "react";
import PropTypes from "prop-types";

Todo.propTypes = {
  todo: PropTypes.object,
  onTrashBtnClick: PropTypes.func,
};

Todo.defautProps = {
  todo: null,
  onTrashBtnClick: null,
};

function Todo(props) {
  const { todo, onTrashBtnClick } = props;

  const handleTrashBtn = () => {
    if (onTrashBtnClick) {
      onTrashBtnClick(todo);
    }
  };

  return (
    <div className="todo">
      <li className="todo-item" key={todo._id}>
        {todo.content}
      </li>
      {/* <button className="complete-btn">
        <i className="fas fa-check"></i>
      </button> */}
      <button className="trash-btn" onClick={handleTrashBtn}>
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
}

export default Todo;
