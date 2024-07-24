import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  today: [],
  tomorrow: [],
  thisWeek: [],
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { type, todo } = action.payload;
      state[type].push(todo);
    },
    toggleTodo: (state, action) => {
      const { type, id } = action.payload;
      const todo = state[type].find(todo => todo.id === id);
      if (todo) {
        todo.checked = !todo.checked;
      }
    },
    removeTodo: (state, action) => {
      const { type, id } = action.payload;
      state[type] = state[type].filter(todo => todo.id !== id);
    },
  },
});

export const { addTodo, toggleTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
