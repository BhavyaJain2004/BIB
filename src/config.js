const mongoose = require('mongoose');
const { defaultMaxListeners } = require('nodemailer/lib/xoauth2');

async function main() {
    await mongoose.connect('mongodb+srv://Bhavyajain2004:2004@cluster0.8qple.mongodb.net/bankdata?retryWrites=true&w=majority');
}
main().then(()=>{
    console.log("Connected to DB Successfully");
})
.catch((err)=>{
    console.log("Error in Connecting to DB , Please try again Later");
})



const userSchema = new mongoose.Schema({
    Name : {
        type : String,
        required : true
    },
    FatherName : {
        type : String,
        required : true
    },
    Age : {
        type : Number,
        required : true
    },
    Email : {
        type : String,
        required : false
    },

    Password : {
        type : String,
        required : true
    },
    Balance : {
        type : Number,
        default : 0
    },
    AccountNumber : {
        type : String,   
    },
    Date : {
        type : String,

    }

});


const debitTransactionSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true,
        default:Date.now
    },
    Description: {
        type: String,
        required: true
    },
    SenderAccountNumber: {
        type: String,
        required: true
    },
    ReceiverAccountNumber: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Balance: {
        type: Number,
        required: false
    },
    TransactionID: {
        type: String,
        required: true
    },
    TransactionType : {
        type : String,
        required:false,
        default:'Debit'
    }
});


const creditTransactionSchema = new mongoose.Schema({
    Date: {
        type: String,
        required: true,
        default:Date.now
    },
    Description: {
        type: String,
        required: true
    },
    SenderAccountNumber: {
        type: String,
        required: true
    },
    ReceiverAccountNumber: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    Balance: {
        type: Number,
        required: false
    },
    TransactionID: {
        type: String,
        required: true
    },
    TransactionType : {
        type : String,
        required:false,
        default : 'Credit'
    }
});


const counterSchema = new mongoose.Schema({
    count: { type: Number, default: 0 }, 
});

const user = mongoose.model('user',userSchema);
const Counter = mongoose.model('Counter',counterSchema);

const DebitTransaction = mongoose.model('DebitTransaction',debitTransactionSchema);
const CreditTransaction = mongoose.model('CreditTransaction',creditTransactionSchema);
module.exports = {user,Counter,DebitTransaction,CreditTransaction};
