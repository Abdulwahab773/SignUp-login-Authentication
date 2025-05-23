document.getElementById('toggleSidebar').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('collapsed');
});

import { deleteDoc, updateDoc, auth, signOut, onAuthStateChanged, sendEmailVerification, deleteUser, db, doc, setDoc, addDoc, Timestamp, collection, getDocs, onSnapshot, query, orderBy } from "./firebase.js";

let userName = document.getElementById("user-name");
let userEmail = document.getElementById("user-email");
let uid = document.getElementById("uid");
let createdDate = document.getElementById("created-date");
let logoutBtn = document.getElementById("logout-btn");
let userImage = document.getElementById("userImage");
let deleteBtn = document.getElementById("delete-btn");

// Todo
let todoInput = document.getElementById("todoInput");
let todoAddBtn = document.getElementById("todoAddBtn");
let todoList = document.getElementById("todoList");
let currentUID = null;


onAuthStateChanged(auth, (user) => {
    if (user) {
        currentUID = user.uid;
        const email = user.email;
        const userId = user.uid;
        const date = user.metadata.creationTime;
        const creationTime = date.slice(4, 17);
        const nameOfUser = user.displayName;
        const photoURL = user.photoURL;

        userName.innerHTML = nameOfUser || "Not Provided";
        userEmail.innerHTML = email;
        uid.innerHTML = userId;
        createdDate.innerHTML = creationTime;

        if (user.photoURL === null) {
            userImage.src = "https://cdn-icons-png.flaticon.com/512/12225/12225935.png";
        } else {
            userImage.src = photoURL
        }
    }
    getTodo();
});


let logOut = () => {
    signOut(auth).then(() => {
        location = "./index.html";

    }).catch((error) => {
        console.log(error);
    });
}


let deleteAcc = () => {
    const user = auth.currentUser;

    deleteUser(user).then(() => {
        Swal.fire({
            title: "Deleted!",
            text: "Your Account has been deleted.",
            icon: "success"
        });
        setTimeout(() => {
            location = "./index.html"
        }, 700)
    })
        .catch((error) => {
            console.log(error);
        });
}


let addTodo = async () => {
    if (todoInput.value.trim()) {
        const docRef = await addDoc(collection(db, currentUID), {
            todo: todoInput.value,
            timestamp: Timestamp.now()
        });
        todoInput.value = "";
    } else {
        Swal.fire({
            text: "Please Write Something.",
            icon: "error"
        });
    }
}



let getTodo = async () => {
    let collectionRef = collection(db, currentUID);
    let dbRef = query(collectionRef, orderBy("timestamp", "asc"))
    await onSnapshot(dbRef, (snapshot) => {
        todoList.innerHTML = "";
        todoInput.value = "";
        snapshot.forEach((docs) => {
            let data = docs.data();
            todoList.innerHTML += `<li class="todo-item">
                  <span id="todoText" class="task-text">${data.todo}</span>
                     <div class="task-actions">
                         <button onclick="completedTodo(this)" class="complete-btn"><i class="fas fa-check"></i></button>
                         <button onclick="deleteTodo('${docs.id}')" class="delete-task-btn"><i class="fas fa-trash"></i></button>
                         <button onclick="updateTodo('${docs.id}')" class="update-task-btn"><i class="fa-solid fa-pen-to-square"></i></button>
                     </div>
                     </li>`
        })
    })
}

let deleteTodo = async (id) => {
    await deleteDoc(doc(db, currentUID, id));
}

let updateTodo = async (id) => {
    let updatedVal = prompt("Enter Updated Msg:")
    const dbRef = doc(db, currentUID, id);
    await updateDoc(dbRef, {
        todo: updatedVal
    });
}


let completedTodo = (btn) => {
    btn.closest(".todo-item").querySelector(".task-text").style.textDecoration = "line-through";
};


window.deleteTodo = deleteTodo;
window.completedTodo = completedTodo;
window.updateTodo = updateTodo;

deleteBtn.addEventListener('click', deleteAcc);
logoutBtn.addEventListener('click', logOut);
todoAddBtn.addEventListener('click', addTodo);