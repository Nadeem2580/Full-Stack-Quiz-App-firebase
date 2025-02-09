import { signout } from "../../Utilis/utils.js"
const authCheck = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user == null) {
        window.location.replace("../../index.html")
    }
    
    if (user.type !== "admin") {
        window.location.replace("../../User/Dashboard/dashboard.html")
    }
}
window.authCheck = authCheck

function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('menu-open');
}
window.toggleMenu = toggleMenu;

window.addEventListener("load", authCheck)
window.signout =signout