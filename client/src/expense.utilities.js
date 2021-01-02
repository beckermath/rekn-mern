export const getMooch = (fields, people) => {
    let mooch = [];

    for(var i = 0; i < fields.forWho.length; i++){
        for(var j = 0; j < people.length; j++){
            if(fields.forWho[i] === people[j]){
                mooch.push(j)
            }
        }
    }

    return mooch;
}

export const getPayIndex = (fields, people) => {
    let payIndex = 0;

    for(var i = 0; i < people.length; i++){
        if(fields.payedBy === people[i]){
            payIndex = i
        }
    }

    return payIndex;
}