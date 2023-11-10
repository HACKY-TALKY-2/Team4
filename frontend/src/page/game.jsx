import { useState, useEffect } from 'react';
import './game.css';
import axios from 'axios'; 

function Game() {
  const storedId = localStorage.getItem('id');
  const [name, setName] = useState(storedId);

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [inputText, setInputText] = useState(''); 
  const [game, setGame] = useState(null);

  const [count, setCount] = useState(30);
  const [realTimeCount, setRealTimeCount] = useState(count);

  const [problem, setProblem] = useState([
    ['.', 1],
    ['.', 1],
    ['.', 1],
    ['.', 1],
    ['.', 0],
    ['.', 0],
    ['.', 0],
    ['.', 0],
    ['.', 0],
  ]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setRealTimeCount(prevCount => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(timerInterval);
          alert('시간 초과로 Game Over!');
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [count]);
  

  useEffect(() => {
    async function postData() {
      try {
        const response = await axios.post('https://y3y-back.up.railway.app/game/create', {
          id: null,
          name: name,
        });
        console.log(response.data);
        setProblem(response.data.problem);
        setGame(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    postData();
  }, [name]);
  
   
  
  const isCorrect = problem.some(([_, answer]) => answer !== 0);

  const handleIdInput = () => {
    const userInput = prompt('닉네임을 입력하세요.:');
    if (userInput) {
      localStorage.setItem('id', userInput);
      setName(userInput);
    }
  };

  const checkAnswer = () => {
    async function postData() {
      try {
        const response = await axios.post('https://y3y-back.up.railway.app/game/guess', {
          id: game.id,
          guess: inputText,
        });
        console.log(response.data);
        const game2= response.data;
        
      } catch (error) {
        console.error(error);
      }
    }
    if (isCorrect) {
      alert('정답입니다!');
      setCount((prevCount) => prevCount + 1);

      if (game2.goToNewRound) {
        alert('다음 라운드로 이동!');
        setScore(data.round);
        setRound((prevRound) => prevRound + 1);
        setCount(0);
      }     
    }
    else {
      alert('오답입니다!');
      setRealTimeCount((prevCount) => Math.max(0, prevCount - 5));
    } 
    postData();
  };

  const renderProblem = () => {
    const rows = 3;
    const cols = 3;

    const table = [];

    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < cols; j++) {
        const index = i * cols + j;
        const [char, _] = problem[index];
        row.push(
          <div key={index} className="character-container">
            <div className="character-text">{char}</div>
          </div>
        );
      }
      table.push(<div key={i} className="board-row">{row}</div>);
    }

    return table;
  };

  return (
    <>
      <div>
        {name ? (
          <>
            <div className="timer"> {realTimeCount} </div>
  
            <div className="round">{round}라운드</div>
            <div className="score">점수 : {score}</div>
            <div className="board">{renderProblem()}</div>
            <div>
              <input
                type="text"
                className="subway-user-input"
                placeholder="무슨 역일까?"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
              <button className="checker" onClick={checkAnswer}>확인</button>
            </div>
          </>
        ) : (
          <button onClick={handleIdInput}>닉네임 입력</button>
        )}
      </div>
    </>
  );
}

export default Game;