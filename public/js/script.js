import formValidation from "./validation.js";

const booksContainer = document.getElementById("books-container");
const submitButton = document.getElementById("submit");
const addBookButton = document.getElementById("add-book-button");
const formContainer = document.getElementById("form-container");
const returnButton = document.getElementById("return");
const dropdownMenu = document.querySelector("#dropdown-menu");
const signOutContainer = document.querySelector("#sign-out-container");

dropdownMenu.addEventListener("click", function () {
  signOutContainer.className === "disabled"
    ? signOutContainer.removeAttribute("class", "disabled")
    : (signOutContainer.className = "disabled");
});

let currentUser;

class Book {
  constructor(title, author, pages, status, id, user) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.id = id;
    this.user = user;
  }

  get info() {
    return this.info();
  }

  info() {
    return (
      this.title + "<br/>Author: " + this.author + "<br/>Pages: " + this.pages
    );
  }
}

let myLibrary = [];

function addBookToLibrary(
  titleInput,
  authorInput,
  pagesInput,
  statusInput,
  id,
  currentUser
) {
  myLibrary.push(
    new Book(titleInput, authorInput, pagesInput, statusInput, id, currentUser)
  );
}

function displayBooks() {
  myLibrary.forEach(function (book) {
    const bookCard = document.createElement("div");
    const readButton = document.createElement("button");
    const removeButton = document.createElement("button");
    const icon = document.createElement("i");

    bookCard.classList.add("book-card");
    bookCard.setAttribute("id", book.id);
    bookCard.innerHTML = book.info();
    bookCard.appendChild(readButton);
    readButton.innerHTML = "Status: " + book.status;
    readButton.classList.add("status-button");
    booksContainer.appendChild(bookCard);
    bookCard.appendChild(removeButton);
    icon.className = "fa-solid fa-xmark";
    removeButton.append(icon);
    removeButton.classList.add("remove-button");
    removeButton.addEventListener("click", function () {
      deleteBook(book.id);
    });
    readButton.addEventListener("click", function () {
      if (book.status === "Read") {
        updateBook(book.id, "Not read");
      } else if (book.status === "Not read") {
        updateBook(book.id, "Read");
      }
    });
  });
}

addBookButton.addEventListener("click", function () {
  formContainer.classList.add("show");
});

returnButton.addEventListener("click", function () {
  formContainer.classList.remove("show");
});

//firestore setup and fetching data

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.4/firebase-app.js";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgK1ZeCpvDlgfkv6MZYDrzX7r8oefE6uM",
  authDomain: "library-6a4c4.firebaseapp.com",
  databaseURL: "https://library-6a4c4-default-rtdb.firebaseio.com",
  projectId: "library-6a4c4",
  storageBucket: "library-6a4c4.appspot.com",
  messagingSenderId: "69691231438",
  appId: "1:69691231438:web:7e33675997a3d5fda4549f",
  measurementId: "G-4CCXRKP152",
};

// init firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "books");

//real time collection data

function removeAllBooks() {
  while (booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }
}

function retrieveBooks(user) {
  if (user) {
    const userQuery = query(colRef, where("user", "==", user.uid));
    onSnapshot(userQuery, (snapshot) => {
      myLibrary.splice(0, myLibrary.length);
      removeAllBooks();
      snapshot.docs.forEach((doc) => {
        let data = doc.data();
        addBookToLibrary(
          data.title,
          data.author,
          data.pages,
          data.status,
          doc.id,
          data.user
        );
      });
      displayBooks();
    });
  } else {
    removeAllBooks();
    const div = document.createElement("div");
    div.className = "div-homepage";
    const img = document.createElement("img");
    img.src = "assets/images/5836.png";
    img.className = "img-homepage";
    div.innerHTML = "Log in to see your books";

    booksContainer.append(div);
    document.querySelector(".div-homepage").append(img);
  }
}

//adding documents

submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let validation = formValidation();
  if (validation) {
    const titleInput = document.getElementById("title").value;
    const authorInput = document.getElementById("author").value;
    const pagesInput = document.getElementById("pages").value;
    const statusInput = document.querySelector(
      'input[name="read-or-not-read"]:checked'
    ).value;
    const form = document.getElementById("form");

    addDoc(colRef, {
      title: titleInput,
      author: authorInput,
      pages: pagesInput,
      status: statusInput,
      user: currentUser,
    }).then(() => {
      formContainer.classList.remove("show");
      form.reset();
    });
  }
});

//deleting documents

function deleteBook(id) {
  const docRef = doc(db, "books", id);
  deleteDoc(docRef);
}

//updating documents

function updateBook(id, bookStatus) {
  const docRef = doc(db, "books", id);
  updateDoc(docRef, {
    status: bookStatus,
  });
}

//authentification

import {
  onAuthStateChanged,
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "https://www.gstatic.com/firebasejs/9.8.4/firebase-auth.js";

const provider = new GoogleAuthProvider();
const auth = getAuth();

//log in

function logIn() {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      currentUser = token;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

//log out

function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

//auth changes

onAuthStateChanged(auth, (user) => {
  user ? userLoggedIn(user) : userLoggedOut(user);
});

const signInButton = document.querySelector("#sign-in-button");
const signOutButton = document.querySelector("#sign-out-button");
const signedInContainer = document.querySelector("#signed-in-container");
const signedOutContainer = document.querySelector("#signed-out-container");
const userName = document.querySelector("#user-name");
const userImg = document.querySelector("#user-img");

signInButton.addEventListener("click", logIn);

signOutButton.addEventListener("click", logOut);

function userLoggedIn(user) {
  retrieveBooks(user);
  currentUser = user.uid;
  signedOutContainer.className = "disabled";
  signOutContainer.className = "disabled";
  dropdownMenu.classList.remove("disabled");
  userImg.src = user.photoURL;
  userName.innerHTML = "Hello, " + user.displayName;
  signedInContainer.removeAttribute("class", "disabled");
  addBookButton.removeAttribute("class");
}

function userLoggedOut(user) {
  signedInContainer.className = "disabled";
  signedOutContainer.removeAttribute("class", "disabled");
  dropdownMenu.classList.add("disabled");
  addBookButton.className = "disabled";
  retrieveBooks(user);
  currentUser = null;
}
