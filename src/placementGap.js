// function placementGap(mainArray){
//    const alphabet = "abcdefghij";
//    const alphArray = alphabet.split('');
//     let finalArray = [];
//     // two axis we have to check x & y, number and alphabet.
//     // create guard clause
//     // psuedo code

//     // ambil data dari array 
//     // pecahkan array satu satu kita cek
//     // pertama cek axis x yaitu nomor
//     // guard clause
//     // apakah posisi dia no 1? maka shield awal middlenya tidak dipasang. Hanya dipasang +1 di akhir dari block
//     // apakah posisi dia no 10? maka shield akhir middlenya tidak dipasang. Hanya dipasang -1 di awal dari block
//     const patt1 = /[0-9]/g;
//     const patt2 = /[a-zA-Z]/g;
//     let firstNum = parseInt(mainArray[0].match(patt1).join(''));
//     let firstAlp = mainArray[0].match(patt2).join('');
//     let lastNum = parseInt(mainArray[mainArray.length - 1].match(patt1).join(''));
//     let lastAlp = mainArray[mainArray.length - 1].match(patt2).join('');
//     let lastAlpPlusOne = alphArray[(alphArray.indexOf(lastAlp))+1];
//     let firstAlpMinusOne = alphArray[(alphArray.indexOf(firstAlp))-1];
// //    console.log(firstNum);
// //    console.log(firstAlp);
// //    console.log(lastNum);
// //    console.log(lastAlp);
// //    console.log(lastAlpPlusOne); 
// console.log(firstAlpMinusOne);


// // HARUSNYA DIPISAH KETIKA PROSES VERTICAL ATAU HORIZONTAL
//    //middle action shield
//    if (firstNum === 1 && firstAlp === "a"){
//     // only do last num
//    // console.log(lastMiddleNum + 1);
//         finalArray.push((lastNum + 1).toString().concat(lastAlp)); // ke kanan 
//         // finalArray.push((firstNum).toString().concat(lastAlpPlusOne)) //ke bawah
//         console.log('hit ujung kiri');
//         console.log(finalArray);
//         return
//    }
//    if (firstNum === 10 && lastAlp === 'j'){
//         finalArray.push((firstNum - 1).toString().concat(firstAlp));
//         console.log('hit ujung kanan bawah')
//         console.log(finalArray);
//         return
//     }
//    else{
//         console.log('hit else')
//         finalArray.push((firstNum - 1).toString().concat(firstAlpMinusOne));  // mid left start
//         finalArray.push((firstNum - 1).toString().concat(lastAlpPlusOne)); // mid left end
        
//         finalArray.push((firstNum).toString().concat(firstAlpMinusOne)); 
//         finalArray.push((lastNum).toString().concat(lastAlpPlusOne));

//         finalArray.push((firstNum + 1).toString().concat(firstAlpMinusOne));
//         finalArray.push((firstNum + 1).toString().concat(lastAlpPlusOne));

//         console.log(finalArray);
//    }
// }
// // placementGap(['1j','2j','3j']);
// // placementGap(['10a', '10b', '10c', '10d']);
// // placementGap(['1a', '2a', '3a', '4a', '5a']);
// // placementGap(['4d', '4e', '4f', '4g', '4h']);
// placementGap(['3b','4b','5b']);

// export default placementGap


// // 1a, 2a, 3a, 4a, 5a