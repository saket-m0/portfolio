const navbar = document.querySelector("nav");
const name = document.querySelector(".name");

const controller = new ScrollMagic.Controller();

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

const section = document.querySelectorAll(".section");

function animateSections() {
    section.forEach((section) => {
        const sceneTl = new TimelineLite();
        sceneTl.fromTo(
            `#${section.id}`,
            1,
            { opacity: 0, y: "20" },
            {
                opacity: "1",
                y: 0,
                ease: Power2.easeOut,
            }
        );

        const scene = new ScrollMagic.Scene({
            triggerElement: `#${section.id}`,
            triggerHook: "0.8",
        })
            .setTween(sceneTl)
            .addTo(controller);
    });
}

function app() {
    navExplore();
    navSlide();
    landingObserver.observe(name);
    animateSections();
}

app();
