import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Container from '../../UIElements/Container';
import { signInApi } from '../../api/auth';
import './SignInForm.css';

function SignInForm() {
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

  // 토큰 있는 상태일 시 투두 페이지로 리다이렉트
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

  // 이메일 입력
  const emailChangeHandler = (event) => {
    const value = event.target.value;
    setEmail(value);

    if (!value.includes('@')) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
  };

  // 패스워드 입력
  const passwordChangeHandler = (event) => {
    const value = event.target.value;
    setPassword(value);

    if (value.length < 8) {
      setIsValidPassword(false);
    } else {
      setIsValidPassword(true);
    }
  };

  // 이메일, 패스워드 제출
  const submitHandler = async (event) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    try {
      const res = await signInApi(body);
      if (res.status !== 200) {
        alert('로그인이 실패하였습니다.');
        return;
      }
      localStorage.setItem('auth', res.data.access_token);
      window.location.replace('/todo');
    } catch (error) {
      alert('에러가 발생하였습니다.');
      console.log(error);
    }
  };

  return (
    <Container>
      <form className='signin-form' onSubmit={submitHandler}>
        <div className='signin-form__title'>
          <span>로그인</span>
        </div>
        <div className='signin-form__inputs'>
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
        <div className='signin-form__signin-btn'>
          <button
            data-testid='signin-button'
            type='submit'
            disabled={isDisabled}
          >
            로그인
          </button>
        </div>
      </form>
      <div className='signup-link-btn'>
        <Link to='/signup'>
          <button>회원가입으로</button>
        </Link>
      </div>
    </Container>
  );
}

export default SignInForm;
