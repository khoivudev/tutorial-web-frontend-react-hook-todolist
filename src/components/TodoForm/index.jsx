import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

TodoForm.propTypes = {
  onSubmit: PropTypes.func,
};

TodoForm.defautProps = {
  obSubmit: null,
};

function TodoForm(props) {
  const { onSubmit } = props;
  const [value, setValue] = useState("");

  function handleValueChange(e) {
    console.log(e.target.value);
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
    </form>
  );
}

export default TodoForm;
