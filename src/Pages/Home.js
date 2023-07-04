// import { useHistory } from 'react-router-dom';

function Home() {
    // const history = useHistory();

    const handleLogin = () => {
        window.location.href = "/Login";
    };

    const handleRegister = () => {
        window.location.href = "/Register";
    };

    return (
        <div className="home">
            Welcome to your very own book management system, where you can add books that interest you to read in the future or add books that you have already read with your own customized review. Sign in or register to better manage your book world!!
            <br />
            <div className="login-home-button" onClick={handleLogin}>Login</div>
            <div className="register-home-button" onClick={handleRegister}>Register</div>
        </div>
    )
}

export default Home;
