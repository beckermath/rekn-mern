const Person = require('./models/person-model');
const Expense = require('./models/expense-model');
const Payment = require('./models/payment-model');

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

    calculatePayments();
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

    calculatePayments();
}

calculatePayments = async() => {

    //UnhandledPromiseRejection
    let people = await Person.find({});

    people.sort((a, b) => { return b.balance - a.balance });

    let spi = smallestPossitiveIndex(people);
    let hni = spi + 1;
    let payments = [];

    let going = true;

    while(going){
        if(people[spi].balance.toFixed(2) > Math.abs(people[hni].balance.toFixed(2))){
            people[spi].balance += people[hni].balance;
            let amount = Math.abs(people[hni].balance).toFixed(2);
            people[hni].balance = 0;

            let payer = people[hni].name;
            let receiver = people[spi].name;

            hni++;

            payments.push({payer, receiver, amount});
        }
        else if(people[spi].balance.toFixed(2) === Math.abs(people[hni].balance.toFixed(2))){
            let payer = people[people.length - 1].name;
            let receiver = people[0].name;
            let amount = Math.abs(people[0].balance).toFixed(2);

            hni++;
            spi++;

            payments.push({payer, receiver, amount});
        }
        else{
            people[hni].balance += people[spi].balance;
            let amount = Math.abs(people[spi].balance).toFixed(2);
            people[spi].balance = 0;

            let payer = people[hni].name;
            let receiver = people[spi].name;

            spi--;

            payments.push({payer, receiver, amount});
        }

        if(hni > people.length - 1 || spi < 0){
            going = false;
        }

    }

    //clear payment collection
    Payment.deleteMany({}, (res, err) => {
        if(err){
            console.log(err);
        }
        else{
            console.log(res);
        }
    })

    //fill payment collection
    for(let i = 0; i < payments.length; i++){
        const payment = new Payment(payments[i]);
        payment.save();
    }
}

smallestPossitiveIndex = (people) => {
    let max = 0;

    for(let i = 0; i < people.length; i++){
        if(people[i].balance > max){
            max = people[i].balance
        }
    }

    let sp = max;

    for(let i = 0; i < people.length; i++){
        if(people[i].balance < sp && people[i].balance > 0){
            sp = people[i].balance;
        }
    }

    for(let i = 0; i < people.length; i++){
        if(people[i].balance === sp){
            return i;
        }
    }
}

module.exports = {
    expenseAdded,
    expenseDeleted
}