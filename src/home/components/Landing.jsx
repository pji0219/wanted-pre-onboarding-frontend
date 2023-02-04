import { Link } from 'react-router-dom';

import Container from '../../UIElements/Container';
import './Landing.css';

function Landing() {
  return (
    <Container>
      <div className='landing'>
        <div className='landing__title'>
          <h1>투두 앱</h1>
        </div>
        <Link to='/signin' className='landing__signin-link'>
          <button>로그인</button>
        </Link>
        <Link to='signup' className='landing__signup-link'>
          <button>회원가입</button>
        </Link>
      </div>
    </Container>
  );
}

export default Landing;
