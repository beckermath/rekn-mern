const Person = require('./models/person-model');
const Expense = require('./models/expense-model');

expenseAdded = (expense) => {
    Person.updateOne({name: expense.payedBy}, {$inc: {balance: expense.amount}}, (res, err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })

    let minus = parseFloat(expense.amount)/expense.forWho.length;

    for(i = 0; i < expense.forWho.length; i++){
        Person.updateOne({name: expense.forWho[i]}, {$inc: {balance: -minus}}, (res, err) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }
        })
    }
}

expenseDeleted = (expense) => {
    Person.updateOne({name: expense.payedBy}, {$inc: {balance: -expense.amount}}, (res, err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })

    let minus = parseFloat(expense.amount)/expense.forWho.length;

    for(i = 0; i < expense.forWho.length; i++){
        Person.updateOne({name: expense.forWho[i]}, {$inc: {balance: minus}}, (res, err) => {
            if(err){
                console.log(err);
            }
            else{
                console.log(res);
            }
        })
    }
}

module.exports = {
    expenseAdded,
    expenseDeleted
}