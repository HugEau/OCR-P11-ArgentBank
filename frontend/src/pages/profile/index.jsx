import './profile.css';
import AccountCard from '../../components/accountCard';
import accountsList from '../../assets/datas/accounts';

export default function Profile() {
    const accounts = accountsList.accounts
    return (
        <main className="main">
            <div className="header">
                <h1>Welcome back<br />Tony Jarvis!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            <h2 className="sr-only">Accounts</h2>
            {accounts.map((account, index) => (
                <AccountCard key={index} account={account} isHomeProfile={true}/>
            ))    
            }
        </main>
    )
}