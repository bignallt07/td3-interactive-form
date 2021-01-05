// DOM captures
const nameField = document.querySelector("#name");
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


// Variables
let totalCost = 0;

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
    }
    if (!clicked.checked) {
        totalCost -= clickedCost;
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




// Notes for the end
// Clean up code
// Look at consts and lets
// Be consistent with e and event