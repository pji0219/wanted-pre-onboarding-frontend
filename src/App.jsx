import { Route, Routes } from 'react-router-dom';

import SignIn from './auth/pages/SignIn';
import SignUp from './auth/pages/SignUp';
import Todos from './todos/pages/Todos';

function App() {
  return (
    <Routes>
      <Route path='/signin' element={<SignIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='todo' element={<Todos />} />
    </Routes>
  );
}

export default App;
