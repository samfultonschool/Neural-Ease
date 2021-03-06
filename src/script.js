let arch = []
let layers = [];
let x 
let y 
let loads = 0;


var windowTopBar = document.createElement('div')
windowTopBar.style.width = "100%"
windowTopBar.style.height = "32px"
windowTopBar.style.backgroundColor = "#000"
windowTopBar.style.position = "absolute"
windowTopBar.style.top = windowTopBar.style.left = 0
windowTopBar.style.webkitAppRegion = "drag"
document.head.appendChild(windowTopBar)


setInterval(()=>{
let newx = document.body.clientWidth;
let newy = document.documentElement.scrollHeight;
if(newx !== x || newy !== y){
refresh()
}
x = newx;
y = newy;
},100)

function refresh(){
  clear();
  layers = []
  resizeCanvas(1, 1);
  resizeCanvas(document.body.clientWidth * .98, document.documentElement.scrollHeight *.85);
  // createCanvas(document.body.clientWidth * .98, document.documentElement.scrollHeight *.87);
  layers.length = 0;
  for(let i = 0;i<arch.length;i++){
    drawRow(arch[i], i+.5);
  }
  
  connect();
}

document.getElementById('add').addEventListener('click', function(){
  let neurons = document.getElementById('neurons').value;
  arch.push(neurons);
  refresh();
})

document.getElementById('reset').addEventListener('click', function(){
  layers.length = 0;
  arch.length = 0;
  refresh();
})

function setup() {
  createCanvas(document.body.clientWidth * .98, document.documentElement.scrollHeight *.87);
   noLoop();
}

function draw() {
  background('#062532');

  layers.length = 0;
  for(let i = 0;i<arch.length;i++){
    drawRow(arch[i], i+.5);
  }
  
  connect();
  }



  async function connect(){
    loads++
    for (let index = 0; index < layers.length; index++) {
      const layer = layers[index];
      
      if(index === layers.length-1){
        for (let i = 0; i < layer.length; i++) {
          const node = layer[i];
          circle(node.x, node.y, node.size)
        }
        return
      };
      if( index !== layers.length-1){
        for (let i = 0; i < layer.length; i++) {
          const node = layer[i];
           for (let j = 0; j < layers[index+1].length; j++) {
             const node2 = layers[index+1][j];
             r = random(255); // r is a random number between 0 - 255
             g = random(100,200); // g is a random number betwen 100 - 200
             b = random(100); // b is a random number between 0 - 100
             a = random(200,255); // a is a random number between 200 - 255
              stroke("#c7eaf8");
              // stroke(r,g,b,a);
              let lineThickness = .5
              if(layer.length > 30){
                lineThickness = .4
              }
              if(layer.length > 50){
                lineThickness = .15
              }
              if(layer.length > 100){
                lineThickness = .05
              }
              strokeWeight(lineThickness);
              if(index !== layers.length-1){
                  line(node.x, node.y, node2.x, node2.y);
              }
              
           }
           circle(node.x, node.y, node.size)
           
        }
      }
    
    }
  }

function drawRow(nodes, numberLayer){
  let c = color('#c7eaf8');
  fill(c);
  let size = height / 20
  let dist = 0.065;
  if(nodes >= 15) size = height/35, dist = .04;
  if(nodes >22)dist = .03;
  if(nodes> 30) size = height/55, dist = .02;
  if(nodes > 49)size = height / 75, dist = .015;
  if(nodes > 70)size = height / 100, dist = .01;
  if(nodes > 100)size = height/ 150, dist = .005;
  let layer = []
  let x = width / 20;
  let leftX = width;
  if(numberLayer === arch.length){ x = width - (width/20)}
  else if(numberLayer !== 1) x= ( leftX/arch.length-1) *(numberLayer);
  if(numberLayer === 1) x = width /20,console.log(numberLayer);
  let y = height / 2;
  let y2 = y;
  let y3 = y;
  let topNodes = Math.ceil(nodes/2);
  let bottomNodes = Math.floor(nodes/2);
  for(let i = 0;i<bottomNodes;i++){
    y2 += height * dist
    if(x>10){
      layer.push({y:y2, x, size});
    }
    
  }
    for(let i = 0;i<topNodes;i++){
      
      if(x>10){
    layer.push({y:y3, x, size});
  }
  y3 -= height * dist
  }
  if(layer.length>0){
    layers.push(layer);
  }
  
}



// document.addEventListener('button.browser', function(){
//   let canvElem = document.querySelector('canvas');
//   canvElem.display = "block";
//   console.log("pressed");
// })





function allLong(){
  let answers = document.querySelectorAll('div.answer');
  let ans3 = [];
  let current3 = [];
  let longNum = 0;
  let longElem = undefined;
  for(let i=0;i<answers.length;i++){
      current3.push(answers[i]);
      if(current3.length === 3){
         for (let index = 0; index < current3.length; index++) {
           const current = current3[index];
           if(current.children[0].innerText.length > longNum)longNum = current.children[0].innerText.length, longElem = current;
         }
         longElem.children[0].children[0].children[0].click();
         longNum = 0;
         longElem = undefined;
         current3.length = 0;
        }
  }

}










// modal stuff


var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
  document.querySelector('.topnav').classList.add("blurred");
  document.querySelector('canvas').classList.add("blurred");
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  document.querySelector('.topnav').classList.remove("blurred");
  document.querySelector('canvas').classList.remove("blurred");
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
    document.querySelector('.topnav').classList.remove("blurred");
    document.querySelector('canvas').classList.remove("blurred");
  }
}








function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
