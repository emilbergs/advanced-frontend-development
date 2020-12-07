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

let _selectedUserId = "";
let _posts = [];

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
    appendPostsBygSelv(posts);
});

//Filter function
function appendPosts(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
        htmlTemplate += /*html*/ `
        <article>
        <img src="${post.image}" class="postImage"><br>
        <button id="${post.id}">Læs mere</button>
        </article>
    `;
    }
    document.querySelector('.content').innerHTML = htmlTemplate
}
function showFilter() {
    let filter = document.querySelector("#filter")
    document.body.style.overflowY = "hidden";
    filter.style.display = "block";
    let template = /*html*/ `
    <h2 id="filterFontOverskrift">Filter</h2>
    <p id="filterFont">Her kan du filtrere gennem </br> vores udvalg af øl<p>
    <div class="flexFilter">
        <div class="flexFilterItems">
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'Jule øl'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>Jule øl</p></a>
            </div>
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'Sour'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>Sour</p></a>
            </div>
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'Barley wine'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>Barley wine</p></a>
            </div>
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'IPA'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>IPA</p></a>
            </div>
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'Stout'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>Stout</p></a>
            </div>
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'Porter'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>Porter</p></a>
            </div>
            <div class="filterButtons">
            <a href="#ol" onclick="changeColor(this, 'Belgian Ale'); searchFunctionGenre(); noToggleMenu();" class="notselected"><p>Belgian Ale</p></a>
            </div>
            
        </div>
    </div>
    
    <a id="closemenu" onclick="noToggleMenu()"><img src="img/closeFilterIcon.png"></a>
    `;
    document.querySelector("#filter").innerHTML = template;
}
let selectedCategory = "";


//Search
function searchFunctionGenre() {
    let filteredSearch = [];
    for (const post of _posts) {
        if (post.category === selectedCategory) {
            filteredSearch.push(post)
        }
    }
    appendFilteredPosts(filteredSearch);
}


function appendFilteredPosts(posts) {
    let htmlTemplate = "";
    for (const post of posts) {
        htmlTemplate += `
    <article>
        <h3>${post.category}</h3>
        <img src="${post.image}" class="postImage"><br>
    </article>
    `;
    }
    document.querySelector('#searchFilteredPosts').innerHTML = htmlTemplate;

}
let filterButton = document.querySelector("#filterDiv");
filterButton.addEventListener("click", showFilter);

function changeColor(element, category) {
    let selected = document.querySelector(".selected");
    if (selected) {
        selected.classList.remove("selected");
    } else {
        element.classList.add("selected");
    }
    selectedCategory = category;
}

// Remove filter
function noToggleMenu() {
    let filter = document.querySelector("#filter");
    filter.style.display = "none";
    document.body.style.overflowY = "auto";
}


let bygSelvArray = [];

function appendBygSelv(kasse){
    bygSelvArray.push(kasse)
    console.log(bygSelvArray)
}
function removeBygSelv() {
    bygSelvArray.pop()
    document.querySelectorAll(".checkbox").checked = false;
    while(bygSelvOlArray.length > 0) {
        bygSelvOlArray.pop();
    }
    let items=document.querySelectorAll('.checkbox');
				for(let i=0; i<items.length; i++){
					if(items[i].type=='checkbox')
						items[i].checked=false;
	}
}



function appendPostsBygSelv(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
        htmlTemplate += /*html*/ `
        <article id="${post.id}">
        <h3>${post.name}</h3>
        <img src="${post.image}" class="postImage"><br>
        <a id="${post.id}">Læs mere</a><br>
        <form>
            <label for="checked">Vælg:</label>
            <input type="checkbox" name="checked" id="${post.id}" class="checkbox" onclick="appendBygSelvOl(this.id); limitArray()">
        </form>
        </article>
    `;
    }
    document.querySelector('#bygSelvContent').innerHTML = htmlTemplate
}

let bygSelvOlArray = [];

function appendBygSelvOl(ol) {
    let checkBox = document.querySelector(".checkbox");
    if (checkBox.checked == true){
    bygSelvOlArray.push(ol)
    console.log(bygSelvOlArray)
    }
}

function limitArray() {
    let kasse1 = 4;
    let kasse2 = 8;
    let kasse3 = 12;
    let kasse4 = 16;

    if (bygSelvArray.includes("kasse1") && kasse1 === bygSelvOlArray.length) {
        console.log("Kasse 1 fyldt")
        window.location = "#step3"
    } else if (bygSelvArray.includes("kasse2") && kasse2 === bygSelvOlArray.length) {
        console.log("Kasse 2 fyldt")
        window.location = "#step3"
    } else if (bygSelvArray.includes("kasse3") && kasse3 === bygSelvOlArray.length) {
        console.log("Kasse 3 fyldt")
        window.location = "#step3"
    } else if (bygSelvArray.includes("kasse4") && kasse4 === bygSelvOlArray.length) {
        console.log("Kasse 4 fyldt")
        window.location = "#step3"
    }
}
