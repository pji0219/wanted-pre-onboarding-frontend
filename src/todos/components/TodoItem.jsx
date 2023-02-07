import './TodoItem.css';

function TodoItem({ todo }) {
  return (
    <li className='todo-item'>
      <label>
        <input type='checkbox' />
        <span>{todo}</span>
      </label>
      <div className='todo-item__btn'>
        <button data-testid='modify-button' className='todo-item__btn__modify'>
          수정
        </button>
        <button data-testid='delete-button'>삭제</button>
      </div>
    </li>
  );
}

export default TodoItem;
