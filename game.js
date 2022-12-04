let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");
canvas.width = 0.75*window.innerWidth;
canvas.height = 0.75*window.innerHeight;
canvas.style.background = "#5A5A5A";

let comp_size = 60;
let direction = [-1,1]
let colorArray = ["FF1178","FE0000","FFF205","01FFF4","7CF001","8C00FC"];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomNumber2(min, max) {
    return (Math.random() * (max - min) + min);
}
function getSpeedChange(speed) {
    return (Math.random() * (speed/2 + speed/2) - speed/2) 
}

function contains (rect, x, y) {
    return (x <= rect.posx + rect.width) && (rect.posx <= x) && (y <= rect.posy + rect.width) && (rect.posy <= y);
}

class Rectangle {
    constructor(x, y) {
        this.width = comp_size;
        this.init_direction = getRandomNumber(0,2)
        this.speed_x = getRandomNumber2(2,6) * direction[this.init_direction];
        this.speed_y = getRandomNumber2(2,6) * direction[this.init_direction];
        this.posx = x;
        this.posy = y; 
        this.color = colorArray.pop();
    }  
    createRectangle(context){
        context.beginPath();
        context.lineWidth = 3;
        context.fillStyle = "#" + this.color; 
        context.fillRect(this.posx, this.posy, this.width, this.width);   
        context.closePath();
    }
 
    updateRectangle()
    {    
        if ( (this.posx) > canvas.width - comp_size ) {
            if(Math.abs(this.speed_x) <= 1 || (Math.abs(this.speed_x) >= 6)){           
                this.speed_x = -3
            } else {
                this.speed_x = -this.speed_x + getSpeedChange(this.speed_x);    
            }            
        }
        if  ( (this.posx + 2) < 0) {
            if(Math.abs(this.speed_x) <= 1 || (Math.abs(this.speed_x) >= 6)){
                this.speed_x = 3
            }else{
                this.speed_x = -this.speed_x + (getSpeedChange(this.speed_x));   
            }     
        }
        if ( (this.posy) < 0 ) {
            if(Math.abs(this.speed_y) <= 1 || (Math.abs(this.speed_y) >= 6)){
                this.speed_y = 3
            } else {
                this.speed_y = -this.speed_y + (getSpeedChange(this.speed_y));   
            }            
        }
        if ( (this.posy + comp_size) > canvas.height ) {
            if(Math.abs(this.speed_y) <= 1 || (Math.abs(this.speed_y) >= 6)){
                this.speed_y = -3
            } else {
                this.speed_y = -this.speed_y + (getSpeedChange(this.speed_y));        
            }             
        }
        this.posx += this.speed_x;
        this.posy += this.speed_y; 
        this.createRectangle(context);
    } 
}
let all_components = [];
let numOfHits = 0;
let n = getRandomNumber(3,7);
for (var i = 0; i < n; i++) 
{
    let xpos = getRandomNumber(comp_size, (canvas.width - comp_size));
    let ypos = getRandomNumber(comp_size, (canvas.height - comp_size));

    let rect = new Rectangle(xpos, ypos);
    all_components.push(rect);
    rect.createRectangle(context)  
}
canvas.addEventListener('click', function(event) {   
    let x = event.clientX;
    let y = event.clientY;
    all_components.forEach(function(component) {
        if(contains(component,x,y))
        {
            all_components = all_components.filter(comp => comp !== component)
            numOfHits++;
        }
    });  
});

function updateGame() {
    requestAnimationFrame(updateGame);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.font = "900 Italic 25px Verdana";
    context.fillStyle = "white";
    context.textAlign = "right";      
    context.fillText("Broj generiranih komponenti: " + Math.round(n) , canvas.width - 15, 25);
    context.fillText("Broj pogođenih komponenti: " + numOfHits , canvas.width - 15, 50);
    all_components.forEach(component => {
      component.updateRectangle();
    })    
  }    
updateGame();
