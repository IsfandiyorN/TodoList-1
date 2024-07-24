import React, { useState } from 'react';
import styles from "../Upcoming/Upcoming.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, removeTodo } from '../../features/todo/todoSlice';

const TodoList = ({ title, todos, type }) => {
  const dispatch = useDispatch();

  const handleToggle = (id) => {
    dispatch(toggleTodo({ type, id }));
  };

  const handleRemove = (id) => {
    dispatch(removeTodo({ type, id }));
  };

  const handleAddTodo = (type, inputRef) => {
    const title = inputRef.current.value;
    if (title) {
      const newTodo = { id: Date.now(), title, checked: false };
      dispatch(addTodo({ type, todo: newTodo }));
      inputRef.current.value = '';
    }
  };

  const inputRef = React.useRef();

  return (
    <div className={styles.todolist}>
      <h2 className='todoH2'>{title}</h2>
      <div className="inputC  ontainer">
        <input className='todoInput' ref={inputRef} type="text" placeholder="Add new task" />
        <button className="add-task-button" onClick={() => handleAddTodo(type, inputRef)}>➕</button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            <span
              onClick={() => handleToggle(todo.id)}
              className={`todo-text ${todo.checked ? 'checked' : ''}`}
            >
              {todo.checked ? '✔️ ' : ''}{todo.title}
            </span>
            <button className="delete-button" onClick={() => handleRemove(todo.id)}>✖</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Upcoming = () => {
  const { today, tomorrow, thisWeek } = useSelector(state => state.todo);

  return (
    <div className="upcoming-container">
      <h1>Upcoming</h1>
      <div className="task-section">
        <div className="task-column">
          <TodoList title="Today" todos={today} type="today" />
        </div>
        <div className="task-column">
          <TodoList title="Tomorrow" todos={tomorrow} type="tomorrow" />
        </div>
        <div className="task-column">
          <TodoList title="This Week" todos={thisWeek} type="thisWeek" />
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
