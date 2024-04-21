
import './App.css';
import { useState } from 'react';

function App() {
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
