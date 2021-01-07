# td3-interactive-form
 Interactive Form registration form


// Validate Pass and Fail

function isValid(element) {
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add("not-valid");
    parentOfElement.classList.remove("valid");
    parentOfElement.lastElementChild.style.display = "block";
}

function isNotValid(element) {
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add("valid");
    parentOfElement.classList.remove("not-valid");
    parentOfElement.lastElementChild.style.display = "none";
}


form.addEventListener("focus", e => {
    const input = e.target.parentElement;
    input.classList.add("focus");
}, true);

form.addEventListener("blur", e => {
    const input = e.target.parentElement;
    input.classList.remove("focus");
}, true);