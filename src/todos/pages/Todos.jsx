import { useEffect, useState } from 'react';

import { getTodosApi } from '../../api/todos';
import Header from '../../UIElements/Header';
import NewTodoForm from '../components/NewTodoForm';
import TodoList from '../components/TodoList';
import './Todos.css';

function Todos() {
  const [todos, setTodos] = useState([]);

  // 토큰 없는 상태로 /todo경로 접근 시 로그인 페이지로 리다이렉트
  useEffect(() => {
    const hasToken = localStorage.getItem('auth');
    if (!hasToken) {
      window.location.replace('/signin');
    }
  }, []);

  // 투두 목록 조회
  useEffect(() => {
    const dataFetch = async () => {
      const res = await getTodosApi();

      if (res.status !== 200) {
        return;
      }
      setTodos(res.data);
    };

    dataFetch();
  }, []);

  return (
    <div className='todos-container'>
      <Header>
        <NewTodoForm setTodos={setTodos} />
      </Header>
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default Todos;
