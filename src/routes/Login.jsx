import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [password, setPassword] = useState('');
  const [rememberPassword, setRememberPassword] = useState(false);
  const [username, setUserName] = useState('');
  const navigate=useNavigate()

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
const handleUserNameChange =(event)=>{
  setUserName(event.target.value);

}
  const handleCheckboxChange = (event) => {
    setRememberPassword(event.target.checked);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rememberPassword) {
      localStorage.setItem('password', password);
    }
     if (username==='atuny0 ' && password==='9uQFF1Lh	')
     navigate('/admin')
     else 
     navigate('/signup')



  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        UserName:
        <input type="text" value={username} onChange={handleUserNameChange} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={handlePasswordChange} />
      </label>
      <label>
        Remember password:
        <input type="checkbox" checked={rememberPassword} onChange={handleCheckboxChange} />
      </label>
      <button type="submit">Log in</button>
    </form>
  );
}