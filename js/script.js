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
    return nameIsValid;
}

const validateEmailAddress = () => {
    const email = emailField.value;
    const emailIsValid = /^[^@]+@[^@.]+\.com$/i.test(email);                // Not accounting for other domains add [a-z]+ after
    return emailIsValid;
}

const validateEnoughClasses = () => {
    const registerationValidation = registeredActivities > 0;
    return registerationValidation;
}

const validateCard = () => {
    const cardNumberValid = /^\d{13,16}$/.test(creditCardInputs[0].value);
    const zipCodeValid = /\d{3}$/.test(creditCardInputs[1].value);
    const cvvValid = /^\d{3}$/.test(creditCardInputs[2].value);
    if (cardNumberValid && zipCodeValid && cvvValid) {
        console.log("Card is valid");
        return true;
    } else {
        console.log("card is not valid");
        return false;
    }
    
} 

// Note for TOM TOMORROW: Create one handler function for all 3!

// Program the form element to listen for submit event 
form.addEventListener("submit", e => {
    e.preventDefault(); // MOVE AS NEEDED
    
    // Then form field should be validated, don't submit if unvalidated
    
    // name field - cannot be blank or empty
    validateName();
    // email must be an email, characters, followed by an @ then .com etc
    validateEmailAddress();
    // Register for activities must have at least one activity
    validateEnoughClasses();
    // IF - AND ONLY IF credit card is displayed
    
    if (!paymentTypes[2].hidden) {
        validateCard();
    } 
    // Card number must have between 13-16 numbers with no dashes or spaces
    // Zip code must contain 5 digits
    // CVV must be 3 digits

// Notes: call prevent default on event IF one or more fields is invalid
// Use helper functions - name function - return false

    
});




// Notes for the end
// Clean up code
// Look at consts and lets
// Be consistent with e and event