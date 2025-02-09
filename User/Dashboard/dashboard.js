import { signout } from "../../Utilis/utils.js";
import { collection, db, doc, getDocs } from "../../firebase.js";
const listContainer = document.querySelector(".listContainer")


const authCheck = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user === null) {
        window.location.replace("../../index.html")
    } else if (user.type !== "user") {
        window.location.replace("../../Admin/dashboard/dahsboard.html")
    }
    console.log(user.type)
}


window.addEventListener("load", authCheck);
window.authCheck = authCheck;



const cardRender = async () => {
try {
    const querySnapshot = await getDocs(collection(db, "quezzes"));
    listContainer.innerHTML = "";
    listContainer.innerHTML = ""
    querySnapshot.forEach((doc) => {
        if (doc.data().isActive == true) {
            listContainer.innerHTML += ` <div class="cards">
                        <h1>${doc.data().title}</h1>
                        <h4>${doc.data().category}</h4>
                        <button id=${doc.id} onclick="navigateQuiz(this)">Start Quiz</button>
                    </div>`
        }
    })    
} catch (error) {
    alert(error.message)
}

}

window.addEventListener("load", cardRender)

const navigateQuiz = (ele) => {
    const eleId = ele.id
    sessionStorage.setItem("uid", eleId)
    window.location.replace("../QuizApp/quiz.html");

    console.log("navigateQuiz")
}

window.signout = signout;
window.navigateQuiz = navigateQuiz;
window.cardRender = cardRender;