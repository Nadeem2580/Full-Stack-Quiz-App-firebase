import { addDoc,setDoc,doc, auth, collection, db, createUserWithEmailAndPassword } from "../../firebase.js"

const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const mobileNumber = document.querySelector("#mobileNumber")
const email = document.querySelector("#email")
const password = document.querySelector("#password")
const btn = document.querySelector(".btn");
const cPassword = document.querySelector("#cPassword");
let count = 0;


const numbervalid = () => {
    if (mobileNumber.value.length === 4) {
        mobileNumber.value += "-";
    }
    if (mobileNumber.value.length < 12) {
        mobileNumber.style.border = "2px solid red"

    }
    if (mobileNumber.value.length == 12) {
        mobileNumber.style.border = "2px solid orange"

    }

    if (mobileNumber.value.length >= 13) {
        mobileNumber.style.border = "2px solid red"
        return
    }
}


const signUp = async () => {

    if (firstName.value.trim().length < 3) {
        alert("Enter valid first name")
        return
    }
    if (lastName.value.trim().length < 3) {
        alert("Enter valid last name")
        return
    }
    if (mobileNumber.value.trim().length < 12 || mobileNumber.value.length > 12) {
        alert("Enter valid Mobile Number");
        return
    }

    if (email.value.trim().length < 3) {
        alert("Enter valid Email Number");
        return
    }

    if (password.value.trim().length < 6) {
        alert("Enter valid Password Number");
        return
    }

    if (cPassword.value.trim() != password.value.trim()) {
        alert("Password does not match");
        return
    }
    console.log("fields validation done");
    const singInprocess = await createUserWithEmailAndPassword(auth, email.value, password.value)
    const uid = singInprocess.user.uid;
    const userData = {
        firstName: firstName.value,
        lastName: lastName.value,
        mobileNumber: mobileNumber.value,
        email: email.value,
        isBlock: false,
        isDeleted: false,
        type: "user"
    }
    
    await setDoc(doc(db, "userData", uid), userData)
    

    alert("Sign Up Successfully");
    firstName.value = "";
    lastName.value = "";
    mobileNumber.value = "";
    email.value = "";
    password.value = "";
    cPassword.value = "";
    window.location.replace("../../index.html")
}


window.numbervalid = numbervalid;
window.signUp = signUp;