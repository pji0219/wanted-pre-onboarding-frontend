import './Header.css';

function Header(props) {
  // 로그아웃
  const logoutHandler = () => {
    localStorage.clear();
    window.location.replace('/signin');
  };

  return (
    <header className='header'>
      <div className='header__title'>
        <h1>Todo List</h1>
      </div>
      <div className='header__add-form'>{props.children}</div>
      <div className='header__logout-btn'>
        <button onClick={logoutHandler}>로그아웃</button>
      </div>
    </header>
  );
}

export default Header;
