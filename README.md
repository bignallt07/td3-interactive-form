# td3-interactive-form

This is an interactive registration form for a fictional company. This form has the ability to valid areas such as payment fields, email addresses and has class registration. It uses conditional behavior to update error messages and allows for live error reporting.

# Motivation 

This project was designed in line with project 3 of the Treehouse TechDegree and as a part of my developer portfolio

# Build Status

This piece is completed, meeting the exceeds standards of the Treehouse techdegree.

# Code Style

JavaScript

# Features 

Interactive web form will ask for specific areas to be filled in before submission, offering the user a choice of 3 payment methods before submission.

This form also is targeted at achieving the "exceeds" status from Treehouse Techdegree, therefore it:
1. Prevents users from registering for conflicting activities. In the activities section, you should not be able to register for activities that are at the same time
2. Real time error messages. When you type in the name, email, and credit card number fields, keyup event listener is used to listen to real time issues
3. Conditional error message on the email address field. If less than 2 characters, it will ask the user to "enter an email" rather than "format an email correctly"

# Contribution

If you have any suggestions to improve this form, please reach out to me on github

Short term plans to refactor the individual validation functions into 1 validation function to improve the speed of the form

# Credits 

Curriculum at teamtreehouse.com
Definition of the useCapture in the code from https://gomakethings.com/