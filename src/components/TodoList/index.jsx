import React from "react";
import PropTypes from "prop-types";
import Todo from "../Todo";

TodoList.propTypes = {
  todos: PropTypes.array,
  onTodoTrashBtnClick: PropTypes.func,
};

TodoList.defaultProps = {
  todos: [],
  onTodoTrashBtnClick: null,
};

function TodoList(props) {
  const { todos, onTodoTrashBtnClick } = props;

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {todos.map((todo) => (
          <Todo
            key={todo._id}
            todo={todo}
            onTrashBtnClick={onTodoTrashBtnClick}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
