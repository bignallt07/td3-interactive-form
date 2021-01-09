/************************
 * DOM Captures 
 * Note: These are in order of the HTML document flow
 ***********************/
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

const creditCardInputs = document.querySelectorAll("#credit-card input");

/************************
 * Global Variables
 ***********************/
let totalCost = 0;
let registeredActivities = 0;


/************************
 * Page Set Up
 ************************/
nameField.focus();  
jobRoleButton.style.display = "none";
shirtColorsDiv.style.display = "none";
payWithDiv.value = payWithDiv[1].value;         


// Remove non-credit card options on page load
for (let i = 0; i < paymentTypes.length; i++) {
    if (paymentTypes[i].id === "bitcoin" || paymentTypes[i].id === "paypal") {
        paymentTypes[i].hidden = true;
    } else {
        paymentTypes[i].hidden = false;
    }
}

// Add focus class to checkboxes
// Using the useCapture (true) parameter as "focus" and "blur" cannot bubble and we need to use directly on the checkbox
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    const checkbox = activitiesCheckboxes[i].parentElement;
    checkbox.addEventListener("focus", () => {
        checkbox.classList.add("focus");
    }, true);
    checkbox.addEventListener("blur", () => {
        checkbox.classList.remove("focus");
    }, true);
}

/************************
 * Functions (For Validation) 
 * Developer Note: Consider refactoring the following 6 (excluding validateEmailAddress) into one function.
***********************/

/**
 * validateName Function, validateEnoughClasses, validateCardNumber, ValidateZipCode and ValidateCVV Functions
 * Description: 1. Test a value against a regular expression for True or False value
 *              2. Send input or checkbox field to function, depending on truthy value
 * 
 * @return {boolean} True or False
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
    return cardNumberValid;
}

const validateZipCode = () => {
    const zip = creditCardInputs[1];
    const zipCodeValid = /^[0-9][0-9][0-9][0-9][0-9]$/.test(zip.value);
    if (zipCodeValid) {
        isValid(zip);
    } else {
        isNotValid(zip);
    }
    return zipCodeValid;
}

const validateCVV = () => {
    const cvv = creditCardInputs[2];
    const cvvCodeValid = /^[0-9][0-9][0-9]$/.test(cvv.value);
    if (cvvCodeValid) {
        isValid(cvv);
    } else {
        isNotValid(cvv);
    }
    return cvvCodeValid;
}

/**
 * validateEmail function
 * Description: 1. Tests value, and sends field to a function
 *              2. Displays error message depending upon length of field input
 * 
 * @return {boolean} True or False
 */

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

/**
 * isValid and isNotValid functions
 * Description: Adds and removes class and changes display of elements
 * 
 * @param {string} - DOM element
 * @return - Changes state of DOM element
 */
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


/************************
* Event Listeners
* **********************/

// Add/Remove Job "Other" field
jobRoleOptions.addEventListener('change', (event) => {
    if (event.target.value === "other") {
        jobRoleButton.style.display = "block";
    } else {
        jobRoleButton.style.display = "none";
    }
});
 
// Change display color display options from design choice field
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
    shirtColorsOptions[0].parentElement.value = shirtColorsOptions[0].value;
    
});

// Changes to activies field. Adds and subtracts total cost, and checks for conflicts of time
activitiesDiv.addEventListener("change", e => {
    const clicked = e.target;
    const clickedTime = clicked.getAttribute("data-day-and-time");
    const clickedCost = clicked.getAttribute("data-cost");

    // If checked, see if there are conflict of time
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
    
// Updates payment method depending on field choice
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

// Real-time error message event listeners
nameField.addEventListener("keyup", validateName);
emailField.addEventListener("keyup", validateEmailAddress);
creditCardInputs[0].addEventListener("keyup", validateCardNumber);
creditCardInputs[1].addEventListener("keyup", validateZipCode);
creditCardInputs[2].addEventListener("keyup", validateCVV);

/**
 * Submit Event Listener
 * Description: On submit of form:
 *              1. Run tests which return a truthy value
 *              2. Check payment option status - run code for each outcome
 *              3. Submit for if all values are TRUE
 */
form.addEventListener("submit", e => {
    const name = validateName();
    const email = validateEmailAddress();
    const classes = validateEnoughClasses();
    const cardNumber = validateCardNumber();
    const zip = validateZipCode();
    const cvv = validateCVV();
    let payment = false;

    // Check to see if credit card is selected
    if (payWithDiv.value === paymentTypes[2].id) {
        if (cardNumber && zip && cvv) {
            payment = true;
        } else {
            payment = false;
        }       
    } else {
        payment = true;
    }
    
    if (!name || !email || !classes || !payment) {
        e.preventDefault();
    }
});