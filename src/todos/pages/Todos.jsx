import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import NewTodoForm from '../components/NewTodoForm';
import TodoList from '../components/TodoList';

function Todos() {
  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = localStorage.getItem('auth');
    if (!hasToken) {
      navigate('/signin');
    }
  }, [navigate]);

  return (
    <div>
      <NewTodoForm setTodos={setTodos} />
      <TodoList />
    </div>
  );
}

export default Todos;
