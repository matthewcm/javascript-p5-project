// 28/08/2017 
// Over the Lusty Glaze beach


// Need to develop a sleep in javascript....

// Hard mode different colour array each round
//easy mode, adds a new colour every round to the array.
// Checks each element of user choices to the comp array

//at each tick it is already doing all the calculations. 
//Need to make it one step per tick



var roundArray = [];
// var snd = new Audio("./simon_sounds.mp3");
// var snd_comp = new Audio("./simon_comp.mp3");

// var sndi = new Audio("./simon_sounds_1.mp3");

var snd1 = new Audio("./block_1.mp3");
var snd2 = new Audio("./block_2.mp3");
var snd3 = new Audio("./block_3.mp3");
var snd4 = new Audio("./block_4.mp3");


var colourIndex = {
      'red':0,
      'green':1,
      'blue':2,
      'purple':3
    };

function setup() {
  createCanvas(400, 400);
  background(230);
  textSize(32);
  frameRate(60);

  center_x = (width/2);
  center_y = (height/2);

  default_block = new ColourBlock('');
  block_size = default_block.size;

  red_block = new ColourBlock('red',snd1);
  green_block = new ColourBlock('green',snd2);
  blue_block =  new ColourBlock('blue',snd3);
  purple_block = new ColourBlock('purple',snd4);

  red_block.position(center_x-10-block_size,center_y-10-block_size);
  green_block.position((center_x+10),center_y-10-block_size);
  blue_block.position((center_x-10)-block_size,(center_y+10));
  purple_block.position((center_x+10),center_y + 10);

  var blocks = [];
  blocks.push(red_block);
  blocks.push(green_block);
  blocks.push(blue_block);
  blocks.push(purple_block);

  game = new Simon(blocks);
  game.newRound();

  ticks_shown = 60;
  ticks_remaining = 60;

  new_round_start = true;
  block_pressed = false;

}

function draw() {
  background(230);

  fill(0);
  text("Simon", center_x - 42, 32);
  text("Round: ", center_x - 42, height-10);

  // Tick Show
  // text(ticks_remaining, 0, height-10);
  // text(ticks_shown, 60, height-10);

  text(game.round, center_x + 80, height-10);
  
  game.block_press();
  game.check_pattern();
  game.draw();

  if (new_round_start){
    ticks_remaining = ticks_remaining - 1.1**game.round;
    if (ticks_remaining < 0){
      game.simon_plays();
      ticks_remaining = 60;
      ticks_shown = 60;
    }
    
  }
  
  ticks_shown = ticks_shown - 1.1**game.round;
  if (ticks_shown < 0){
    game.reset_colour();
    ticks_shown = 60;
  }
}

function mouseReleased(){
  game.roundStep();
}


function Simon(blocks){
  this.blocks = blocks;
  this.round = 0;
  this.simonArray = [];
  this.simon_clone_array = [];

  this.newRound = function(){
    colourArray = ['red','green','blue','purple'];
    this.round ++;
    new_round_start = true;

    this.simonArray.push(colourArray[Math.floor((Math.random() *(4)))]);
    this.simon_clone_array = this.simonArray.slice(0);
 
    console.log(this.simonArray)
    roundArray = [];
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
        block_pressed = true;
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

  this.simon_plays = function(){
    if (this.simon_clone_array.length >= 1) {
      this.blocks[colourIndex[this.simon_clone_array.shift()]].press();
      block_pressed = true;
    }else{
      new_round_start = false
    }
  }
}


function ColourBlock(colour, sound=snd1){
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
  this.sound = sound;
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
      }
    }
  }

  this.isPressed = function(){
    if (((mouseX > this.x) && (mouseX <this.x+150)) && ((mouseY > this.y) && (mouseY < this.y+150))){
      this.play_sound();
      return true;
    }else{
      return false;
    }
  }

  this.reset_colour = function(){
    this.c = colourHash[this.colour];
    block_pressed = false;
  }

  this.press = function(){
    this.c = 'yellow';
    this.play_sound();
  }

  this.play_sound = function(){
    this.sound.play()
    this.sound.currentTime=0;
  }
}
