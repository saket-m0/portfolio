const navbar = document.querySelector("nav");
const name = document.querySelector(".name");

const scriptURL =
    "https://script.google.com/macros/s/AKfycbzW8bOKun8z2dsFfgJzW-FqWrLKh-S_fwA0Xsn0c6Le6uG_PZ-q/exec";
const form = document.forms["submit-to-google-sheet"];

const landingOptions = {
    rootMargin: "-150px 0px 0px 0px",
};

const landingObserver = new IntersectionObserver((entries, landingObserver) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            navbar.classList.add("nav-scrolled");
        } else {
            navbar.classList.remove("nav-scrolled");
        }
    });
}, landingOptions);

landingObserver.observe(name);

const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-options-container");
    const navOptions = document.querySelectorAll(".nav-option");
    //Toggle Nav
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");

        //Animate Links
        navOptions.forEach((option, index) => {
            if (option.style.animation) {
                option.style.animation = "";
            } else {
                option.style.animation = `navOptionFade 0.5s ease forwards ${
                    index / 7 + 0.5
                }s`;
            }
        });

        //Burger Animation
        burger.classList.toggle("toggle");
    });
};

navSlide();

const navExplore = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-options-container");
    const navOptions = document.querySelectorAll(".nav-option");

    navOptions.forEach((option) => {
        option.addEventListener("click", () => {
            nav.classList.toggle("nav-active");
            navOptions.forEach((option) => {
                option.style.animation = "";
            });
            burger.classList.toggle("toggle");
        });
    });
};

navExplore();

function openProject(projectName, projectBtnName) {
    var i;
    var x = document.getElementsByClassName("project");
    var y = document.getElementsByClassName("project-btn");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        y[i].classList.remove("active");
    }
    document.getElementById(projectName).style.display = "block";
    document.getElementById(projectBtnName).classList.add("active");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, {
        method: "POST",
        body: new FormData(form),
    })
        .then((response) =>
            document.getElementById("submit-btn").classList.add("success")
        )
        .catch((error) =>
            document.getElementById("submit-btn").classList.add("failure")
        );
});
