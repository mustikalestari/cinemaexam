const findthedomain=(a)=>{
    var a = a.split('.')
    return a[1]
}
console.log(findthedomain('https://www.sephora.com//')) // sephota
//

const price=(basicprice, discount)=>{
    discount=discount/100
    return basicprice-(basicprice*discount)
}
console.log(price(10000, 20))//800
//
const oddeven=(plat,tanggal)=>{
    var licenseplate= plat.split(' ')[1]%2
    var date = tanggal%2
    var output=''
    if(licenseplate==date){
         output+=('allowed')
    }else{
        output+=('not allowed')
    }
    return output
 }
 console.log(oddeven('b 1414 zz',23))
 console.log(oddeven('b 1111 zz',11))
 //



