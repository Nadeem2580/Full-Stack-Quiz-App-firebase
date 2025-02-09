import { addDoc, collection, db, doc, getDoc } from "../../../firebase.js";
const getQuestion = document.querySelector("#question")
const options = document.querySelector(".options")
const submitBtn = document.querySelector("#submitBtn");
const nextBtn = document.querySelector("#nextBtn");
let question = [];
let indexnumber = 0;
let quizTitle = "";
let score = 0;
const checkId = async () => {
    try {
        const checkUId = sessionStorage.getItem("uid")
        console.log("checkUId", checkUId)
        if (checkUId == null) {
            window.location.replace("../dashboard.html")
        }
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.5"
        const getUId = sessionStorage.getItem("uid")
        const docSnap = await getDoc(doc(db, "quezzes", getUId));
        quizTitle = docSnap.data().title;
        return docSnap.data().question

    } catch (error) {
        return error.message
    }
};

checkId()
    .then((res) => {
        question = res
        nextBtn.disabled = true
        nextBtn.style.opacity = "0.5"

        handleQuestion()
    })
    .catch((error) => {
        alert(error.message)
    })




const handleQuestion = () => {
    const quizQues = question[indexnumber].Question;
    const allOptions = question[indexnumber].options;

    getQuestion.innerHTML = indexnumber + 1 + ")" + quizQues;
    options.innerHTML = ""
    for (var i = 0; i < allOptions.length; i++) {

        options.innerHTML += `<div class="dis">
        <input onclick="CheckedAns(this  )" type="radio" id="${allOptions[i]}" name="" value="${allOptions[i]}">
        <label for="option0">${i + 1}) ${allOptions[i]}</label>
            </div>`
    }

}

const nextQuestion = () => {
    indexnumber++
    nextBtn.disabled = true
    nextBtn.style.opacity = "0.5"

    if (indexnumber < question.length) {
        handleQuestion()
    } else if (indexnumber == question.length) {
        nextBtn.disabled = true
        nextBtn.style.opacity = "0.5"
        submitBtn.disabled = false;
        submitBtn.style.opacity = "1"
    }
}

const CheckedAns = (ele) => {

    const tempOptions = options.children;
    const correectAnswer = question[indexnumber].correctAns;


    if (ele.value == correectAnswer) {
        ele.parentElement.style.backgroundColor = "green"
        score++
    } else {
        ele.parentElement.style.backgroundColor = "red"



    }
    nextBtn.disabled = false
    nextBtn.style.opacity = "1"
    for (var i = 0; i < tempOptions.length; i++) {
        tempOptions[i].style.pointerEvents = "none";
    }

}



let popup = document.querySelector(".popup");


async function openPopup() {
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        console.log("quizTitle ", quizTitle)
        const scoreObj = {
            totalQues: question.length,
            score: score,
            wrongAns: question.length - score,
            quizId: sessionStorage.getItem("uid"),
            userId: user.uid,
            userName: user.firstName + " " + user.lastName,
            quizTitle: quizTitle
        }

        const response = await addDoc(collection(db, "scores"), scoreObj)
        console.log("response score", response)

        let tempContainer = document.querySelector(".tempContainer");
        var scored = document.querySelector(".scored");
        var correct = document.querySelector(".correct");
        var wrong = document.querySelector(".wrong");
        var PopupContainer = document.querySelector(".tick-container");
        let percent = (score / question.length) * 100;
        let wrongAns = score - question.length;
        let tickImg = document.querySelector("#tickImg");

        tempContainer.style.pointerEvents = "none"
        tempContainer.style.opacity = "0.3"

        PopupContainer.style.display = "flex";

        setTimeout(function () {
            popup.classList.add("open-popup");
        }, 10); // Adding a small delay before triggering the transition

        // Populate the content dynamically
        scored.innerHTML = `${percent < 60 ? "You failed in your quiz" : "Congratulations, you have passed!"}`;
        correct.innerHTML = `You have submitted ${score} correct answers.`;
        wrong.innerHTML = `You have submitted ${wrongAns} wrong answers.`;
    } catch (error) {
        alert(error.message)
    }

}


function closePopup() {

    popup.classList.remove("open-popup");


    setTimeout(function () {

        var PopupContainer = document.querySelector(".tick-container");
        PopupContainer.style.display = "none";
    }, 500);

    window.location.replace("../Score/score.html");
}


window.openPopup = openPopup;
window.closePopup = closePopup;
window.handleQuestion = handleQuestion;
window.checkId = checkId;
window.nextQuestion = nextQuestion;
window.CheckedAns = CheckedAns;













































































