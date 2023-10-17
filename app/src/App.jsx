import { useEffect, useReducer } from "react";

import TodoList from "./components/TodoList";
import TodoAddForm from "./components/TodoAddForm";
import "./App.css";

/*
{
  id: 123,
  text: 'Foo',
  isDone: false
}
*/
function App() {
  const initialTodo = getfromLocal();
  const [todos, dispatch] = useReducer(todoReducer, initialTodo);
  useEffect(() => {
    savetoLocal(todos);
  }, [todos]);
  function getfromLocal() {
    const getData = localStorage.getItem("todos");
    if (getData) {
      return JSON.parse(getData);
    }
    return [];
  }
  function savetoLocal(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  function todoReducer(todos, action) {
    switch (action.type) {
      case "TODO_ADD": {
        return [
          ...todos,
          {
            id: new Date().getTime(),
            text: action.value,
            isDone: false,
            isEdit: false,
          },
        ];
      }
      case "TODO_DELETE": {
        const filtered = todos.filter((t) => t.id != action.value);
        return [...filtered];
      }
      case "TODO_DONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = true;
        }
        return newTodos;
      }
      case "TODO_UNDONE": {
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isDone"] = false;
        }
        return newTodos;
      }
      case "TODO_UPDATE": {
        console.log(action.type);
        const newTodos = [...todos];
        const idx = newTodos.findIndex((nt) => nt.id === action.value);
        if (idx !== -1) {
          newTodos[idx]["isEdit"] = true;
        }

        return newTodos;
      }
      case "TODO_EDITING": {
        const editedTodo = todos.map((t) => {
          if (t.id === action.value.id) {
            return {
              ...t,
              text: action.value.editedText,
              isDone: false,
              isEdit: false,
            };
          }
          return t;
        });
        return editedTodo;
      }
      case "TODO_DRAG": {
        let newTodos = [...todos];
        const dragItemContent = newTodos.splice(
          action.value.dragItemcurrent,
          1
        )[0];
        newTodos.splice(action.value.dragOverItemcurrent, 0, dragItemContent);

        return newTodos;
      }
      default: {
        throw Error("Unknown action: " + action.type);
      }
    }
  }

  function handleAdd(value) {
    dispatch({
      type: "TODO_ADD",
      value: value,
    });
  }
  function handleDelete(id) {
    dispatch({
      type: "TODO_DELETE",
      value: id,
    });
  }
  function handleDone(id, type) {
    if (type == "done") {
      dispatch({
        type: "TODO_DONE",
        value: id,
      });
    } else {
      dispatch({
        type: "TODO_UNDONE",
        value: id,
      });
    }
  }
  function handleUpdate(id) {
    dispatch({
      type: "TODO_UPDATE",
      value: id,
    });
  }
  function handleEditing(id, editedText) {
    dispatch({
      type: "TODO_EDITING",
      value: { id, editedText },
    });
  }
  function dragUpdate(dragItemCurrent, dragOverItemcurrent) {
    dispatch({
      type: "TODO_DRAG",
      value: { dragItemCurrent, dragOverItemcurrent },
    });
  }
  return (
    <div className="app-wrap">
      <h1>My todo</h1>

      <TodoAddForm handleAdd={handleAdd} />
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleDone={handleDone}
        handleUpdate={handleUpdate}
        handleEditing={handleEditing}
        dragUpdate={dragUpdate}
      />
    </div>
  );
}

export default App;
