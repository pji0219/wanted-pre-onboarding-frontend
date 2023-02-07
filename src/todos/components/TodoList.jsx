import TodoItem from './TodoItem';

import './TodoList.css';

function TodoList({ todos, setTodos }) {
  if (todos.length === 0) {
    return <span>아직 추가된 할 일이 없습니다.</span>;
  }

  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          todo={todo.todo}
          isCompleted={todo.isCompleted}
          setTodos={setTodos}
        />
      ))}
    </ul>
  );
}

export default TodoList;
