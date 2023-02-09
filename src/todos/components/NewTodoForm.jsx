import { useState } from 'react';

import { createTodoApi } from '../../api/todos';
import './NewTodoForm.css';

function NewTodoForm({ setTodos }) {
  const [newTodo, setNewTodo] = useState('');

  // 투두 텍스트 입력
  const todoChangeHandler = (event) => {
    setNewTodo(event.target.value);
  };

  // 투두 추가
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

      setTodos((prev) => [...prev, res.data]);
    } catch (error) {
      alert('에러가 발생하였습니다.');
      console.log(error);
    } finally {
      setNewTodo('');
    }
  };

  return (
    <form onSubmit={sumbitHandler} className='new-todo-form'>
      <div className='new-todo-form__input-container'>
        <input
          data-testid='new-todo-input'
          type='text'
          onChange={todoChangeHandler}
          value={newTodo}
        />
        <button data-testid='new-todo-add-button' type='submit'>
          추가
        </button>
      </div>
    </form>
  );
}

export default NewTodoForm;
