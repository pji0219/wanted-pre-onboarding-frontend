import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';

import { deleteTodoApi } from '../../api/todos';
import './TodoItem.css';

function TodoItem({ id, todo, isCompleted, setTodos }) {
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
        <input type='checkbox' />
        <span>{todo}</span>
      </label>
      <div className='todo-item__btn'>
        <button data-testid='modify-button' className='todo-item__btn__modify'>
          <FaPencilAlt />
        </button>
        <button
          data-testid='delete-button'
          className='todo-item__btn_delete'
          onClick={deleteTodoHandler}
        >
          <FaTrashAlt />
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
