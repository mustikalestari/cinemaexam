function vowelz(a)
{
  var vokal = 'aeiouAIUEO'
  var hitungvocal = 0
  
  for(var i = 0; i< a.length; i++)
  {
    if (vokal.indexOf(a[i]) !== -1)
    {
      hitungvocal += 1
    }
  }
  return hitungvocal
}
console.log(vowelz("everyone is such a bully like fuck u all for not having a nice behaviour"))
//
function consonantzz(a){
    var consonant='bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ'
    var hitungconsonant=0;
{
    for(var i=0;i<a.length;i++)
        if(consonant.indexOf(a[i])!==-1)
        {
            hitungconsonant +=1;
        }
    }
    return hitungconsonant;
}
console.log(consonantzz('tari is such a weirdo'))
