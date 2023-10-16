import TodoEdit from "./TodoEdit";

const TodoList = ({ todos, handleDelete, handleDone, handleUpdate }) => {
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
      {todos.map((t) => (
        <div key={t.id}>
          {t.isEdit ? (
            <>
              <TodoEdit />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                name=""
                id=""
                checked={t.isDone}
                onChange={(e) => handleCheck(e, t.id)}
              />
              {t.text}
              <button onClick={() => handleDelete(t.id)}>Delete</button>
              <button onClick={() => handleUpdate(t.id)}>Update</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
{
  /* {todos.map((t) => (
          <div key={t.id}>
            <input type="text" name="" id="" value={t.text} />
  
            <button onClick={() => handleDelete(t.id)}>Update</button>
          </div>
        ))} */
}
