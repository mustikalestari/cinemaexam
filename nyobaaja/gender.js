  
var onNamechange=()=>{
    if(document.getElementById('nama').value!==''){
        document.getElementsByTagName('h5')[0].innerHTML=`nama udah ada diisi`
    }else{
        document.getElementsByTagName('h5')[0].innerHTML='harap diisi'
    }
}
const onBtnResclick=()=>{
    var nama=document.getElementById('nama').value
    var usia=document.getElementById('usia').value
    var kelamin=''
    if(document.getElementsByName('sex')[0].checked){
        kelamin='Pria'
    }else if(document.getElementsByName('sex')[1].checked){
        kelamin='Wanita'
    }
    if(nama&&usia&&kelamin){
        document.getElementsByTagName('h5')[1].innerHTML=`nama ${nama}
                                    <br>usia ${usia}<br> ${kelamin}`
        document.getElementsByTagName('h5')[0].innerHTML=``
        document.getElementById('nama').value=''
        document.getElementById('usia').value=''
        // console.log(document.getElementById('tombol'))
        // console.log(document.getElementsByName('sex'))
        document.getElementsByName('sex')[1].checked=false
        document.getElementsByName('sex')[0].checked=false
    }else{
        document.getElementsByTagName('h5')[1].innerText='harap dimasukkan semua'
    }
}