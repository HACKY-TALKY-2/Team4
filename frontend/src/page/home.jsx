import { useState } from 'react';
import './home.css';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [count, setCount] = useState(0)
  const navigate1 = useNavigate();
  const navigate2 = useNavigate();
  const navigate3 = useNavigate();

  const handleClick = () => {
    navigate1('/game');
  };
  const handleClick2 = () => {
    navigate2('/help');
  }; 
  const handleClick3 = () => {
    navigate3('/leaderboard');
  }; 
  return (
    <>
      <div className="main-container">
        <div className="logo-container">
          <div>
            <img className="logo" src="img/logo.png" alt="로고" />
          </div>
          <div className="button-container">
            <div><button className="game-start-button"onClick={handleClick}>게임 시작</button></div>
            <div><button className="help-button" onClick={handleClick2}>도움말</button></div>
            <div><button className="leader-board-button"onClick={handleClick3}>리더보드</button></div>
             
          </div>
        </div>
      </div>
    </>
  )
}

export default Home;