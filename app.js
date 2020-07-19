const navbar = document.querySelector("nav");
const navTitle = document.querySelector(".nav-title");
const name = document.querySelector(".name");
const section = document.querySelectorAll(".section");
const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav-options-container");
const navOptions = document.querySelectorAll(".nav-option");
const form = document.forms["submit-to-google-sheet"];
const scriptURL =
    "https://script.google.com/macros/s/AKfycbzW8bOKun8z2dsFfgJzW-FqWrLKh-S_fwA0Xsn0c6Le6uG_PZ-q/exec";

const controller = new ScrollMagic.Controller();
const landingOptions = {
    rootMargin: "-150px 0px 0px 0px",
};

window.onload = function () {
    const tl = new TimelineLite();

    tl.to(".site-load", 0, { display: "none" }).to("body", 0, {
        overflow: "scroll",
    });
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

const navTitleClick = () => {
    navTitle.addEventListener("click", () => {
        if (nav.classList.contains("nav-active")) {
            burger.click();
        }
    });
};

const navExplore = () => {
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

const openProject = (projectName, projectBtnName) => {
    var i;
    var x = document.getElementsByClassName("project");
    var y = document.getElementsByClassName("project-btn");

    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
        y[i].classList.remove("active");
    }
    document.getElementById(projectName).style.display = "block";
    document.getElementById(projectBtnName).classList.add("active");
};

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

const animateSections = () => {
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
};

const app = () => {
    navExplore();
    navSlide();
    landingObserver.observe(name);
    animateSections();
    navTitleClick();
};

app();
