import { addDoc, collection, db } from "../../firebase.js";


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
window.toggleMenu = toggleMenu;



const title = document.querySelector("#title");
const category = document.querySelector("#category");
const Question = document.querySelector("#question");
const option1 = document.querySelector("#option1");
const option2 = document.querySelector("#option2");
const option3 = document.querySelector("#option3");
const option4 = document.querySelector("#option4");
const correctAns = document.querySelector("#correctAns");
const questionArr = [];


const createQuiz = async () => {
    try {
        if (!title.value.trim() || !category.value.trim()) {
            alert("Title and category is required");
            return
        }
    
        const quizesData = {
            title: title.value.trim(),
            category: category.value.trim(),
            question: questionArr,
            isActive: false
        }
    
        const docRef = await addDoc(collection(db, "quezzes"), quizesData)
        title.value = "";
        category.value = "";
        Question.value = "";
        option1.value = "";
        option2.value = "";
        option3.value = "";
        option4.value = "";
        correctAns.value = "";
    
        alert("Quiz Created Successfully")
        window.location.replace("../dashboard/dahsboard.html")
        
    } catch (error) {
        alert(error.message)
    }

}



const addQuestion = () => {
    if (!Question.value.trim() || !option1.value.trim() || !option2.value.trim() || !option3.value.trim() || !option4.value.trim() || !correctAns.value.trim()) {
        alert("All fields Are Required")
        return
    }
    const questions = {
        Question: Question.value.trim(),
        options: [option1.value.trim(), option2.value.trim(), option3.value.trim(), option4.value.trim()],
        correctAns: correctAns.value.trim()
    }
    questionArr.push(questions)
    Question.value = ""
    option1.value = ""
    option2.value = ""
    option3.value = ""
    option4.value = ""
    correctAns.value = ""




    console.log("questions", questions)
    console.log("questionArr", questionArr)
}
window.createQuiz = createQuiz;
window.addQuestion = addQuestion;