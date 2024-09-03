const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { user, Counter, DebitTransaction,CreditTransaction } = require('./config');
const session = require('express-session');
const path = require('path');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

const RedisStore = require('connect-redis').default;
const redis = require('redis');
const redisClient = redis.createClient();


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine' , 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.set('views', path.join(__dirname, '../views'));

const currentDate = new Date();
const formattedDateTime = currentDate.toLocaleString('en-GB', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false
}).replace(',', '');

app.use(session({
   store: new RedisStore({ client: redisClient }),
    secret:  process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

function isAuthenticated(req,res,next){
    if(req.session.user){
        return next();
    }
    else {
      res.redirect('/');
    }

}

app.get('/', (req, res) => {
    if(req.session.user) {
      req.session.destroy((err) => {
        if(err){
          console.error('Failed to destroy session:', err);
          res.send('Error logging out, please try again.');
        }else {
          res.redirect('/'); 
        }
      });
    } else {
      res.render('login'); 
    }
});


app.get('/signup',(req,res)=>{
    res.render('signup');
})

app.get('/home', isAuthenticated, (req, res) => {
    res.render('home', { Name: req.session.user.Name });
});


async function getNextAccountNumber() {
    const counter = await Counter.findOneAndUpdate(
        {},
        { $inc: { count: 1 } }, 
        { new: true, upsert: true } 
    );
    return counter.count; 
}

app.post('/signup',async(req,res)=>{

    const accnumber = await getNextAccountNumber();
    const formattedAccountNumber = String(accnumber).padStart(5,'0');
   

    const newUser = new user({
        Name : req.body.Name,
        FatherName : req.body.FatherName,
        Email : req.body.Email,
        Age : req.body.Age,
        Password : req.body.Password,
        Balance : 0,
        AccountNumber : formattedAccountNumber,
        Date : formattedDateTime

    });

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(newUser.Password,saltRounds);
    newUser.Password = hashPassword;

    await newUser.save()
  
    res.send(`
        <script>
          alert('Account Opened Successfully with Account Number is: ${formattedAccountNumber}');
          window.location.href = '/';
        </script>
      `);


})

app.post('/login',async (req,res)=>{

    try {
        const check = await user.findOne({AccountNumber:req.body.AccountNumber});
        // const checkTransaction = await userTransaction.findOne({AccountNumber:req.body.AccountNumber});
        const Password = req.body.Password;
     
        

        if(!check){
            res.send(`
                <script>
                  alert('Account Number Not Found , Please Check the Account Number Entered');
                  window.location.href = '/';
                </script>
              `);
              return;
        
        }
        
        const isPasswordMatch = await bcrypt.compare(Password, check.Password);

        if(isPasswordMatch){
            req.session.user = { Name: check.Name, AccountNumber: check.AccountNumber , Password:check.Password , Age:check.Age , Balance:check.Balance , FatherName : check.FatherName, Email:check.Email}; 
            
            res.render('home',{Name:check.Name});
            
        }
        else{
            res.send("Wrong Password");
        }

    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        res.status(500).send("Error during login process. Please try again.");
        
    }



});


app.post('/addFunds',async (req,res)=>{

    try {

        const userAccountNumber = req.session.user.AccountNumber;
        const checkAccountNumber = await user.findOne({AccountNumber:userAccountNumber});

        if(!checkAccountNumber){
            res.send(`
                <script>
                  alert('Account Number Not Found , Please Check the Account Number Entered');
                  window.location.href = '/';
                </script>
              `);
              return;

        }

        const amount = (parseFloat)(req.body.amount);
        checkAccountNumber.Balance += amount;
        checkAccountNumber.save();

        req.session.user.Balance = checkAccountNumber.Balance;

        const currentDate = new Date();
        const formattedDateTime = currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', '');

        const creditTransaction = new CreditTransaction({
          Date : formattedDateTime,
          Description : "Add Funds",
          SenderAccountNumber : userAccountNumber,
          ReceiverAccountNumber : userAccountNumber,
          Amount : amount,
          Balance : req.session.user.Balance,
          TransactionID : "TXN" + Date.now(),
          TransactionType : "Credit"
        })
        await creditTransaction.save();

        res.send(`
            <script>
              alert('Amount Added Successfully to Your Account');
              window.location.href = '/home';
            </script>
          `);
      
        
    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        res.status(500).send("Error during login process. Please try again.");
        
    }
})


app.post('/viewBalance',async(req,res)=>{

    try {
        const userAccountNumber = req.session.user.AccountNumber;
        const checkAccountNumber = await user.findOne({AccountNumber:userAccountNumber});

       

        if(!checkAccountNumber){
            res.send(`
                <script>
                  alert('Account Number Not Found , Please Check the Account Number Entered');
                  window.location.href = '/';   
                </script>
              `);
              return;

        }

        const checkPassword = req.body.Password;
        const isPasswordMatch = await bcrypt.compare(checkPassword, checkAccountNumber.Password);

        if(!isPasswordMatch){
            res.send(`
                <script>
                  alert('Wrong Password, Please Check the Password');
                  window.location.href = '/viewBalance';   
                </script>
              `);
              return;

        }
        const Balance = checkAccountNumber.Balance;
        res.render('Balance.ejs',{Balance:Balance,Name:checkAccountNumber.Name});



        
    } catch (error) {
        console.error("Login error:", error); // Log error for debugging
        res.status(500).send("Error during login process. Please try again.");
        
    }

})


app.post('/fundTransfer',async (req,res)=>{


  if (!req.session.user || !req.session.user.AccountNumber) {
    res.status(400).send("Session expired or not initialized. Please log in again.");
    return;
}

    try {
        const userAccountNumber = req.session.user.AccountNumber;
        const checkAccountNumber = await user.findOne({AccountNumber:userAccountNumber});
        const checkPayeeAccountNumber = await user.findOne({AccountNumber:req.body.PayeeAccountNumber});

        if(!checkAccountNumber){
            res.send(`
                <script>
                  alert('Account Number Not Found , Please Check the Account Number Entered');
                  window.location.href = '/fundTransfer';   
                </script>
              `);
              return;
        }
        if(!checkPayeeAccountNumber){
            res.send(`
                <script>
                  alert('Account Number Not Found , Please Check the Account Number Entered');
                  window.location.href = '/fundTransfer';   
                </script>
              `);
              return;
        }

        const amount = (parseFloat) (req.body.amount);     // Amount to be Transferred
        const Balance = (parseFloat)(checkAccountNumber.Balance);    // Balance of the Sender
        const PayeeAccountNumber = req.body.PayeeAccountNumber;

        if(amount>Balance || amount<0) {
            res.send(`
                <script>
                  alert('Insufficient Balance');
                  window.location.href = '/fundTransfer';   
                </script>
              `);
              return;

        }
        if(req.body.PayeeAccountNumber==req.session.user.AccountNumber){
          res.send(`
            <script>
              alert('Cannot Transfer to Your Own Account');
              window.location.href = '/fundTransfer';   
            </script>
          `);
          return;

        }

        checkAccountNumber.Balance = checkAccountNumber.Balance - amount;
        checkPayeeAccountNumber.Balance = checkPayeeAccountNumber.Balance + amount;

        checkAccountNumber.save();
        checkPayeeAccountNumber.save();
        const transactionId = "TXN" + Date.now();

        const currentDate = new Date();
        const formattedDateTime = currentDate.toLocaleString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }).replace(',', '');

        const debitTransaction = new DebitTransaction({
          Date : formattedDateTime,
          Description : "Fund Transfer to : " + PayeeAccountNumber,
          SenderAccountNumber : userAccountNumber,
          ReceiverAccountNumber : PayeeAccountNumber,
          Amount : amount,
          Balance : checkAccountNumber.Balance,
          TransactionID : transactionId,
          TransactionType : "Debit"

        });

        const creditTransaction = new CreditTransaction({
          Date: formattedDateTime,
          Description : "Fund Transfer from " + userAccountNumber,
          SenderAccountNumber : userAccountNumber,
          ReceiverAccountNumber : PayeeAccountNumber,
          Amount : amount,
          Balance : checkPayeeAccountNumber.Balance,
          TransactionID : transactionId,
          TransactionType : "Credit"
        });
        await debitTransaction.save();
        await creditTransaction.save();

        res.send(`
            <script>
              alert('Amount Successfully Transferred to Account Number: ${checkPayeeAccountNumber.AccountNumber}');
              window.location.href = '/home';
            </script>
          `);

    }  catch (error) {
        console.error("Login error:", error); // Log error for debugging
        res.status(500).send("Error during login process. Please try again.");
        
    }



})


app.get('/addFunds',isAuthenticated ,(req,res)=>{
    res.render('addFunds');

})

app.get('/fundTransfer', isAuthenticated,(req,res)=>{
    res.render('fundTransfer');
})

app.get('/viewBalance', isAuthenticated,(req,res)=>{
    res.render('viewBalance');
})

// app.get('/closeAccount', isAuthenticated,(req,res)=>{
//     res.render('closeAccount');
// })

app.get('/viewProfile', isAuthenticated, async (req, res) => {
  const user = req.session.user; 
  res.render('viewProfile', { 
      Name: user.Name, 
      Age: user.Age, 
      AccountNumber: user.AccountNumber, 
      FatherName: user.FatherName 
  });
});

app.get('/transactionHistory', isAuthenticated , async(req,res)=>{
  try {

    const userAccountNumber = req.session.user.AccountNumber;
    
    const debitTransactions = await DebitTransaction.find({
      SenderAccountNumber: userAccountNumber
  }).sort({Date : -1});

  const creditTransactions = await CreditTransaction.find({
      ReceiverAccountNumber: userAccountNumber
  }).sort({Date : -1});

  const transactions = [...debitTransactions, ...creditTransactions];
  transactions.sort((a, b) => new Date(b.Date) - new Date(a.Date));


    res.render('transactionHistory',{transactions : transactions,user:req.session.user});

  } catch (error) {
    console.error("Error fetching transaction history:", error);
    res.status(500).send("Error fetching transaction history. Please try again.");
  }

});

app.listen(port,(()=>{
    console.log("Port running on Port No " +port);
}))
