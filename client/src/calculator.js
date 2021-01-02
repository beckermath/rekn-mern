export const calculateDebts = (group, expensesBad) => {
    let expenses = new Array(expensesBad.length);

    for(var i = 0; i < expenses.length; i++){
        expenses[i] = {payIndex: expensesBad[i][0], amount: expensesBad[i][1], mooch: expensesBad[i][2]};
    }


    let payments = [];
    let balances = new Array(group.length)
    let balances2 = [];

    for(i = 0; i < balances.length; i++){
        balances[i] = 0.0    
    }

    for( i = 0; i < expenses.length; i++)
    {
        var minus = parseFloat(expenses[i].amount)/expenses[i].mooch.length;

        balances[expenses[i].payIndex] += parseFloat(expenses[i].amount);

        for(var j = 0; j < expenses[i].mooch.length; j++)
        {
            balances[expenses[i].mooch[j]] -= minus;
        }
    }

    for( i = 0; i< balances.length; i++)
    {
        var n = group[i];
        var b = parseFloat(balances[i].toFixed(2)); 
       
        balances2.push({n, b});
    }

    balances2.sort(compare);
    var spi = smallestPositiveIndex(balances2);
    var hni = spi + 1;
    var going = true;


    while(going)
    {
        if(balances2[spi].b > Math.abs(balances2[hni].b))
        {
            balances2[spi].b += balances2[hni].b;
            let amount = Math.abs(balances2[hni].b).toFixed(2);
            balances2[hni].b = 0;

            let payer = balances2[hni].n;
            let reciever = balances2[spi].n;

            hni++;

            let trans = {payer, reciever, amount};
            payments.push(trans);
        }
        else if(balances2[spi].b.toFixed(2) === Math.abs(balances2[hni].b.toFixed(2)))
        {
            let payer = balances2[balances2.length -1].n;
            let reciever = balances2[0].n;
            let amount = Math.abs(balances2[0].b).toFixed(2);

            hni++;
            spi--;

            let trans = {payer, reciever, amount};
            payments.push(trans);
        }
        else
        {
            balances2[hni].b += balances2[spi].b;
            let amount = Math.abs(balances2[spi].b).toFixed(2);
            balances2[spi].b = 0;
            

            let payer = balances2[hni].n;
            let reciever = balances2[spi].n;
            
            spi--;

            let trans = {payer, reciever, amount};
            payments.push(trans);
        }

        if(hni > balances2.length-1 || spi < 0)
        {
            going = false;
        }
    }

    return payments;
}

export const getBalances = (group, expensesBad) => {
    let expenses = new Array(expensesBad.length);

    for(var i = 0; i < expenses.length; i++){
        expenses[i] = {payIndex: expensesBad[i][0], amount: expensesBad[i][1], mooch: expensesBad[i][2]};
    }

    let balances = new Array(group.length)

    for(i = 0; i < balances.length; i++){
        balances[i] = 0.0    
    }

    for( i = 0; i < expenses.length; i++)
    {
        var minus = parseFloat(expenses[i].amount)/expenses[i].mooch.length;

        balances[expenses[i].payIndex] += parseFloat(expenses[i].amount);

        for(var j = 0; j < expenses[i].mooch.length; j++)
        {
            balances[expenses[i].mooch[j]] -= minus;
        }
    }

    return balances;
}

function smallestPositiveIndex(balances2){
    var max = 0;

    for(var i = 0; i < balances2.length; i++)
    {
        if(balances2[i].b > max)
        {
            max = balances2[i].b;
        }
    }

    var sp = max;

    for(i = 0; i < balances2.length; i++)
    {
        if(balances2[i].b < sp && balances2[i].b > 0)
        {
            sp = balances2[i].b;
        }
    }

    for(i = 0; i < balances2.length; i++)
    {
        if(balances2[i].b === sp)
        {
            return i;
        }
    }
}

function compare(a, b){
    return b.b - a.b;
}