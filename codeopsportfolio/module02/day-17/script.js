
// function createBankAccount(initialBalance) {
//     let balance = initialBalance;

//     return {
//         deposit: function(amount) {
//             if (amount > 0) {
//                 balance += amount;
//                 console.log(`Deposited ${amount} ETB. New Balance: ${balance} ETB`);
//             }
//         },
//         withdraw: function(amount) {
//             if (amount <= balance) {
//                 balance -= amount;
//                 console.log(`Withdrew ${amount} ETB. New Balance: ${balance} ETB`);
//             } else {
//                 console.log("Insufficient funds!");
//             }
//         },
//         getBalance: function() {
//             return balance;
//         }
//     };
// }

// // --- TESTING PRIVATE STATE ---
// const myAccount = createBankAccount(1000);

// console.log(myAccount.getBalance()); // Will print: 1000
// myAccount.deposit(500);              // Will print: Deposited 500 ETB. New Balance: 1500 ETB
function calculate(a,b, action){
    return action(a,b);

}
function add(x,y){
    return x+y;
}
function Sub(x,y){
   return x-y;  
}
console.log(calculate(5,3,add))