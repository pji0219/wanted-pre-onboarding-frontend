import { useEffect, useState } from 'react';

import { getTodosApi } from '../../api/todos';
import Header from '../../UIElements/Header';
import NewTodoForm from '../components/NewTodoForm';
import TodoList from '../components/TodoList';
import './Todos.css';

function Todos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const hasToken = localStorage.getItem('auth');
    if (!hasToken) {
      window.location.replace('/signin');
    }
  }, []);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await getTodosApi();

        if (res.status !== 200) {
          alert('할 일 목록을 불러오는데 실패하였습니다.');
          return;
        }
        setTodos(res.data);
      } catch (error) {
        alert('에러가 발생하였습니다.');
        console.log(error);
      }
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
