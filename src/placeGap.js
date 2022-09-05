// set gap by one by one loop check

function placeGap(mainArray){
    let outputArray = [];
    let resultArray = [];
    const numberPatt = /[0-9]/g;
    const alphaPatt = /[a-zA-Z]/g;
    const alphabetMax = 'abcdefghij';
    const alpArray = alphabetMax.split('');
    mainArray.forEach((val)=>{
        let numb = parseInt(val.match(numberPatt).join(''));
        let alph = val.match(alphaPatt).join('');
        let numbMinusOne = numb - 1;
        let numbPlusOne = numb + 1;
        let alphPlusOne = alpArray[(alpArray.indexOf(alph))+1];
        let alphMinusOne = alpArray[(alpArray.indexOf(alph))-1];
        
        // horizontal check
        // -1 number is (alph normal) 
        outputArray.push((numbMinusOne).toString().concat(alph));
        // put inside output array 
        // +1 number is
        outputArray.push((numbPlusOne).toString().concat(alph));
        // put inside output array 

        // vertical check
        // -1 alpha is  
        outputArray.push((numb).toString().concat(alphMinusOne));
        // put inside output array
        // +1 alpha is
        outputArray.push((numb).toString().concat(alphPlusOne));
        // put inside output array

        //diagonal left check
        outputArray.push((numbMinusOne).toString().concat(alphMinusOne));
        outputArray.push((numbMinusOne).toString().concat(alphPlusOne));
        //diagonal right check
        outputArray.push((numbPlusOne).toString().concat(alphMinusOne));
        outputArray.push((numbPlusOne).toString().concat(alphPlusOne));
        
        // merge the array
        resultArray = resultArray.concat(outputArray);
        resultArray = [...new Set ([...mainArray, ...outputArray])];    

    });
    console.log(outputArray);
    console.log(resultArray);




    return resultArray
}

// let array1 = ['a','b','c'];
// let array2 = ['z','a','s'];

// let array3 = array1.concat(array2);
// array3 = [...new Set([...array1,...array2])]

// console.log(array3); 


placeGap(['3c','4c','5c']);

export default placeGap