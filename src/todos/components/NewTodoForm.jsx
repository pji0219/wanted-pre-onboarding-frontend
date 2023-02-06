import { useState } from 'react';

import { createTodoApi } from '../../api/todos';

function NewTodoForm({ setTodo }) {
  const [newTodo, setNewTodo] = useState('');

  const todoChangeHandler = (event) => {
    setNewTodo(event.target.value);
  };

  const sumbitHandler = async (event) => {
    event.preventDefault();
    const body = {
      todo: newTodo,
    };

    try {
      const res = await createTodoApi(body);
      if (res.status !== 201) {
        alert('할 일 추가에 실패하였습니다.');
        return;
      }

      setTodo((prev) => [...prev, res.data]);
    } catch (error) {
      alert('에러가 발생하였습니다.');
      console.log(error);
    } finally {
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={sumbitHandler}>
      <input
        data-testid='new-todo-input'
        type='text'
        onChange={todoChangeHandler}
        value={newTodo}
      />
      <button data-testid='new-todo-add-button' type='submit'>
        추가
      </button>
    </form>
  );
}

export default NewTodoForm;
