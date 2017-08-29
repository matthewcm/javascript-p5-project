// Programmed 30/07/17 On the train to Newquay


var snake;
var food;
var c;

function setup() {
  createCanvas(400, 400);
  background(127);
  snake = new Snake();
  food = new Food();

  frameRate(10);
}

function draw() {
  background(127);
  food.place();
  if (dist(snake.x,snake.y, food.x, food.y) < 1){
    snake.eat();
    food.eaten();
  } 
  if (mouseIsPressed){
    snake.eat();
  }
  snake.move();
  for (i=0;i<snake.tail_length;i++){
    if (dist(snake.x,snake.y, snake.tail[i][0], snake.tail[i][1]) <= 0){
      console.log('Game Over')
      snake = new Snake();
      food = new Food();
    } 
  }
}

function Cell(){
  this.size = 10;
  this.draw_cell = function(p_c, p_x,p_y){
    fill(p_c);
    rect(p_x ,p_y,this.size,this.size);

  }
}

function Food(){
  Cell.call(this);
  this.x = floor(random(width/this.size))*this.size;
  this.y = floor(random(height/this.size))*this.size;

  console.log(this.x, this.y);
  this.c = color('rgb(255,0,0)');

  this.place = function() {
    this.draw_cell(this.c,this.x, this.y);
  }

  this.eaten = function(){
    this.x = floor(random(width/this.size))*this.size;
    this.y = floor(random(height/this.size))*this.size;
  }
  
}

function Game(){

}



function Snake(){
  Cell.call(this);
  this.x = 20;
  this.y = 20;
  this.x_speed = 1;
  this.y_speed = 0;
  this.tail_length = 0;
  this.tail = [];

  this.c = color('#0f0');
  this.draw_cell(this.c,this.x, this.y);

  this.eat = function(){
    this.tail_length += 1;
    append(this.tail ,[this.x, this.y]);
    console.log('Snek has ate', this.tail_length);
  }

  this.move = function(){
    this.turn = function(){
      if (this.y_speed == 0){
        if (keyCode == DOWN_ARROW){
          this.x_speed = 0;
          this.y_speed = 1;
        } else if (keyCode == UP_ARROW){
          this.x_speed = 0;
          this.y_speed = -1;
        }   
      }else if (this.x_speed == 0){
        if (keyCode == LEFT_ARROW){
            this.x_speed = -1;
            this.y_speed = 0;
          } else if (keyCode == RIGHT_ARROW ){
            this.x_speed = 1;
            this.y_speed = 0;
          }
        }
      }

    this.turn();

    this.tail.unshift([this.x,this.y]);
    shorten(this.tail);
    
    this.x = this.x + this.x_speed*this.size;
    this.y = this.y + this.y_speed*this.size;
    this.x = constrain(this.x, 0, width-this.size);
    this.y = constrain(this.y, 0,height-this.size);

    this.draw_cell(this.c,this.x, this.y);
    for (i=0;i<this.tail_length; i++){
      pos = this.tail[i];
      console.log('pos');
      this.draw_cell(this.c, pos[0],pos[1]);
    }
  }
}






