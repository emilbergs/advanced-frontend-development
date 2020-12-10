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
const bestilRef = db.collection("bestillinger")

const burger = document.querySelector(".burger");
const white = document.querySelector(".white")
const nav = document.querySelector(".navBar")
const logo = document.querySelector(".logo")
const main = document.querySelector(".main")
const footer = document.querySelector("footer");

burger.addEventListener("click", function(){
    burger.classList.toggle("open");
    nav.classList.toggle("show")
    logo.classList.toggle("hide")
    main.classList.toggle("hide")
    footer.classList.toggle("hide")
    
});

function show() {
    burger.classList.toggle("open");
    nav.classList.toggle("show")
    logo.classList.toggle("hide")
    main.classList.toggle("hide")
    footer.classList.toggle("hide")
}

function createEmail1() {
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
        post.id = doc.id;
        posts.push(post);
        _posts.push(post)
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
        <h3>${post.name}</h3>
        <h4>${post.category}</h4>
        <img src="${post.image}" class="postImage"><br>
        <button id="${post.id}" onclick="searchFunctionModals(this.id); myButoon()" class="myBtn">Læs mere</button>
        </article>
    `;
    }
    document.querySelector('.content').innerHTML = htmlTemplate
    document.querySelector('.contentPC').innerHTML = htmlTemplate
}
function showFilter() {
    let filter = document.querySelector(".filter")
    filter.style.display="block";
    document.querySelector("#ol").style.display = "none"
    document.querySelector("#searchFilteredContent").style.display = "none"
    let template = /*html*/ `
    <h2 id="filterFontOverskrift">Filter</h2>
    <p id="filterFont">Her kan du filtrere gennem </br> vores udvalg af øl<p>
    <div class="flexFilter">
        <div class="flexFilterItems">
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Juleøl'); noToggleMenu();" class="notselected"><p>Juleøl</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Sour'); noToggleMenu();" class="notselected"><p>Sour</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Barley Wine'); noToggleMenu();" class="notselected"><p>Barley wine</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'IPA'); noToggleMenu();" class="notselected"><p>IPA</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Stout'); noToggleMenu();" class="notselected"><p>Stout</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Porter'); noToggleMenu();" class="notselected"><p>Porter</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Belgisk Ale'); noToggleMenu();" class="notselected"><p>Belgisk Ale</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Hvedeøl'); noToggleMenu();" class="notselected"><p>Hvedeøl</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Lager'); noToggleMenu();" class="notselected"><p>Lager</p></a>
            </div>
            
        </div>
    </div>
    
    <a id="closemenu" onclick="removeMenu()"><img src="img/closeFilterIcon.png"></a>
    `;
    document.querySelector(".filter").innerHTML = template;
    
}
function showFilterPC() {
    let filter = document.querySelector(".filterPC")
    let template = /*html*/ `
    <h2 id="filterFontOverskrift">Filter</h2>
    <p id="filterFont">Her kan du filtrere gennem </br> vores udvalg af øl<p>
    <div class="flexFilter">
        <div class="flexFilterItems">
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Juleøl');" class="notselected"><p>Juleøl</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Sour');" class="notselected"><p>Sour</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Barley Wine');" class="notselected"><p>Barley wine</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'IPA');" class="notselected"><p>IPA</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Stout');" class="notselected"><p>Stout</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Porter');" class="notselected"><p>Porter</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Belgisk Ale');" class="notselected"><p>Belgisk Ale</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Hvedeøl');" class="notselected"><p>Hvedeøl</p></a>
            </div>
            <div class="filterButtons">
            <a href="#searchFilteredContent" onclick="selectedFilter(this, 'Lager');" class="notselected"><p>Lager</p></a>
            </div>
            
        </div>
    </div>
    
    `;
    filter.innerHTML = template;
    document.querySelector("#filteredFilterPC").innerHTML = template;
    document.querySelector(".filterOlPC").innerHTML = template;
    
}
showFilterPC();

/* FILTER ON PC ON OL */



let selectedCategory = "";


//Search
function searchFunctionGenre(selectedCategory) {
    console.log(selectedCategory)
    console.log(_posts)
    let filteredSearch = [];
    for (const post of _posts) {
        if (post.category === selectedCategory) {
            filteredSearch.push(post)
            console.log(filteredSearch)
        }
    }
    appendFilteredPosts(filteredSearch);
}


function appendFilteredPosts(posts) {
    let htmlTemplate = "";
    for (const post of posts) {
        htmlTemplate += `
    <article>
        <h3>${post.name}</h3>
        <h4>${post.category}</h4>
        <img src="${post.image}" class="postImage"><br>
        <button id="${post.id}" onclick="searchFunctionModals(this.id); myButoon()" class="myBtn">Læs mere</button>
    </article>
    `;
    }
    document.querySelector('#filteredContent').innerHTML = htmlTemplate;

}


let filterButtonOne = document.querySelector("#filterDivOne");
filterButtonOne.addEventListener("click", showFilter);

let filterButtonTwo = document.querySelector("#filterDivTwo");
filterButtonTwo.addEventListener("click", showFilter);

function selectedFilter(element, category) {
    let selected = document.querySelector(".selected");
    if (selected) {
        selected.classList.remove("selected");
    } else {
        element.classList.add("selected");
    }
    document.querySelector("#ol").style.display = "none"
    selectedCategory = category;
    searchFunctionGenre(category);
}

// Remove filter
function noToggleMenu() {
    let filter = document.querySelector(".filter");
    filter.style.display = "none";
    document.body.style.overflowY = "auto";
    document.querySelector("#searchFilteredContent").style.display = "block"
}
function removeMenu() {
    let filter = document.querySelector(".filter");
    filter.style.display = "none";
    document.body.style.overflowY = "auto";
    document.querySelector("#ol").style.display = "block"
    window.location = "#ol"
}

// Byg selv
// vælg kasse function
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
function removeBygSelvFunction() {
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
// kasse function ends 

// Append øl til vælg side
function appendPostsBygSelv(posts) {
    let htmlTemplate = "";
    for (let post of posts) {
        htmlTemplate += /*html*/ `
        <article id="${post.id}">
        <h3>${post.name}</h3>
        <img src="${post.image}" class="postImage"><br>
        <button id="${post.id}" onclick="searchFunctionModals(this.id); myButoon()">Læs mere</button><br>
        <form>
            <label for="checked">Vælg:</label>
            <input type="checkbox" name="checked" id="${post.id}" class="checkbox" onclick="addRemoveBeer(this.checked, this.id)">
        </form>
        </article>
    `;
    }
    document.querySelector('#bygSelvContent').innerHTML = htmlTemplate
}

// Vælg øl og skub ind i array
let bygSelvOlArray = [];

function addRemoveBeer(isChecked, beerId) {
    if (isChecked) {
        addBeer(beerId);
    } else {
        removeBeer(beerId);
    }
}
function addBeer(id) {
    for (const post of _posts) {
        if (id === post.id) {
            bygSelvOlArray.push(post);
        }
    }
    console.log(bygSelvOlArray)
    appendFilteredBygSelv(bygSelvOlArray)
    limitArray();
}
function removeBeer (id) {
    for (const post of bygSelvOlArray) {
        if (id === post.id) {
            bygSelvOlArray.push(post);
        }
    }
}
// Skub ind i array ends

/* Til bekræftelse af reservation */
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


// Se valgte øl på bekræftelse side
function appendFilteredBygSelv(posts) {
    let htmlTemplate = "";
    for (const post of posts) {
        htmlTemplate += `
    <article>
        <h3>${post.name}</h3>
        <h4>${post.category}</h4>
        <img src="${post.image}" class="postImage"><br>
    </article>
    `;
    }
    document.querySelector('#contentOl').innerHTML = htmlTemplate;
    kasse()
}
// Se valgte øl ends
// bekræftelse ends
// Push bestilling til firebase
function createEmail2() {
    let mobilInput = document.querySelector("#mobilInput");
    let emailInput = document.querySelector("#mailInput");

    function mailMobilInput() {
        // references to the input field
            if (bygSelvArray.includes("kasse1")) {
                let ol1 = bygSelvOlArray[0].name
                let ol2 = bygSelvOlArray[1].name
                let ol3 = bygSelvOlArray[2].name
                let ol4 = bygSelvOlArray[3].name
                let newEmail = {
                    email: emailInput.value,
                    mobil: mobilInput.value,
                    bestilling: [{ol1}, {ol2}, {ol3}, {ol4}]
                };
                bestilRef.add(newEmail);
            } else if (bygSelvArray.includes("kasse2")) {
                let ol1 = bygSelvOlArray[0].name;
                let ol2 = bygSelvOlArray[1].name;
                let ol3 = bygSelvOlArray[2].name;
                let ol4 = bygSelvOlArray[3].name;
                let ol5 = bygSelvOlArray[4].name;
                let ol6 = bygSelvOlArray[5].name;
                let ol7 = bygSelvOlArray[6].name;
                let ol8 = bygSelvOlArray[7].name;
                let newEmail = {
                    email: emailInput.value,
                    mobil: mobilInput.value,
                    bestilling: [{ol1}, {ol2}, {ol3}, {ol4}, {ol5}, {ol6}, {ol7}, {ol8}]
                };
                bestilRef.add(newEmail);
            } else if (bygSelvArray.includes("kasse3")) {
                let ol1 = bygSelvOlArray[0].name;
                let ol2 = bygSelvOlArray[1].name;
                let ol3 = bygSelvOlArray[2].name;
                let ol4 = bygSelvOlArray[3].name;
                let ol5 = bygSelvOlArray[4].name;
                let ol6 = bygSelvOlArray[5].name;
                let ol7 = bygSelvOlArray[6].name;
                let ol8 = bygSelvOlArray[7].name;
                let ol9 = bygSelvOlArray[8].name;
                let ol10 = bygSelvOlArray[9].name;
                let ol11 = bygSelvOlArray[10].name;
                let ol12 = bygSelvOlArray[11].name;
                let newEmail = {
                    email: emailInput.value,
                    mobil: mobilInput.value,
                    bestilling: [{ol1}, {ol2}, {ol3}, {ol4}, {ol5}, {ol6}, {ol7}, {ol8}, {ol9}, {ol10}, {ol11}, {ol12}]
                };
                bestilRef.add(newEmail);
            } else if (bygSelvArray.includes("kasse4")) {
                let ol1 = bygSelvOlArray[0].name;
                let ol2 = bygSelvOlArray[1].name;
                let ol3 = bygSelvOlArray[2].name;
                let ol4 = bygSelvOlArray[3].name;
                let ol5 = bygSelvOlArray[4].name;
                let ol6 = bygSelvOlArray[5].name;
                let ol7 = bygSelvOlArray[6].name;
                let ol8 = bygSelvOlArray[7].name;
                let ol9 = bygSelvOlArray[8].name;
                let ol10 = bygSelvOlArray[9].name;
                let ol11 = bygSelvOlArray[10].name;
                let ol12 = bygSelvOlArray[11].name;
                let ol13 = bygSelvOlArray[12].name;
                let ol14 = bygSelvOlArray[13].name;
                let ol15 = bygSelvOlArray[14].name;
                let ol16 = bygSelvOlArray[15].name;
                let newEmail = {
                    email: emailInput.value,
                    mobil: mobilInput.value,
                    bestilling: [{ol1}, {ol2}, {ol3}, {ol4}, {ol5}, {ol6}, {ol7}, {ol8}, {ol9}, {ol10}, {ol11}, {ol12}, {ol13}, {ol14}, {ol15}, {ol16}]
                };
                bestilRef.add(newEmail);
            }
            
        }
        mailMobilInput();     
    }  
// push bestilling ends

// Få pris og kasse ind på bekræftelse side
function kasse() {
    if (bygSelvArray.includes("kasse1")) {
        document.querySelector("#contentKasse").innerHTML = "4 øl - 150,-"
        document.querySelector("#contentPris").innerHTML = "150,-"
    } else if (bygSelvArray.includes("kasse2")) {
        document.querySelector("#contentKasse").innerHTML = "8 øl - 300,-"
        document.querySelector("#contentPris").innerHTML = "300,-"
    } else if (bygSelvArray.includes("kasse3")) {
        document.querySelector("#contentKasse").innerHTML = "12 øl - 499,-"
        document.querySelector("#contentPris").innerHTML = "499,-"
    } else if (bygSelvArray.includes("kasse4")) {
        document.querySelector("#contentKasse").innerHTML = "16 øl - 800,-"
        document.querySelector("#contentPris").innerHTML = "800,-"
    } else {
        document.querySelector("#contentKasse").innerHTML = ""
        document.querySelector("#contentPris").innerHTML = ""
    }
}
// pris og kasse ends 

//Modal //

// Get the modal
let modal = document.querySelector(".modal");

// Get the button that opens the modal
let btn = document.querySelectorAll(".myBtn");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

function myButoon() {
    modal.style.display = "block";
}

function myButoonn() {
    modal.style.display = "none";
}



// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


function searchFunctionModals(selectedModals) {
    console.log(selectedModals)
    let filteredModals = [];
    for (const post of _posts) {
        if (post.id === selectedModals) {
            filteredModals.push(post)
            console.log(filteredModals)
        }
    }
    appendFilteredModals(filteredModals);
}
function appendFilteredModals(posts) {
    let htmlTemplate = "";
    for (const post of posts) {
        htmlTemplate += `
    <article>
    <span onclick="myButoonn()" class="close">&times;</span>
        <h2>${post.name}</h2>
        <h4>${post.category}</h4>
        </br>
        <img src="${post.image}" class="postImage"><br>
        <p>Alkoholprocent: ${post.alc}</p>
        <p>${post.cl}</p>
        </br>
        <p>${post.description}</p>
        <h3>${post.pris}</h3>

    </article>
    `;
    }
    document.querySelector('.modal-content').innerHTML = htmlTemplate;

}

//modal ends//