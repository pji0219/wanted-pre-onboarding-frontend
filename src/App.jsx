import { Navigate, Route, Routes } from 'react-router-dom';

import SignIn from './auth/pages/SignIn';
import SignUp from './auth/pages/SignUp';
import Home from './home/pages/Home';
import Todos from './todos/pages/Todos';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='todo' element={<Todos />} />
      <Route path='*' element={<Navigate replace to='/signin' />} />
    </Routes>
  );
}

export default App;
