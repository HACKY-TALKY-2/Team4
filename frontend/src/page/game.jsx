import { useState, useEffect } from 'react';
import './game.css';

function Game() {
  const storedId = localStorage.getItem('id');
  const [id, setId] = useState(storedId);

  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);
  const [inputText, setInputText] = useState('');
  const [count, setCount] = useState(0);

  const [problem, setProblem] = useState([
    ['김', 0],
    ['포', 0],
    ['공', 0],
    ['항', 0],
    ['여', 0],
    ['의', 0],
    ['도', 0],
    ['공', 0],
    ['덕', 0],
  ]);

  const isCorrect = problem.some(([_, answer]) => answer !== 0);

  const handleIdInput = () => {
    const userInput = prompt('닉네임을 입력하세요.:');
    if (userInput) {
      localStorage.setItem('id', userInput);
      setId(userInput);
    }
  };

  const checkAnswer = () => {
    if (isCorrect) {
      alert('정답입니다!');
      setCount((prevCount) => prevCount + 1);

      if (count === 2) {
        setScore((prevScore) => prevScore + 10);
        setRound((prevRound) => prevRound + 1);
        setCount(0);
        alert('다음 라운드로 이동!');
      }
    } else {
      alert('오답입니다!');
    }
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
        {id ? (
          <> 
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