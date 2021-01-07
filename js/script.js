// DOM captures
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
const activitiesCheckboxes = document.querySelectorAll("#activities input");

const paymentFieldset = document.querySelector(".payment-methods");
const paymentTypes = paymentFieldset.children;
const payWithDiv = document.querySelector("#payment");

const creditCardInputs = document.querySelectorAll("#credit-card input");


// Variables
let totalCost = 0;
let registeredActivities = 0;

// 1. Set the name field to true
nameField.focus();                      // Think about adding to line 2



// 2. Job Role - This section hides the job button on page load, then listens for a change in status, then if other input is selected, show the input box

// Hide text field with id of other job role so it isn't displayed on load
jobRoleButton.style.display = "none";
// Program select "job role" to LISTEN for user changes - show hide the text field
jobRoleOptions.addEventListener('change', (event) => {
    if (event.target.value === "other") {
        jobRoleButton.style.display = "block";
    } else {
        jobRoleButton.style.display = "none";
    }
});


// 3. T-shirts - Hide color options on page load. Then listening to an event change show the 3 t-shirt colors that match the data-theme. 

shirtColorsDiv.style.display = "none";

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


// Activities Section - Updating Dollar - Listen for a change in activities fieldset, then add the set amount in data cost to the running total, if selected.

activitiesDiv.addEventListener("change", e => {
    const clicked = e.target;
    const clickedCost = clicked.getAttribute("data-cost");
    if (clicked.checked) {
        totalCost += +clickedCost;
        registeredActivities++;
    }
    if (!clicked.checked) {
        totalCost -= clickedCost;
        registeredActivities--;
    }
    activitiesTotalDisplay.innerHTML = `Total: $${totalCost}`;
});
    

// Payment Section
// 1. Credit card show be loaded on page load - and that selection ("im going to pay with")


// Set up page - Remove bitcoin and paypal, only showing credit card info
for (let i = 0; i < paymentTypes.length; i++) {
    if (paymentTypes[i].id === "bitcoin" || paymentTypes[i].id === "paypal") {
        paymentTypes[i].hidden = true;
    } else {
        paymentTypes[i].hidden = false;
    }
}

// 2. When use selects other item, it updates - removing credit card (if needed), and added others
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

// NOTE - Do we add this whole page to a set up function?

// Form Validation
// Helper Functions

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

    if (emailIsValid) {
        isValid(emailField);
    } else {
        isNotValid(emailField);
    }
    return emailIsValid;
}

const validateEnoughClasses = () => {
    const registerationValidation = registeredActivities > 0;
    return registerationValidation;
}

// Go back and individualize these.
const validateCard = () => {
    const cardNumberValid = /^\d{13,16}$/.test(creditCardInputs[0].value);
    const zipCodeValid = /\d{3}$/.test(creditCardInputs[1].value);
    const cvvValid = /^\d{3}$/.test(creditCardInputs[2].value);
    if (cardNumberValid && zipCodeValid && cvvValid) {
        isValid(creditCardInputs[0]);
        isValid(creditCardInputs[1]);
        isValid(creditCardInputs[2]);
        return true;
    } else {
        isNotValid(creditCardInputs[0]);
        isNotValid(creditCardInputs[1]);
        isNotValid(creditCardInputs[2]);
        return false;
    }
} 

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

// Note for TOM TOMORROW: Create one handler function for all 3!

// Program the form element to listen for submit event 
form.addEventListener("submit", e => {
    e.preventDefault();
    const name = validateName();
    const email = validateEmailAddress();
    const classes = validateEnoughClasses();
    let payment = false;
    
    if (!paymentTypes[2].hidden) {
        payment = validateCard();
    } else {
        payment = true;
    }
    
    if (!name || !email || !classes || !payment) {
        e.preventDefault();
    }
});


// Accessibility

// 1. Make the focud states of the activities more obvious

// a. Program all of the activity CHECKBOX INPUT elements to listen for the FOCUS and BLUR events
form.addEventListener("focus", e => {
    const input = e.target.parentElement;
    input.classList.add("focus");
});

form.addEventListener("blur", e => {
    const input = e.target.parentElement;
    input.classList.remove("focus");
});

// b. When focus event is detected, add .focus class to checkbox input parent element

// c. When blur event is detected, remove the .focus class from the label element that possesses it. target element with class of .focus

// 2. Make form validation errors obvious

// a. when user tries to submit a form, if invalid...

// i. add not valid class to parent of form field or section
// ii. Remove .valid class of parent
// iii. dispplay .hint element associcaited with the form field - last child of parent element

// b. If form valid

// i. Add .valid class to parent
// ii. Remove .not-valid from parent
// iii. Hide .hint element

// Notes for accessibility
//1. Error messages not visibile when form loads
//2. Don't use alerts
//3. If empty form submitted, all fields with indicators should be displayed



// Notes for the end
// Clean up code
// Look at consts and lets
// Be consistent with e and event