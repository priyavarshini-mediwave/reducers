import { useState } from "react";

function TodoEdit({ todo, onSave }) {
  const [editText, seteditText] = useState(todo.text);
  function handleEditSubmit(e) {
    e.preventDefault();
    onSave(editText);
  }

  return (
    <>
      <form className="Editform" onSubmit={handleEditSubmit}>
        <label>
          <input
            type="text"
            placeholder={todo.text}
            onChange={(e) => {
              seteditText(e.target.value);
            }}
            minLength="5"
            maxLength="30"
            required
          />
        </label>
        <button type="submit">Save your Changes</button>
      </form>
    </>
  );
}

export default TodoEdit;
