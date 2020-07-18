const navbar = document.querySelector("nav");
const landing = document.querySelector(".landing");

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

landingObserver.observe(landing);

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

const scriptURL =
    "https://script.google.com/macros/s/AKfycbzW8bOKun8z2dsFfgJzW-FqWrLKh-S_fwA0Xsn0c6Le6uG_PZ-q/exec";
const form = document.forms["submit-to-google-sheet"];

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
