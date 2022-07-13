/*
Create by Learn Web Developement
Youtube channel : https://www.youtube.com/channel/UC8n8ftV94ZU_DJLOLtrpORA
*/

const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 30;

// load images

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/point.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];

snake[0] = {
    x : 10 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*18+1) * box,
    y : Math.floor(Math.random()*18+1) * box
}

// create the score var

var score = "";

//control the snake

let d;

document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 37  && d != "RIGHT" || key == 65 && d != "RIGHT" ){
        left.play();
        d = "LEFT";
    }else if(key == 38 && d != "DOWN" || key == 87 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(key == 39 && d != "LEFT" || key == 68 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(key == 40 && d != "UP" || key == 83 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

// check collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){



    ctx.drawImage(ground,0,0);

    for( let i = 0; i < snake.length ; i++){
        ctx.fillStyle = ( i == 0 )? "green" : "green";
        ctx.fillRect(snake[i].x,snake[i].y,box,box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg, food.x, food.y);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        food = {
            x : Math.floor(Math.random()*18+1) * box,
            y : Math.floor(Math.random()*18+1) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }

    // add new Head

    let newHead = {
        x : snakeX,
        y : snakeY
    }

    // game over

    if(snakeX < box || snakeX > 18 * box || snakeY < 1 * box || snakeY > 18 * box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
        alert(score)
    }

    snake.unshift(newHead);


}

// call draw function every 100 ms

let game = setInterval(draw,10);
