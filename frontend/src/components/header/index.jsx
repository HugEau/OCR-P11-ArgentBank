import './header.css'
import logo from '../../assets/imgs/argentBankLogo.webp'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserData } from '../../store';
import { signOut } from '../../store';

export default function Header() {
  const dispatch = useDispatch();
  let token = useSelector(state => state.token);
  let data = useSelector(state => state.userData);

  async function getUserInfo() {
    try {
      let userInfo = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      let data = await userInfo.json()
      dispatch(setUserData(data.body))
    } catch (error) {
      console.error(error, "Error getting user info");
    }
  }

  if (useSelector(state => state.connected) === true){
    if(data === undefined || data === null) {
      getUserInfo()
    }
    return (
      <nav className="main-nav">
        <a className="main-nav-logo" href="/profile">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </a>
        <div className='main-nav-utility'>
          <a className="main-nav-item" href="/profile">
            <p>{data !== null || data !== undefined ? data.userName : "Failed fetching Username"}</p>
            <i className="fa fa-user-circle fa-2xl"></i>
          </a>
          <a className='main-nav-item' href='/profile' >
            <i className="fa fa-gear fa-2xl"></i>
          </a>
          <a className="main-nav-item" onClick={() => dispatch(signOut())} href='/login'>
            <i className="fa fa-power-off fa-2xl"></i>
          </a>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="main-nav">
        <a className="main-nav-logo" href="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
        </a>
        <div>
          <a className="main-nav-item" href="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </a>
        </div>
      </nav>
    );
  }
}