import './App.css';
import { useState } from 'react';

function App() {
const [time,setTime]=useState(0);
const [isRunning,setIsRunning]=useState(false);
const [intervalId, setIntervalId] = useState(null);

  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });

    console.log(userData);
  }
//timer
const startTimer = () => {
  if (!isRunning) {
    const id = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
    setIsRunning(true); // Update isRunning state to true
    setIntervalId(id);
  }
};
const stopTimer = () => {
  setIsRunning(false);
  clearInterval(intervalId);
};
const resetTimer = () => {
  setIsRunning(false);
  setTime(0);
  clearInterval(intervalId);
  setIntervalId(null);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const res = fetch('http://localhost:3000/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      if (res.status === 201) {
        console.log('success');
        setUserData({
          email: '',
          password: ''
        });
      } else {
        console.log('fail');
        setUserData({
          email: '',
          password: ''
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="App">
      <h1>ストップウォッチ</h1>
      <p>レッスン課題</p>
      <div className="timer-container">
        <div className="timer-box">
         <h1>{("00" + Math.floor(time / 3600)).slice(-2)}</h1>
        </div>
        <span className="colon">:</span>
        <div className="timer-box">
         <h1>{("00" + Math.floor((time / 60) % 60)).slice(-2)}</h1>
        </div>
        <span className="colon">:</span>
        <div className="timer-box">
          <h1>{("000" +(time % 60)).slice(-3)}</h1>
        </div>
      </div>
      <div className="button-container">
        <button onClick={startTimer}>start</button>
        <button onClick={stopTimer}>pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <h2>ユーザー登録</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input type="text" name="email" value={userData.email} onChange={handleOnChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={userData.password} onChange={handleOnChange} />
        </div>
        <button>登録</button>
      </form>
      <hr />
      <h2>ユーザー一覧</h2>
      <ul>
        <li>Email: test@test.com</li>
      </ul>
    </div>
  );
}

export default App;
