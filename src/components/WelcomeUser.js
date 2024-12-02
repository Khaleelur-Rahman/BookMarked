const WelcomeUser = (user) => {
    return (
      <div className="flex justify-center items-center my-20 font-bold text-2xl text-center">
        Welcome back {user?.displayName}!
      </div>
    );
}

export default WelcomeUser;