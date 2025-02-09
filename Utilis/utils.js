const signout = () => {
    localStorage.clear();
    sessionStorage.clear();
    authCheck()
}



export { signout }

window.signout = signout;