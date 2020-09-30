import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
  onSelectTodoStatus: PropTypes.func,
};

TodoForm.defautProps = {
  onSubmit: null,
  onSelectTodoStatus: null,
};

function TodoForm(props) {
  const { onSubmit, onSelectTodoStatus } = props;
  const [value, setValue] = useState("");

  function handleValueChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    //prevent reloading brower
    e.preventDefault();
    if (!onSubmit) return;
    const formValues = {
      content: value,
    };
    onSubmit(formValues);

    //Reset form
    setValue("");
  }

  const handleSelect = (e) => {
    onSelectTodoStatus(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={handleValueChange}
        placeholder="Take a note..."
      />
      <button className="todo-button" type="submit" onClick={handleSubmit}>
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select name="todos" className="filter-todo" onChange={handleSelect}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form>
  );
}

export default TodoForm;
