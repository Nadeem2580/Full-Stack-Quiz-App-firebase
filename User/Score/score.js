import { collection, db, getDocs, query, where } from "../../firebase.js"
import { signout } from "../../Utilis/utils.js";
const scoreTable = document.getElementById("scoreTable")
let count = 0;

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




const getScoreListing = async () => {
    try {
        const user = JSON.parse(localStorage.getItem("user"))

        const q = query(collection(db, "scores"), where("userId", "==", user.uid))

        const querySnapshot = await getDocs(q)
    
        querySnapshot.forEach(doc => {
            ++count
            console.log(doc.data())
            const data = doc.data()
            const per = (data.score / data.totalQues) * 100
            scoreTable.innerHTML += `  <tr>
            <td> ${count} </td>
            <td>${data.userName}</td>
            <td>${data.quizTitle}</td>
            <td>${data.score}</td>
            <td>${data.wrongAns}</td>
            <td>${data.totalQues}</td>
            <td>${per.toFixed(1)}%</td>
        </tr>`
        })

        
    } catch (error) {
        alert("error", error)
    }
}









window.signout = signout;
window.getScoreListing = getScoreListing;