import './header.css'
import logo from '../../assets/imgs/argentBankLogo.webp'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setUserData } from '../../redux/reducer';
import { signOut } from '../../redux/reducer';
import { getUserInfo } from '../../redux/actions';

export default function Header() {
  const dispatch = useDispatch();
  let token = useSelector(state => state.token);
  let data = useSelector(state => state.userData);
  function isConnected() {
    if (token === undefined || token === null || token === "") {
      return false
    } else {
      return true
    }
  }

  async function fetchData() {
    if(data === undefined || data === null || data === "") {
      let dataInfo = await getUserInfo(token)
      if (dataInfo !== null || dataInfo !== undefined) {
        dispatch(setUserData(dataInfo))
      }
    }
  }

  if (isConnected()) {
    fetchData()
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