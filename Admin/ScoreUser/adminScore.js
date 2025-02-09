import { collection, db, getDocs, query, where } from "../../firebase.js";
import { signout } from "../../Utilis/utils.js"
const scoreTable = document.querySelector("#scoreTable");
let count = 0;

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
const renderScore = async () => {
    try {
        const getScoresList = await getDocs(collection(db, "scores"));
        getScoresList.forEach((doc) => {
            const percent = (doc.data().score / doc.data().totalQues) * 100
            ++count
            scoreTable.innerHTML += `<tbody>
            <tr>
            <td>${count}</td>
            <td>${doc.data().userName}</td>
            <td>${doc.data().quizTitle}</td>
            <td>${doc.data().score}</td>
            <td>${doc.data().wrongAns}</td>
            <td>${doc.data().totalQues}</td>
            <td>${percent} %</td>
            </tr>
            
            </tbody>
            `
        })

    } catch (error) {
        alert("error", error.message)
    }
}

const dropDownHandling = async () => {
    try {
        const dropDownList = document.querySelector("#dropDownList")
        const querySnapshot = await getDocs(collection(db, "quezzes"))
        dropDownList.innerHTML = ""
        dropDownList.innerHTML += `<option value="">ALL Users Score </option>`;
        querySnapshot.forEach((doc) => {
            dropDownList.innerHTML += `<option value="${doc.id}">${doc.data().title}</option>`

        })

    } catch (error) {
        alert(error.message)
    }

}
let countNumber = 0;

const filterTitle = async (ele) => {
    try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (ele.value === "") {
            const q = query(collection(db, "scores"));
            scoreTable.innerHTML = `
            <tr>
                <td>No#</td>
                <td>Name</td>
                <td>Quiz Name</td>
                <td>Score</td>
                <td>Wrong Ans</td>
                <td>Total Question</td>
                <td>Percentage%</td>
            </tr>`;

            const querySnapshot = await getDocs(q);
            countNumber = 0;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const per = (data.score / data.totalQues) * 100;
                scoreTable.innerHTML += `
                <tr>
                    <td>${++countNumber}</td>
                    <td>${data.userName}</td>
                    <td>${data.quizTitle}</td>
                    <td>${data.score}</td>
                    <td>${data.wrongAns}</td>
                    <td>${data.totalQues}</td>
                    <td>${per.toFixed(1)}%</td>
                </tr>`;
            });
        } else {

            const q = query(collection(db, "scores"), where("quizId", "==", ele.value));
            scoreTable.innerHTML = `
            <tr>
                <td>No#</td>
                <td>Name</td>
                <td>Quiz Name</td>
                <td>Score</td>
                <td>Wrong Ans</td>
                <td>Total Question</td>
                <td>Percentage%</td>
            </tr>`;

            const querySnapshot = await getDocs(q);
            countNumber = 0;

            querySnapshot.forEach(doc => {
                const data = doc.data();
                const per = (data.score / data.totalQues) * 100;
                scoreTable.innerHTML += `
                <tr>
                    <td>${++countNumber}</td>
                    <td>${data.userName}</td>
                    <td>${data.quizTitle}</td>
                    <td>${data.score}</td>
                    <td>${data.wrongAns}</td>
                    <td>${data.totalQues}</td>
                    <td>${per.toFixed(1)}%</td>
                </tr>`;
            });
        }
    } catch (error) {
        alert(error.message)
    }
}





window.filterTitle = filterTitle;
window.dropDownHandling = dropDownHandling;
window.renderScore = renderScore;
window.toggleMenu = toggleMenu;
window.signout = signout