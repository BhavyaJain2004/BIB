# Bank Management System
Overview
The Bank Management System is a robust, full-stack web application designed to simulate core banking functionalities. Built with **Node.js**, **Express.js**, and **MongoDB**, it provides users with a secure and intuitive platform for managing personal bank accounts, executing real-time transactions, and accessing comprehensive financial history. Emphasizing security and efficiency, the system incorporates **bcrypt** for password encryption and leverages **Redis** for enhanced performance. The application is currently hosted on Render.

## Features

### 1. Secure User Authentication & Account Management
* **Seamless Registration:** Allows new users to create accounts with unique 5-digit account numbers upon signup.
* **Secure Login:** Facilitates secure access for existing users using encrypted credentials.
* **Robust Security:** Implements **bcrypt** for one-way password hashing, ensuring sensitive data protection.

![Login Page](https://github.com/user-attachments/assets/856eabcb-c9e9-41ff-a0f6-02f659e468ef)
![Sign-up Page](https://github.com/user-attachments/assets/9a5b552b-13fa-4970-8e3f-cd0e70b1e5c3)

### 2. Intuitive Home Dashboard
* Provides immediate access to essential banking operations: Fund Transfers, Balance Inquiry, Fund Addition, Profile Management, and Transaction History.

![Home Page](https://github.com/user-attachments/assets/8d30c945-11a4-4927-b0b6-6dc967b0a43e)

### 3. Real-time Fund Transfers
* **Instant Transactions:** Enables immediate transfer of funds between user accounts within the system.
* **Robust Validation:** Ensures sender has sufficient balance before executing any transfer, preventing overdrafts.
* **Recipient Notification:** Informs recipients instantly upon successful fund transfers.
* **Comprehensive Logging:** Automatically records both debit and credit entries in transaction histories for sender and recipient.

![Transfer Funds Interface](https://github.com/user-attachments/assets/ad544c68-e70c-47c4-8e35-58c1e1c5a8d8)
*Successful Transfer Notification:*

![image](https://github.com/user-attachments/assets/317bdda4-5284-4baf-9cd8-209ec37442b0)



A Pop Comes if Balance is not sufficient : 

![image](https://github.com/user-attachments/assets/c96fa333-1908-46a2-8fda-de389358ebc5)



![Successful Transfer Pop-up](https://github.com/user-attachments/assets/317bdda4-5284-4baf-9cd8-209ec37422b0)
*Insufficient Balance Alert:*
![Insufficient Balance Pop-up](https://github.com/user-attachments/assets/c96fa433-1908-46a2-8fda-de389358ebc5)

### 4. Real-time Balance Inquiry
* **Instant Updates:** Users can view their current account balance, updated in real-time after every transaction.
* **Enhanced Security:** Requires password re-entry for sensitive balance inquiries, adding an extra layer of security.
* **Transparent Details:** Displays current balance, account number, and last updated timestamp for full transparency.

![Balance Check Interface](https://github.com/user-attachments/assets/33f88e96-f892-4ab4-89b8-651121332630)
![Detailed Balance View](https://github.com/user-attachments/assets/a6fa13ac-fe5e-48f6-99e4-8635fda52ae6)

### 5. Instant Fund Addition
* Facilitates immediate crediting of funds to the bank account directly from the home page.
* **Automated Logging:** Each fund addition is meticulously recorded in the transaction history with details of the credited amount.

![Add Funds Interface](https://github.com/user-attachments/assets/69a05f8f-28de-4a08-a243-770df84fd890)
![Fund Added Confirmation](https://github.com/user-attachments/assets/2300a432-ee8f-41ba-90e0-f4afd91b3406)

### 6. User Profile Management
* Allows users to view their comprehensive account details, including personal information and account number, through a clear, intuitive interface.

![User Profile Details](https://github.com/user-attachments/assets/1e1772c1-0453-4838-a846-63e6ddb94b32)

### 7. Comprehensive Transaction History
* **Detailed Records:** Provides a complete chronological list of all debit, credit, and transfer transactions.
* **Enhanced Clarity:** Each entry includes essential details such as date, time, amount, transaction type, and a brief description (e.g., "Funds transferred to account #00002") for easy tracking.

![Transaction History View 1](https://github.com/user-attachments/assets/aa6cae33-0347-4ca7-8099-a676b8f115f3)
![Transaction History View 2](https://github.com/user-attachments/assets/75742128-05bb-4940-b02c-a256b93266f5)

## Technologies Used
* **Backend Runtime:** Node.js
* **Web Framework:** Express.js
* **Database:** MongoDB (NoSQL)
* **Security:** bcrypt (Password Hashing)
* **Performance/Caching:** Redis
* **Deployment:** Render

## Getting Started

Follow these instructions to set up and run the Bank Management System locally on your machine.

### Prerequisites

Make sure you have the following installed:
* [Node.js](https://nodejs.org/en/download/) (LTS version recommended)
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (comes with Node.js) or [Yarn](https://yarnpkg.com/getting-started/install)
* [MongoDB](https://www.mongodb.com/try/download/community) (Community Server) or access to a MongoDB Atlas instance.
* [Redis](https://redis.io/download/) (for local development)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git) # Replace with your actual repo URL
    cd bank-management-system
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory of the project and add the following environment variables. Replace the placeholder values with your actual credentials and configurations.

    ```dotenv
    PORT=5000
    MONGO_URI=your_mongodb_connection_string # e.g., mongodb://localhost:27017/bankdb or your Atlas URI
    JWT_SECRET=your_jwt_secret_key # A strong, random string
    REDIS_URI=your_redis_connection_string # e.g., redis://127.0.0.1:6379
    # Add any other environment variables your project uses (e.g., for email services, etc.)
    ```
    * **MONGO_URI:** If using MongoDB Atlas, get your connection string from the Atlas dashboard.
    * **JWT_SECRET:** Generate a long, random string.
    * **REDIS_URI:** If running Redis locally, `redis://127.0.0.1:6379` is typical.

### Running the Application

1.  **Start MongoDB server:**
    Ensure your local MongoDB instance is running, or that your `MONGO_URI` points to an active Atlas cluster.

2.  **Start Redis server:**
    Ensure your local Redis instance is running, or that your `REDIS_URI` points to an active Redis instance.

3.  **Run the backend server:**
    ```bash
    npm start
    # OR
    yarn start
    ```
    The server will start on the port specified in your `.env` file (default: `http://localhost:5000`).

## Usage

Once the application is running:
1.  Open your web browser and navigate to `http://localhost:5000` (or your configured port).
2.  **Sign Up** as a new user to create your bank account.
3.  **Log In** using your newly created credentials.
4.  Explore the dashboard to **transfer funds**, **add funds**, **view balance**, and check your **transaction history**.
5.  Use the **View Profile** option to see your account details.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
