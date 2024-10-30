# Bank Management System using Node Js , Express JS and MongoDB

Bank Management System
**Overview**
The Bank Management System is a web application built using Node.js, Express, MongoDB, Redis, and hosted on Render. It provides users with a platform to manage their bank accounts, perform transactions, and view their transaction history in real time. The system features secure login and signup functionality, with passwords encrypted using bcrypt for enhanced security.


**Features**

**User Registration and Login:**
New users can sign up by providing their details and setting a password.
Upon registration, each user is assigned a unique 5-digit account number.
Existing users can log in using their credentials to access the home page.
**
Home Page:**
After login, users are redirected to the home page, which provides the following options:

Transfer Funds: Real-time transfer of funds to another user's account.
View Balance: Check the current account balance.
Add Funds: Add funds to the account.
View Profile: View account details and profile information.
Transaction History: View all transactions, including both debit and credit entries.

**Transaction Management:**
Users can add funds to their accounts, which will be recorded in the transaction history.
Real-time fund transfers are supported, and the recipient's transaction history will display the credited amount.

**Technologies Used**
Node.js: Backend runtime environment.
Express: Web framework for Node.js.
MongoDB: NoSQL database for storing user and transaction data.
bcrypt: Password hashing library to ensure secure storage of user passwords.

![Uploading image.png


