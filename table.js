var rows=15;
var cols=15;
var no_of_bombs=35;
var table = document.getElementById('board');
for (var r = 0; r<rows; r++){
  var row = table.insertRow(-1);
  for (var c = 0; c<cols; c++){
    var cell = row.insertCell(-1);
    cell.setAttribute('id',rows*r+c);
    cell.setAttribute('class', 'cell ' + ((c+r) % 2 ? 'odd' : 'even'));
  }
}
var bombpos=new Array(no_of_bombs);

var remcount=(rows*cols)-no_of_bombs;
var div=document.getElementById('d');
div.innerHTML="remaining safe cells : "+remcount;

var bombs =new Array(rows*cols);
for(i=0;i<rows*cols;i++)
bombs[i]=0;

for(i=no_of_bombs-1;i>=0;i--)
{
let a=Math.floor(Math.random() * (rows*cols));
if(bombs[a]==1)
i++;
else{
bombs[a]=1;
bombpos[i]=a;
document.getElementById("board").rows[Math.floor(a/rows)].cells[a%cols].setAttribute('class','bomb ' + ((a) % 2 ? 'odd' : 'even'));
}
}

const rowNbr = [ -1, -1, -1, 0, 0, 1, 1, 1 ];
const colNbr = [-1, 0, 1, -1, 1, -1, 0, 1 ];

var value=new Array(rows*cols);
for(i=0;i<rows*cols;i++)
value[i]=0;

var abc=0;
document.getElementById('b1').onclick=function(){
  abc=(abc+1)%3;
  remflag=0;
  if(abc==1)
  document.getElementById('b1').innerHTML="Click to remove flag";
  else if(abc==2)
  document.getElementById('b1').innerHTML="Click to disable flag";
  else
  document.getElementById('b1').innerHTML="Click to enable flag";
};

var included=new Array(rows*cols);
for(i=0;i<rows*cols;i++)
included[i]=0;

var start=0;

for(let i=0;i<rows*cols;i++)
{
  let current=document.getElementById(i);
  row=Math.floor(i/rows);
  col=i%cols;

  for (k = 0; k < 8; ++k){
  if ((row+rowNbr[k] >= 0) && (row+rowNbr[k] < rows) && (col+colNbr[k] >= 0) && (col+colNbr[k] < cols) && 
  (bombs[(rows*(row+rowNbr[k]))+col+colNbr[k]]==1))
  value[i]++;
  }

  if(current.className=='bomb odd' || current.className=='bomb even')
  current.onclick=function(){
    if(start==0)
    startTimer();
    if(!included[i] && abc==2)
    current.innerHTML="";
    if(abc==1)
    current.innerHTML=  "&#128681";
    if(abc==0){
    for(p=0;p<no_of_bombs;p++){
    document.getElementById(bombpos[p]).setAttribute('class','bombblast');
    document.getElementById(bombpos[p]).innerHTML='&#128163';
    }
    stopTimer();
    alert("Game over,reload the page for a new game!");
    
    }
  }
  else{
    current.onclick=function(){
      if(start==0)
      startTimer();
      if(!included[i] && abc==2)
      current.innerHTML="";
      if(abc==1  && included[i]==0)
      current.innerHTML=  "&#128681";
      if(abc==0)
      safe(i);
    }
  }
  
}

function safe(j)
{
  current2=document.getElementById(j);
  if(current2.className=='bomb odd' || current2.className=='bomb even'|| included[j])
  return;
  
  //alert(value[i]);
  if(value[j]>0){               //make that included
  current2.innerHTML=value[j];
  included[j]=1;
  current2.setAttribute('class','included'+ (j % 2 ? 'odd' : 'even'));
  remcount--;
  div.innerHTML="Remaining safe cells : "+remcount;
  if(remcount==0){
    stopTimer();
  alert("Congratulations!You have won");
  }
  }
  else
  {
    
    included[j]=1;
    current2.setAttribute('class','included'+ (j % 2 ? 'odd' : 'even'));
    const x=Math.floor(j/rows);
    const y=j%cols;

    if(x!=0 && included[j-cols]==0)
    safe(j-cols);
    
    if(x!=(rows-1) && included[j+cols]==0)
    safe(j+cols);

    if(y!=0 && included[j-1]==0)
    safe(j-1);
    
    if(y!=(cols-1) && included[j+1]==0)
    safe(j+1);

    remcount--;
    div.innerHTML="Remaining safe cells : "+remcount;
    if(remcount==0){
    stopTimer();
    alert("Congratulations!You have won");
    }
  }
}

const timer = document.getElementById('stopwatch');
var t=0;
var ts=0;
var hr = 0;
var sec = 0;
var min = 0;
var stoptime = true;

function startTimer() {
    start=1;
    timer.innerHTML = '00:00:00';
    hr = 0;
    sec = 0;
    min = 0;
    stoptime = true;
  if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
  if (stoptime == false) {
    stoptime = true;
  }
}

function timerCycle() {
    if (stoptime == false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec == 60) {
      min = min + 1;
      sec = 0;
    }
    if (min == 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec == 0) {
      sec = '0' + sec;
    }
    if (min < 10 || min == 0) {
      min = '0' + min;
    }
    if (hr < 10 || hr == 0) {
      hr = '0' + hr;
    }

    timer.innerHTML = hr + ':' + min + ':' + sec;
    ts++;

    t = setTimeout("timerCycle()", 1000);
  }
}
