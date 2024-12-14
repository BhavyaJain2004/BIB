# Bank Management System using Node Js , Express JS and MongoDB

Bank Management System
**Overview**
The Bank Management System is a web application built using Node.js, Express, MongoDB, Redis, and hosted on Render. It provides users with a platform to manage their bank accounts, perform transactions, and view their transaction history in real time. The system features secure login and signup functionality, with passwords encrypted using bcrypt for enhanced security.


**Features**

**User Registration and Login:**
New users can sign up by providing their details and setting a password.
Upon registration, each user is assigned a unique 5-digit account number.
Existing users can log in using their credentials to access the home page.

Log-in Page : ![image](https://github.com/user-attachments/assets/856eabcb-c9e9-41ff-a0f6-02f659e468ef)

Sign-up Page : ![image](https://github.com/user-attachments/assets/9a5b552b-13fa-4970-8e3f-cd0e70b1e5c3)



**Home Page:**
After login, users are redirected to the home page, which provides the following options:

Transfer Funds: Real-time transfer of funds to another user's account.
View Balance: Check the current account balance.
Add Funds: Add funds to the account.
View Profile: View account details and profile information.
Transaction History: View all transactions, including both debit and credit entries.

![image](https://github.com/user-attachments/assets/8d30c945-11a4-4927-b0b6-6dc967b0a43e)

**Transfer Funds:**

Real-time fund transfer: Users can instantly transfer funds to another user's account within the system.
Validation: The system ensures the sender has sufficient balance before initiating the transfer.
Recipient's Notification: Once the funds are transferred successfully, the recipient will be notified.
Transaction Record: Both sender and recipient can view the transaction in their respective transaction histories, showing the debit (for the sender) and credit (for the recipient).


![image](https://github.com/user-attachments/assets/ad544c68-e70c-47c4-8e35-58c1e1c5a8d8)


A Pop comes after a successful transfer : 
![image](https://github.com/user-attachments/assets/317bdda4-5284-4baf-9cd8-209ec37442b0)

A Pop Comes if Balance is not sufficient : 
![image](https://github.com/user-attachments/assets/c96fa333-1908-46a2-8fda-de389358ebc5)



**View Balance:**

Current Balance: Users can view their updated account balance in real-time by entering their password
Easy Accessibility: The balance is displayed on the dashboard or can be accessed through the "View Balance" option in the menu.
Detailed Summary: Along with the balance, users can also see additional details like account number and the last updated timestamp for transparency.


![image](https://github.com/user-attachments/assets/33f88e96-f892-4ab4-89b8-651121332630)

![image](https://github.com/user-attachments/assets/a6fa13ac-fe5e-48f6-99e4-8635fda52ae6)




**Add Funds:**

Funds can be added to the bank account via Add Funds button on the home page & the account balance is updated immediately.
Transaction History: Every fund addition is logged in the transaction history, showing the credited amount and the source.


![image](https://github.com/user-attachments/assets/69a05f8f-28de-4a08-a243-770df84fd890)

![image](https://github.com/user-attachments/assets/2300a432-ee8f-41ba-90e0-f4afd91b3406)




**View Profile:**

Profile Details: Users can view their account information, including their name, father name , age & account number.
User-Friendly Interface: The profile section is designed to give a clear and comprehensive view of the user's data.


![image](https://github.com/user-attachments/assets/1e1772c1-0453-4838-a846-63e6ddb94b32)



**Transaction History:**

Complete History: Users can view a detailed list of all transactions, including debit, credit, and fund transfers.
Detailed Entries: Each transaction entry includes the date, time, amount, type, and a brief description (e.g., "Funds transferred to account #00002").



![image](https://github.com/user-attachments/assets/aa6cae33-0347-4ca7-8099-a676b8f115f3)


![image](https://github.com/user-attachments/assets/75742128-05bb-4940-b02c-a256b93266f5)






**Technologies Used**
Node.js: Backend runtime environment.
Express: Web framework for Node.js.
MongoDB: NoSQL database for storing user and transaction data.
bcrypt: Password hashing library to ensure secure storage of user passwords.





