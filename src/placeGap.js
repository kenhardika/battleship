// set gap by one by one loop check

function placeGap(mainArray){
    let outputArray = [];
    let resultArray = [];
    const numberPatt = /[0-9]/g;
    const alphaPatt = /[a-zA-Z]/g;
    const alphabetMax = 'abcdefghij';
    const alpArray = alphabetMax.split('');
    mainArray.forEach((val)=>{
        const numb = parseInt(val.match(numberPatt).join(''));
        const alph = val.match(alphaPatt).join('');
        const numbMinusOne = numb - 1;
        const numbPlusOne = numb + 1;
        const alphPlusOne = alpArray[(alpArray.indexOf(alph))+1];
        const alphMinusOne = alpArray[(alpArray.indexOf(alph))-1];
        
        function mergeArray(){
              // merge the array
            resultArray = resultArray.concat(outputArray);
            resultArray = [...new Set ([...mainArray, ...outputArray])];  
        }

        if (numbMinusOne < 1){
            outputArray.push((numbPlusOne).toString().concat(alph)); // right
            outputArray.push((numb).toString().concat(alphMinusOne)); // up
            outputArray.push((numb).toString().concat(alphPlusOne)); // down
            outputArray.push((numbPlusOne).toString().concat(alphMinusOne)); // up right
            outputArray.push((numbPlusOne).toString().concat(alphPlusOne)); // down right
            console.log('hit number = 0');
            mergeArray();
            return
        }
        if(numbPlusOne > 10){
            outputArray.push((numbMinusOne).toString().concat(alph)); // left
            outputArray.push((numb).toString().concat(alphMinusOne)); // up
            outputArray.push((numb).toString().concat(alphPlusOne)); // down
            outputArray.push((numbMinusOne).toString().concat(alphMinusOne)); // up left
            outputArray.push((numbMinusOne).toString().concat(alphPlusOne)); // down left
            console.log('hit number > 10');
            mergeArray();
            return
        }
        
        if (alphMinusOne == undefined){
            console.log('hits undefined');
            outputArray.push((numbMinusOne).toString().concat(alph)); // left
            outputArray.push((numbPlusOne).toString().concat(alph)); // right
            outputArray.push((numb).toString().concat(alphPlusOne)); // down
            outputArray.push((numbMinusOne).toString().concat(alphPlusOne)); // down left
            outputArray.push((numbPlusOne).toString().concat(alphPlusOne)); // down right
            mergeArray();
            return
        }
        if (alphPlusOne == undefined){
            console.log('hits undefined');
            outputArray.push((numbMinusOne).toString().concat(alph)); // left
            outputArray.push((numbPlusOne).toString().concat(alph)); // right
            outputArray.push((numb).toString().concat(alphMinusOne)); // up
            outputArray.push((numbMinusOne).toString().concat(alphMinusOne)); // up left
            outputArray.push((numbPlusOne).toString().concat(alphMinusOne)); // up right
            mergeArray();
            return
        }
        else{
                // horizontal check
                outputArray.push((numbMinusOne).toString().concat(alph)); // left
                outputArray.push((numbPlusOne).toString().concat(alph)); // right
                // vertical check
                outputArray.push((numb).toString().concat(alphMinusOne)); // up
                outputArray.push((numb).toString().concat(alphPlusOne)); // down
                //diagonal left check
                outputArray.push((numbMinusOne).toString().concat(alphMinusOne)); // up left
                outputArray.push((numbMinusOne).toString().concat(alphPlusOne)); // down left
                //diagonal right check
                outputArray.push((numbPlusOne).toString().concat(alphMinusOne)); // up right
                outputArray.push((numbPlusOne).toString().concat(alphPlusOne)); // down right
                mergeArray();
                return
            }
        
        

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

placeGap(['3a'])
// placeGap(['10c', '10d', '10e']);

export default placeGap