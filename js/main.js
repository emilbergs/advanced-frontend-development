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