import { useState } from 'react';
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import { deleteTodoApi, updateTodoApi } from '../../api/todos';
import './TodoItem.css';

function TodoItem({ id, todo, isCompleted, setTodos }) {
  // 수정모드 여부 state
  const [isEditMode, setIsEditMode] = useState(false);

  // 수정모드 시 기존 투두 텍스트를 가져와서 변경하기 위한 state
  const [editedTodo, setEditedTodo] = useState(todo);

  // 투두 완료 체크
  const completeCheckHandler = async () => {
    const body = {
      todo,
      isCompleted: !isCompleted,
    };

    const res = await updateTodoApi(id, body);
    if (res.status !== 200) return;

    setTodos((prev) =>
      prev.map((todo) => (todo.id === res.data.id ? res.data : todo))
    );
  };

  // 수정모드 진입
  const editModeHandler = () => {
    setIsEditMode(true);
  };

  // 수정모드 취소
  const editModeCancelHandler = () => {
    setIsEditMode(false);

    // 취소 한 후 다시 수정모드 진입 시 서버로부터 받아온 기존의 투두 텍스트를 유지하기 위함
    setEditedTodo(todo);
  };

  // 수정할 텍스트 입력
  const todoChangeHandler = (event) => {
    setEditedTodo(event.target.value);
  };

  // 수정사항 제출
  const updateTodoHandler = async () => {
    const body = {
      todo: editedTodo,
      isCompleted,
    };

    try {
      const res = await updateTodoApi(id, body);
      if (res.status !== 200) {
        alert('수정 하는데 실패하였습니다.');
      }

      setTodos((prev) =>
        prev.map((todo) => (todo.id === res.data.id ? res.data : todo))
      );
      setIsEditMode(false);
    } catch (error) {
      alert('수정 하는데 실패하였습니다.');
      console.log(error);
    }
  };

  // 투두 삭제
  const deleteTodoHandler = async () => {
    try {
      const res = await deleteTodoApi(id);
      if (res.status !== 204) {
        alert('삭제 하는데 실패하였습니다.');
      }

      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      alert('에러가 발생하였습니다.');
      console.log(error);
    }
  };

  return (
    <li className='todo-item'>
      <label>
        <input
          type='checkbox'
          checked={isCompleted}
          onChange={completeCheckHandler}
        />
        {isEditMode ? (
          <input
            data-testid='modify-input'
            value={editedTodo}
            onChange={todoChangeHandler}
            className='todo-item__modify-input'
          />
        ) : (
          <span>{todo}</span>
        )}
      </label>
      <div className='todo-item__btn'>
        {isEditMode ? (
          <>
            <button data-testid='submit-button' onClick={updateTodoHandler}>
              제출
            </button>
            <button data-testid='cancel-button' onClick={editModeCancelHandler}>
              취소
            </button>
          </>
        ) : (
          <>
            <button
              data-testid='modify-button'
              className='todo-item__btn__modify'
              onClick={editModeHandler}
            >
              <FaPencilAlt />
            </button>
            <button
              data-testid='delete-button'
              className='todo-item__btn_delete'
              onClick={deleteTodoHandler}
            >
              <FaTrashAlt />
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TodoItem;
