// Developed by Matthew 31/07/17 In Newquay.
//Game Of Life rules
/* 
A live cell with 2/3 Neighbours stays alive
A live cell with 1 or less Neighbours Dies
A live cell with 4 or more neighbours dies

A non live cell with exactly 3 neighbours is brought to life
*/

var cell;
var c; 

function setup(){
  createCanvas(600,600);
  grid = new Grid();
  default_cell = new Cell();
  frameRate(3);
  exec = true;
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function draw(){  
  if (((mouseX >= 0) && (mouseX <width)) && ((mouseY >= 0) && (mouseY < height))){
    if (mouseIsPressed){
    
      x = floor(mouseX/default_cell.size);
      y = floor(mouseY/default_cell.size);

      console.log(x,y);
      grid.find_cell(x,y).step_state = 1;
      grid.find_cell(x,y).change_state();
    }
  }
  grid.draw_cells();
  keyPressed();
  //grid.next_step();
  // sleep(1000);
  
  



  
  
}



function keyPressed(){
  if ((keyCode == 32)&&(exec)){
    grid.rules();
    grid.next_step();
    grid.draw_cells();
    exec = !exec;
    return false;
  }
  return false;
}


function Grid(){
  this.default_cell = new Cell();
  rows = floor(width / this.default_cell.size);
  columns = floor(height / this.default_cell.size);
  this.cells = [];
  
  for (i=0; i<columns;i++){
    row_array = [];
    for (j=0; j<rows;j++){
      row_array.push(new Cell(j,i));
    }
    this.cells.push(row_array);

  }
  this.draw_cells = function(){
    for (i=0; i<columns;i++){
      for (j=0; j<rows;j++){
        cell = this.find_cell(j,i);
        cell.draw_cell();
      }

    }
  }
  this.find_cell = function(x,y) {
    if ((x < 0 ) || (x >= width /this.default_cell.size ) || (y < 0) || (y >= height /this.default_cell.size)){
      return this.default_cell;
    }
    return this.cells[y][x];
  }

  this.rules = function(){


    this.count_neighbours = function(x,y){
      neighbours = 0;
      if (this.find_cell(x-1,y).m_state == 1){
        neighbours ++;
      }
      if (this.find_cell(x+1,y).m_state == 1){
        neighbours ++;
      }
      if (this.find_cell(x,y-1).m_state == 1){
        neighbours ++;
      }
      if (this.find_cell(x,y+1).m_state == 1){
        neighbours ++;
      }
      if (this.find_cell(x-1,y-1).m_state == 1){
        neighbours ++;
      }
      if (this.find_cell(x-1,y+1).m_state== 1){
        neighbours ++;
      }
      if (this.find_cell(x+1,y-1).m_state== 1){
        neighbours ++;
      }
      if (this.find_cell(x+1,y+1).m_state== 1){
        neighbours ++;
      }
      return neighbours;
    }

    this.unpopulated_rules = function(){
      neighbours = this.count_neighbours(j,i);
      cell = this.find_cell(j,i);
      if (neighbours == 3){
        cell.step_state = 1;
      }else {
        cell.step_state = 0;
      }

    }

    this.populated_rules = function(){
      neighbours = this.count_neighbours(j,i);
      cell = this.find_cell(j,i);
      if (neighbours <= 1){
        cell.step_state = 0;
      }else if ((neighbours == 2) || (neighbours == 3)){
        cell.step_state = 1;
      }
      else if (neighbours >= 4){
        cell.step_state = 0;
      }
    }


    for (i=0; i<columns;i++){
      for (j=0; j<rows;j++){
        cell = this.find_cell(j,i);
        if (cell.m_state == 1){
          this.populated_rules();
        }else if (cell.m_state == 0){
          this.unpopulated_rules();
        }
      }

    } 



    
  }
  this.next_step = function(){
    for (i=0; i<columns;i++){
      for (j=0; j<rows;j++){
        cell = this.find_cell(j,i);
        if (cell.step_state == 1){
          cell.change_state();
        }else if (cell.step_state == 0){
          cell.change_state();
        }
      }
    }

  }
 


  


}
function Cell (x,y,state=0){
  Abstract_Cell.call(this)
  this.m_x = x*this.size;
  this.m_y = y*this.size;
  this.m_state = state;
  this.step_state = this.m_state;
  if (this.m_state == 1){
    
      }

  this.change_state = function(){

    // Make an array of state and colour, when state switch. just flip the array and choose first element
    if (this.step_state == 0){
      this.c = color('rgb(25, 20, 88)');
      this.m_state = 0;
    }else if (this.step_state == 1){
      this.c = color('rgb(238, 214, 0)');
      
      this.m_state = 1;
    }

       
    
    //console.log('Change in state')
  }
  this.draw_cell = function(){
    fill(this.c);
    rect(this.m_x ,this.m_y,this.size,this.size);
  }



}

function Abstract_Cell(){
  this.size = 10;
  this.c = color('rgb(25, 20, 88)');
  this.m_state = 0;


}