import { Route, Routes, Navigate } from 'react-router-dom';

import SignIn from './auth/pages/SignIn';
import SignUp from './auth/pages/SignUp';
import Todos from './todos/pages/Todos';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='todo' element={<Todos />} />
      <Route path='*' element={<Navigate replace to='/signin' />} />
    </Routes>
  );
}

export default App;
