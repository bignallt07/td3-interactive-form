/**
 * DOM Captures 
 * Note: These are in order of the HTML document flow
 */
const form = document.querySelector("form");

const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const jobRoleButton = document.querySelector("#other-job-role");
const jobRoleOptions = document.querySelector("#title");

const designButton = document.querySelector("#design");

const shirtColorsDiv = document.querySelector("#shirt-colors");
const shirtColorsOptions = document.querySelectorAll("#shirt-colors option");

const activitiesTotalDisplay = document.querySelector("#activities-cost");
const activitiesDiv = document.querySelector("#activities");
const activitiesBox = document.querySelector("#activities-box");
const activitiesCheckboxes = document.querySelectorAll("#activities input");

const paymentFieldset = document.querySelector(".payment-methods");
const paymentTypes = paymentFieldset.children;
const payWithDiv = document.querySelector("#payment");
const payOptions = payWithDiv.children;   // To set the load screen as payment option

const creditCardInputs = document.querySelectorAll("#credit-card input");


/**
 * Global Variables
 */
let totalCost = 0;
let registeredActivities = 0;


/**
 * On load page commands
 */
nameField.focus();  
jobRoleButton.style.display = "none";
shirtColorsDiv.style.display = "none";
payWithDiv.value = "credit-card";               // Review this

// TO DO: Credit card show be loaded on page load - and that selection ("im going to pay with")

// Remove none-credit card fields
for (let i = 0; i < paymentTypes.length; i++) {
    if (paymentTypes[i].id === "bitcoin" || paymentTypes[i].id === "paypal") {
        paymentTypes[i].hidden = true;
    } else {
        paymentTypes[i].hidden = false;
    }
}

// Make the focus states more obvious - Add comment about TRUE
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    const checkbox = activitiesCheckboxes[i].parentElement;
    checkbox.addEventListener("focus", e => {
        checkbox.classList.add("focus");
    }, true);
    checkbox.addEventListener("blur", e => {
        checkbox.classList.remove("focus");
    }, true);
}


/**
 * Functions (For Validation) - Add function comments
 */

const validateName = () => {
    const name = nameField.value;
    const nameIsValid = /^[a-zA-Z]+ ?[a-zA-Z]*? ?[a-zA-Z]*? ?[a-zA-Z]*?$/.test(name);          // Tests between 1 and 4 names

    if (nameIsValid) {
        isValid(nameField);
    } else {
        isNotValid(nameField);
    }

    return nameIsValid;
}

const validateEmailAddress = () => {
    const email = emailField.value;
    const emailIsValid = /^[^@]+@[^@.]+\.com$/i.test(email);                // Not accounting for other domains add [a-z]+ after
    if (email.length > 2) {
        if (emailIsValid) {
            isValid(emailField);
        } else {
            isNotValid(emailField);
        }
        emailField.nextElementSibling.textContent = "Email address must be formatted correctly";
    } else if (email.length <= 2) {
        if (emailIsValid) {
            isValid(emailField);
        } else {
            isNotValid(emailField);
        }
        emailField.nextElementSibling.textContent = "Please enter an email address"; 
    }

    return emailIsValid;
}

const validateEnoughClasses = () => {
    const registerationValidation = registeredActivities > 0;
    if (registerationValidation) {
        isValid(activitiesBox);
    } else {
        isNotValid(activitiesBox);
    }
    return registerationValidation;
}

const validateCardNumber = () => {
    const card = creditCardInputs[0];
    const cardNumberValid = /^\d{13,16}$/.test(card.value);
    if (cardNumberValid) {
        isValid(card);
    } else {
        isNotValid(card);
    }
    return card;
}

const validateZipCode = () => {
    const zip = creditCardInputs[1];
    const zipCodeValid = /^[0-9][0-9][0-9][0-9][0-9]$/.test(zip.value);
    if (zipCodeValid) {
        isValid(zip);
    } else {
        isNotValid(zip);
    }
    return zip;
}

const validateCVV = () => {
    const cvv = creditCardInputs[2];
    const cvvCodeValid = /^[0-9][0-9][0-9]$/.test(cvv.value);
    if (cvvCodeValid) {
        isValid(cvv);
    } else {
        isNotValid(cvv);
    }
    return cvv;
}

// Go back and individualize these. 
function isValid(element) {
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add("valid");
    parentOfElement.classList.remove("not-valid");
    parentOfElement.lastElementChild.style.display = "none";
}

function isNotValid(element) {
    let parentOfElement = element.parentElement;
    parentOfElement.classList.add("not-valid");
    parentOfElement.classList.remove("valid");
    parentOfElement.lastElementChild.style.display = "block";
}


 /**
  * Event Listeners
  */


// To display text field if "Other" job role is selected
jobRoleOptions.addEventListener('change', (event) => {
    if (event.target.value === "other") {
        jobRoleButton.style.display = "block";
    } else {
        jobRoleButton.style.display = "none";
    }
});
 
// Listen to the design button being clicked, display correct options
designButton.addEventListener("change", (event) => {
    const designOption = event.target.value;
    for (let i = 0; i < shirtColorsOptions.length; i++) {
        const colorOption = shirtColorsOptions[i].getAttribute("data-theme");
        if (colorOption !== designOption) {
            shirtColorsOptions[i].hidden = true;
        } else {
            shirtColorsOptions[i].hidden = false;
        }
    }
    shirtColorsDiv.style.display = "block"; 
});


// Listens to activities to add and subtract cost of course
activitiesDiv.addEventListener("change", e => {
    const clicked = e.target;
    const clickedTime = clicked.getAttribute("data-day-and-time");
    const clickedCost = clicked.getAttribute("data-cost");

    // Checks if checked and adds money, but also checks to see for conflicts
    if (clicked.checked) {
        totalCost += +clickedCost;
        registeredActivities++;
        for (let i = 0; i < activitiesCheckboxes.length; i++) {
            const conflict = activitiesCheckboxes[i].getAttribute("data-day-and-time");
            if (clickedTime === conflict) {
                activitiesCheckboxes[i].parentElement.classList.add("disabled");
                activitiesCheckboxes[i].disabled = true;
            }
        }
        clicked.parentElement.classList.remove("disabled"); // This ensures the clicked item isn't disabled
        clicked.disabled = false;
    }

    if (!clicked.checked) {
        totalCost -= clickedCost;
        registeredActivities--;
        for (let i = 0; i < activitiesCheckboxes.length; i++) {
            const conflict = activitiesCheckboxes[i].getAttribute("data-day-and-time");
            if (clickedTime === conflict) {
                activitiesCheckboxes[i].parentElement.classList.remove("disabled");
                activitiesCheckboxes[i].disabled = false;
            } 
        }
    }

    activitiesTotalDisplay.innerHTML = `Total: $${totalCost}`;
     
});
    

// Listen to change of payment type, then add remove payment sections
payWithDiv.addEventListener("change", e => {
    const typeOfPayment = e.target.value;
    for (let i = 0; i < paymentTypes.length; i++) {
        if (paymentTypes[i].tagName === "LEGEND" || paymentTypes[i].className === "payment-method-box") {
            paymentTypes[i].hidden = false;
        }
        else if (paymentTypes[i].id !== typeOfPayment) {
            paymentTypes[i].hidden = true;
        } else {
            paymentTypes[i].hidden = false;
        }
    } 
});

// Real-time error messages - all but activities
nameField.addEventListener("keyup", validateName);
emailField.addEventListener("keyup", validateEmailAddress);
creditCardInputs[0].addEventListener("keyup", validateCardNumber);
creditCardInputs[1].addEventListener("keyup", validateZipCode);
creditCardInputs[2].addEventListener("keyup", validateCVV);



// Functions to call and procedure to follow when the form is submitted
form.addEventListener("submit", e => {
    const name = validateName();
    const email = validateEmailAddress();
    const classes = validateEnoughClasses();
    const cardNumber = validateCardNumber();
    const zip = validateZipCode();
    const cvv = validateCVV();
    let payment = false;
    
    if (!paymentTypes[2].hidden) {
        if (cardNumber && zip && cvv) {
            payment = true;
        } else {
            payment = false;
        }
    } else {
        payment = false;
    }
    
    if (!name || !email || !classes || !payment) {
        e.preventDefault();
    }
});

// Notes for the end
// Clean up code
// Look at consts and lets
// Be consistent with e and event