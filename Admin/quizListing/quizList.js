import { collection, db, doc, getDoc, getDocs, updateDoc } from "../../firebase.js"
import { signout } from "../../Utilis/utils.js"

const authCheck = () => {
    const user = localStorage.getItem("user")
    if (user == null) {
        window.location.replace("../../index.html")
    }
}


window.addEventListener("load", authCheck)
window.authCheck = authCheck

function toggleMenu() {
    var navbar = document.querySelector('.navbar');
    navbar.classList.toggle('menu-open');
}

const quizList = document.querySelector(".quizList");

const callData = async () => {
    
    const querySnapshot = await getDocs(collection(db, "quezzes"));
    quizList.innerHTML = ""
    querySnapshot.forEach((doc) => {
        quizList.innerHTML += `<div class="card">
        <h4>${doc.data().title} </h4>
        <h4>${doc.data().category} </h4>
        ${doc.data().isActive === true ? `<Button onclick="toggleFunc(this , 'active')" id=${doc.id} class="active">Active</Button>` : `<Button id=${doc.id} onclick="toggleFunc(this , 'inactive')" class="inActive">Inactive</Button>`}
        </div>`
        
        
        
    })
    
    console.log("getdData")
}

window.addEventListener("load", callData)
const toggleFunc = async (ele, status) => {
    const cardid = ele.id;
    const washingtonRef = doc(db, "quezzes", cardid)
    await updateDoc(washingtonRef, {
        isActive: status === "active" ? false : true
    })
    
    callData()
    
}


window.signout =signout
window.toggleFunc = toggleFunc;
window.callData = callData;
window.toggleMenu = toggleMenu;