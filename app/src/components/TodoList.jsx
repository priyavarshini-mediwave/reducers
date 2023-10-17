import TodoEdit from "./TodoEdit";
import { useRef } from "react";
const TodoList = ({
  todos,
  handleDelete,
  handleDone,
  handleUpdate,
  handleEditing,
  dragUpdate,
}) => {
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleSort = () => {
    let newTodos = [...todos];

    const dragItemContent = newTodos.splice(dragItem.current, 1)[0];

    newTodos.splice(dragOverItem.current, 0, dragItemContent);
    dragUpdate(newTodos);
  };

  function handleCheck(e, id) {
    // console.log(e.target.checked);
    // console.log(id);
    let type = "done";
    if (!e.target.checked) {
      type = "undone";
    }
    handleDone(id, type);
  }
  return (
    <div>
      <h1>My todos</h1>
      {todos.map((t, index) => (
        <div key={t.id}>
          {t.isEdit ? (
            <TodoEdit
              todo={t}
              onSave={(editedText) => {
                handleEditing(t.id, editedText);
              }}
            />
          ) : (
            <div
              className="todolist"
              draggable
              onDragStart={(e) => (dragItem.current = index)}
              onDragEnter={(e) => (dragOverItem.current = index)}
              onDragEnd={handleSort}
            >
              <input
                type="checkbox"
                name=""
                id=""
                checked={t.isDone}
                onChange={(e) => handleCheck(e, t.id)}
              />
              <span style={t.isDone ? { textDecoration: "line-through" } : {}}>
                {t.text}
              </span>
              <button onClick={() => handleDelete(t.id)}>Delete</button>
              <button onClick={() => handleUpdate(t.id)}>Update</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
