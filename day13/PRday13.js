// <!-- // var numb =("100");
// function binaryToDecimal(val){
//     let sum =0;
//     for (let i=0;i<val.length; i++){
//         let bit =val.charAt(val.length-i-1);
//         sum += pow(2,parseInt(bit));

// }
// console.log(sum); -->

function tobinary(number){
    var result =[]
    // var i;
    for (var i=number;i>0;i=parseInt(i/2)){
        result.push(i%2)
    }
    return result.reverse().join('')
}
console.log(tobinary(2))

 