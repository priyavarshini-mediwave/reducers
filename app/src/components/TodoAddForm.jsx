import { useState } from "react";

const TodoAddForm = ({ handleAdd }) => {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    handleAdd(text);
    setText("");
  }

  return (
    <form className="AddForm" onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          onChange={(e) => {
            setText(e.target.value);
          }}
          value={text}
          minLength="5"
          maxLength="30"
          required
        />
      </label>
      <button type="submit">Add your Task</button>
    </form>
  );
};

export default TodoAddForm;
