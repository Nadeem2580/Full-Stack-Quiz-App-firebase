import { auth, collection, db, getDoc, doc, signInWithEmailAndPassword } from "../../firebase.js"




const btn = document.querySelector(".btn")

const loginHandler = async () => {
    try {
        const email = document.querySelector("#email")
        const password = document.querySelector("#password")
        const userAuth = await signInWithEmailAndPassword(auth, email.value, password.value)
        const uid = userAuth.user.uid;
        const docRef = await doc(db, "userData", uid);
        const docSnap = await getDoc(docRef);
        const data = {
            ...docSnap.data(), uid
        }

        localStorage.setItem("user", JSON.stringify(data))

        if (data.type == "admin") {
            window.location.assign("./Admin/dashboard/dahsboard.html")
        } else {
            window.location.assign("./User/Dashboard/dashboard.html")

        }
        alert("Login Successfully")

    } catch (error) {
        console.log(error.message)
    }


}


const authCheck = () => {
    const user = localStorage.getItem("user")
    console.log(JSON.parse(user).type)

    if (JSON.parse(user).type == "admin") {
        window.location.replace("././Admin/dashboard/dahsboard.html")
    } else if (JSON.parse(user).type == "user") {
        window.location.replace("././User/Dashboard/dashboard.html")
    }
}


window.addEventListener("load", authCheck)






window.loginHandler = loginHandler;
window.authCheck = authCheck