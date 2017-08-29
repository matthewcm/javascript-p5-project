// 28/08/2017 
// Over the Lusty Glaze beach


// Need to develop a sleep in javascript....

// Hard mode different colour array each round
//easy mode, adds a new colour every round to the array.
// Checks each element of user choices to the comp array



var roundArray = [];
var snd = new Audio("./simon_sounds.mp3");
var snd_comp = new Audio("./simon_comp.mp3");

var roundSlow = true;
var colourIndex = {
      'red':0,
      'green':1,
      'blue':2,
      'purple':3
    };
function setup() {
  createCanvas(400, 400);
  background(230);
  
 

  center_x = (width/2);
  center_y = (height/2);

  block_size = new ColourBlock('');
  block_size = block_size.size;


  red_block = new ColourBlock('red');
  green_block = new ColourBlock('green');
  blue_block =  new ColourBlock('blue');
  purple_block = new ColourBlock('purple');

  red_block.position(center_x-10-block_size,center_y-10-block_size);
  green_block.position((center_x+10),center_y-10-block_size);
  blue_block.position((center_x-10)-block_size,(center_y+10));
  purple_block.position((center_x+10),center_y + 10);

  var blocks = [];
  blocks.push(red_block);
  blocks.push(green_block);
  blocks.push(blue_block);
  blocks.push(purple_block);

  console.log(blocks);

   game = new Simon(blocks);
  textSize(32);
  game.draw();

  // setTimeout(function(){
  //       game.draw();

  //     },10000);


  game.newRound();
  game.draw();

  frameRate(60);

  ticks_shown = 50;

}

function draw() {
  
  //game.draw();

  fill(0);
  text("Simon", center_x - 42, 32);
  text("Round: ", center_x - 42, height-10);
  text(game.round, center_x + 80, height-10);
  
  
  game.block_press();
  game.check_pattern();
 


  ticks_shown = ticks_shown -1;
  if (ticks_shown < 0){
    background(230);
    if (roundSlow){

      game.draw();
      game.reset_colour();

    }

    roundSlow = !roundSlow;

    ticks_shown = 50;
  }
  line(0,ticks_shown,width,ticks_shown);
  
}

function mouseReleased(){
  game.roundStep();

}


function Simon(blocks){
  this.blocks = blocks;
  this.round = 0;
  this.simonArray = [];

  this.playRound = function(){
    

    for (i=0; i<this.simonArray.length;i++){
      //sleep(500);
      this.blocks[colourIndex[this.simonArray[i]]].press();
      setTimeout(function(){
        this.draw();
      },500)
     
      console.log(i);
      // setTimeout(function(){
      //   snd_comp.play();
      //   snd_comp.currentTime = 0;
      // },2000);
    }

    


  }

  this.newRound = function(){
    colourArray = ['red','green','blue','purple'];
    this.round ++;

    this.simonArray.push(colourArray[Math.floor((Math.random() *(4)))]);

    this.playRound();
 
    //HARD MODE
    // for (i=0;i<this.round;i++){
    //   this.simonArray.push(colourArray[Math.floor((Math.random() *(4)))]);
    // }  
    console.log(this.simonArray)
    roundArray = [];
    return true;
  }

  this.draw = function(){
    for (i=0;i<this.blocks.length;i++){
      this.blocks[i].draw();
    }
  }
  this.block_press = function(){
    for (i=0;i<this.blocks.length;i++){
      this.blocks[i].colourOnPress();
    }
  }

  this.reset_colour = function(){
    for (i=0;i<this.blocks.length;i++){
      this.blocks[i].reset_colour();
    }
  }
  
  this.roundStep = function(){
    for (i=0;i<this.blocks.length;i++){
      if (this.blocks[i].isPressed()){
        roundArray.push(this.blocks[i].colour);
        console.log(roundArray);
      }
    }
    
  }
  this.check_pattern = function(){
    if (roundArray.toString() ==this.simonArray.toString()){
      console.log('woop');
      this.newRound();

    }else if (roundArray.length >= this.simonArray.length){
      console.log('Sorry mate');
      this.round = 0;
      this.simonArray = [];
      this.newRound();
    }
  }

  
  
  
}


function ColourBlock(colour){
  var colourHash = {
  'red':'rgb(255,0,0)',
  'red':'rgb(255,0,0)',
  'green':'rgb(0,255,0)',
  'blue':'rgb(0,0,255)',
  'purple':'rgb(255,40,255)',
  'yellow':'rgb(255,255,50)'
  }


  this.colour = colour
  this.c = colourHash[this.colour];




  this.size = 150;
  this.x = 0;
  this.y = 0;
  this.draw = function (){
    fill(this.c);
    rect(this.x, this.y, this.size, this.size );
  }
  this.position = function(x,y){
    this.x = x;
    this.y = y;
  }
  this.colourOnPress = function(){
    if (mouseIsPressed){
      if (((mouseX > this.x) && (mouseX <this.x+150)) && ((mouseY > this.y) && (mouseY < this.y+150))){
          this.c = 'yellow';
          this.draw();
          // roundArray.push(colour);
          // console.log(roundArray);
      }
    }
  
     

    
  }

  this.reset_colour = function(){
    this.c = colourHash[this.colour];
  }

   this.isPressed = function(){
      if (((mouseX > this.x) && (mouseX <this.x+150)) && ((mouseY > this.y) && (mouseY < this.y+150))){
        console.log('beep');
        snd.play();
        snd.currentTime = 0;

        return true;

      
      }else{
        return false;
      }

    
  }




  this.press = function(){
    this.c = 'yellow';
    //this.size ++;
    this.draw();
    snd_comp.play();
    
    snd_comp.currentTime=0;
    //this.c = colourHash[this.colour];
    // setTimeout(function(){

    //   this.c = colourHash[this.colour];

    // })
    
    
  }


}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

