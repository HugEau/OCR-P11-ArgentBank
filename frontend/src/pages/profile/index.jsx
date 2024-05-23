import './profile.css';
import AccountCard from '../../components/accountCard';
import accountsList from '../../assets/datas/accounts';
import { setUserData } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

export default function Profile() {
    const accounts = accountsList.accounts
    const dispatch = useDispatch();
    let data = useSelector(state => state.userData);
    let token = useSelector(state => state.token);
    
    
    const [modifyAccountAsked, setModifyAccountAsked] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        if (data === undefined || data === null) {
            window.location.href = '/login';
        } else {
            setUserName(data.userName);
        }
    }, [data]);

    function handleChange(e) {
        setUserName(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        let userName = e.target.username.value
        try {
            let fetching = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                body: JSON.stringify({ "userName": userName }),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
            let response = await fetching.json()
            setModifyAccountAsked(false)
            dispatch(setUserData(response.body))
        } catch (error) {
            console.error(error, "Error modifying username");
        }
        console.log("Submit")
    }

    if (token === undefined || token === null) {
        return (
            window.location.href = '/login'
        )
    } else {
        return (
            <main className="main">
                <div className="header">
                    {!modifyAccountAsked ? (
                        <>
                            <h1>Welcome back<br /> {`${data.firstName} ${data.lastName}`}!</h1>
                            <button className="button" onClick={() => {
                                setModifyAccountAsked(true)
                            }} >
                                Edit Name
                            </button>
                        </>
                    ) : (
                        <>
                            <h1>Edit your name</h1>
                            <form className="modifyAccountForm" onSubmit={(e) => handleSubmit(e)}>
                                <div className='formGroup'>
                                    <label htmlFor="username">User Name :</label>
                                    <input type="text" name="username" placeholder={"username"} value={userName} onChange={handleChange} />
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="firstName">First Name :</label>
                                    <input type="text" placeholder={data.firstName} disabled />
                                </div>
                                <div className='formGroup'>
                                    <label htmlFor="lastName">Last Name :</label>
                                    <input type="text" placeholder={data.lastName} disabled />
                                </div>
                                <div className='formGroup'>
                                    <button className="button" type="submit">Save</button>
                                    <button className="button" onClick={() => setModifyAccountAsked(false)}>Cancel</button>
                                </div>
                            </form>
                        </>
                    )
                    }
                </div>
                <h2 className="sr-only">Accounts</h2>
                {accounts.map((account, index) => (
                    <AccountCard key={index} account={account} isHomeProfile={true} />
                ))
                }
            </main>
        )
    }
}