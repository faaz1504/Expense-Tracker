function LoadUser() {

  const user = localStorage.getItem("user");

  return user
    ? JSON.parse(user)
    : null;
}

export default LoadUser;