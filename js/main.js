var firebaseConfig = {
    apiKey: "AIzaSyDNik69yt4GrIvYjA5_GahGfIf2V1f6w94",
    authDomain: "advanced-frontend-88240.firebaseapp.com",
    projectId: "advanced-frontend-88240",
    storageBucket: "advanced-frontend-88240.appspot.com",
    messagingSenderId: "33450552290",
    appId: "1:33450552290:web:021aa199be8b645e0ea7bb"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const emailRef = db.collection("email");
const postRef = db.collection("posts");

const burger = document.querySelector(".burger");
const white = document.querySelector(".white")
const nav = document.querySelector(".navBar")
const logo = document.querySelector(".logo")
const main = document.querySelector(".main")

burger.addEventListener("click", function(){
    burger.classList.toggle("open");
    nav.classList.toggle("show")
    logo.classList.toggle("hide")
    main.classList.toggle("hide")
});

function show() {
    burger.classList.toggle("open");
    nav.classList.toggle("show")
    logo.classList.toggle("hide")
    main.classList.toggle("hide")
}

function createEmail() {
    // references to the input fields
    let emailInput = document.querySelector("#yourEmail");
    let newEmail = {
        email: emailInput.value,
    };
    emailRef.add(newEmail);
    emailInput.value = "Thanks!";
}

postRef.onSnapshot(function (snapshotData) {
    let posts = [];
    snapshotData.forEach(function (doc) {
        let post = doc.data();
        console.log(post);
        post.id = doc.id;
        posts.push(post);
    });
    appendPosts(posts);
});

function appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
        htmlTemplate += /*html*/ `
        <article>
        <h3>${post.description}</h3>
        <img src="${post.image}" class="postImage"><br>
        <button id="${post.id}">Læs mere</button>
        </article>
    `;
    }
    document.querySelector('.content').innerHTML = htmlTemplate
}

function bygSelv() {
    // references to the input fields
    let kasse1Input = document.querySelector("#kasse1").value;
    let kasse2Input = document.querySelector("#kasse2").value;
    let kasse3Input = document.querySelector("#kasse3").value;
    let kasse4Input = document.querySelector("#kasse4").value;

    let newUser = {
        year: "2020",
        yearCows: nrCowsInput.value,
        kgMilk: kgMilkInput.value,
        diesel: dieselInput.value,
        electricity: electricityInput.value,
        dryMatter: dryMatterInput.value,
        selfFeed: selfFeedInput.value
    };
      firebase.auth().onAuthStateChanged(function (user) {
      console.log(user.email);
      year6.doc(user.email).set(newUser);
    });
}