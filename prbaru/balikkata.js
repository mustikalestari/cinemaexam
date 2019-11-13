function reverse(a) {
    var output = ''
    for(var i = a.length-1; i >= 0; i--){
        output += a[i]
    }
    return output
}
console.log(reverse('purwadhika'))
console.log(reverse('tari'))