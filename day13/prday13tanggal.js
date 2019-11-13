function lalala(a){
    var newbulan=''
    var tanggal = a[0]+a[1] 
    var bulan = ['januari','februari','maret','april','mei','juni','juli','agustus','september','oktober','november','desember']
    var bulannn = a[2]+a[3]
    var tahun = a[4]+a[5]+a[6]+a[7]
    for(var i=0;i<bulan.length;i++){
        if(bulannn==(i+1)){
            newbulan=bulan[i]
        }
    }
    return `${tanggal}-${newbulan}-${tahun}`
}
console.log(lalala('09111996'))

// pr decimal to binary

function tobinary(number){
    var result =[]
    // var i;
    for (var i=number;i>0;i=parseInt(i/2)){
        result.push(i%2)
    }
    return result.reverse().join('')
    
}
console.log(tobinary(2))
//

const minMax=(arr=[],cond)=>{
    // a.sort(function(a,b){return a-b}) cara 1
    arr.sort((a,b)=>a-b)
    if(cond=='min'){
        return arr[0]
    }else{
        return arr[arr.length-1]
        }
    }
console.log(minMax([200,1,0.2,3,45,6,3,45,6],'max'))

