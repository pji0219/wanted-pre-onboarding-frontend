import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signUpApi } from '../../api/auth';
import Container from '../../UIElements/Container';
import './SignUpForm.css';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 이메일, 비밀번호 유효성 검사 (컴포넌트 마운트 시 인풋창에 아무것도 써져 있지 않으므로 유효하지 않은 것으로 (false)으로 시작)
  // 유효성 검사 통과 시 유효한 것(true)으로 변경됨
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);

  // 로그인 버튼 활성/비활성을 위한 state
  // 컴포넌트 마운트 시 처음에는 인풋창에 아무것도 써져 있지 않으므로 true로 시작
  const [isDisabled, setIsDisabled] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = localStorage.getItem('auth');
    if (hasToken) {
      navigate('/todo');
    }
  }, [navigate]);

  // isValidEmail, isValidPassword값이 바뀔때 마다 즉 사용자가 이메일이나 패스워드 지우고 재입력할 때 마다
  // 호출되어 유효성 여부에 따라 버튼을 활성화/비활성화 시켜줌
  useEffect(() => {
    if (isValidEmail && isValidPassword === true) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [isValidEmail, isValidPassword]);

  const emailChangeHandler = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value.includes('@')) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (value.length < 8) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    try {
      const res = await signUpApi(body);

      if (res.status !== 201) {
        alert('회원가입에 실패 하였습니다.');
        return;
      }
      navigate('/signin');
    } catch (error) {
      alert('에러가 발생 하였습니다.');
      console.log(error);
    }
  };

  return (
    <Container>
      <form className='signup-form' onSubmit={submitHandler}>
        <div className='signup-form__title'>
          <span>회원가입</span>
        </div>
        <div className='signup-form__inputs'>
          <input
            data-testid='email-input'
            type='email'
            name='email'
            value={email}
            placeholder='이메일을 입력하세요.'
            onChange={emailChangeHandler}
          />
          <input
            data-testid='password-input'
            type='password'
            name='password'
            value={password}
            placeholder='비밀번호를 입력하세요.'
            onChange={passwordChangeHandler}
          />
        </div>
        <div className='signup-form__signup-btn'>
          <button
            data-testid='signup-button'
            type='submit'
            disabled={isDisabled}
          >
            회원가입
          </button>
        </div>
      </form>
      <div className='signin-link-btn'>
        <Link to='/signin'>
          <button>로그인으로 이동</button>
        </Link>
      </div>
    </Container>
  );
}

export default SignUpForm;
