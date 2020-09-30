import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defautProps = {
  onSubmit: null,
};

function TodoForm(props) {
  const { onSubmit } = props;
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

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={value} onChange={handleValueChange} />
      <button className="todo-button" type="submit" onClick={handleSubmit}>
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        {/* <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select> */}
      </div>
    </form>
  );
}

export default TodoForm;
