$(document).ready(function(){

    $(".card button").on("click", function(e) {
        openCardModal(e.target)
    });

    $(".card-modal button").on("click", function() {
        closeCardModal($("#card-modal-meal").text());
    });

    $(".collapsible-link").on("click", function(event) {
        expand(this);
    });

    $("#run-button").on("click", function() {
        $("#run-button").addClass("hidden");
        lcdGame.start();
        this.disabled = true;
    });

})

// Card modal

function openCardModal(card){
    var title = card.getAttribute("id");
    $("#card-modal").removeClass("invisible");
    $("#card-modal-meal").text(title);
    $("#card-modal-close").trigger("focus");
}

function closeCardModal(name){
    var id = "#" + name;
    $(id).trigger("focus");
    $("#card-modal").addClass("invisible");
}

// Collapsible sections

function expand(funny) {
    var expand = funny.nextElementSibling;
    var symbol = funny.firstElementChild;
    if (expand.style.display === 'none') {
        expand.style.display = 'block';
        symbol.innerHTML = '-';
      } else {
        expand.style.display = 'none';
        symbol.innerHTML = '+';
      }
    var isExpanded = funny.getAttribute("aria-expanded") == "true" ? "false" : "true";
    funny.setAttribute("aria-expanded", isExpanded);
}

// LCD Game

const width = 480;
const height = 320;

var lcdGame = {
    canvas : null,
    start : function() {
        this.score = 0;
        this.misses = 0;
        this.speed = 50;
        this.spawnInterval = 50;
        this.paraSpeed = 10;
        this.updateCount = 0;
        this.parachuters = [];
        this.isGameOver = false;
        this.canvas = document.getElementById("LCD");
        document.getElementById("leftButton").addEventListener("click", leftHandler, false);
        document.getElementById("rightButton").addEventListener("click", rightHandler, false);
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(update, this.speed);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    width: 480,
    height: 320,
    score: 0,
    misses: 0,
    speed: 50,
    spawnInterval: 50,
    speedInterval: 250,
    paraSpeed: 10,
    minSpawnInterval: 10,
    minParaSpeed: 2,
    updateCount: 0,
    parachuters: [],
    isGameOver: false,
    boatPos: [40, width / 2 - 75 / 2, width - 115],
    paraPos: [80, width / 2, width - 75]
}

var boat = {
    pos: lcdGame.boatPos[0],
    frame: 0,
    update: function(){
        var img = new Image();
        img.src = this.frame ? "img/boat1.png" : "img/boat2.png";
        lcdGame.context.drawImage(img, this.pos - 10, lcdGame.height - img.height);
    }
}

var heli = {
    frame: 0,
    speed: 2,
    update: function(){
        var img = new Image();
        img.src = this.frame ? "img/heli1.png" : "img/heli2.png";
        if (lcdGame.updateCount % this.speed == 0)
            this.frame = this.frame == 0 ? 1 : 0; 
        lcdGame.context.drawImage(img, lcdGame.width - img.width, 0);
    }
};

class Parachute {
    constructor(pos, spd) {
        this.yOffset = 40;
        this.position = pos;
        this.x = lcdGame.paraPos[pos];
        this.y = 10;
        this.speed = spd;
        this.height = 0;
        this.landed = false;
        this.updateCount = 0;
        this.frame = 0;
        this.xOffsetsGroup = [[0,15,40,70,100,140,180], [0,5,10,20,40,60], [0,0,-5,-10,-20]];
        this.xOffsets = this.xOffsetsGroup[this.position];
        switch (pos){
            case 0: this.height = 8; break;
            case 1: this.height = 7; break;
            case 2: this.height = 6; break;
        }
    }

    update(){
        if (this.updateCount % this.speed == 0){
            this.height = this.height - 1;
            this.frame = this.frame == 0 ? 1 : 0;
        }
        this.y = lcdGame.height - (this.yOffset * this.height);
        this.x = lcdGame.paraPos[this.position] + this.xOffsets[this.height - 1];
        if (this.height == 0 && !this.landed){
            // check for boat
            var boatPos = lcdGame.boatPos.indexOf(boat.pos);
            if (this.position == boatPos){
                lcdGame.score++;
            }
            else{
                lcdGame.misses++;
                if (lcdGame.misses >= 3)
                    lcdGame.isGameOver = true;
            }
            this.landed = true;
        }
        else if (!this.landed){
            // draw
            var img = new Image();
            img.src = this.frame ? "img/para1.png" : "img/para2.png";
            lcdGame.context.drawImage(img, this.x - img.width / 2, this.y  - img.height / 2);
        }
        this.updateCount++;
        if (lcdGame.isGameOver){
            gameover();
        }
    }
}

function drawScore() {
    var ctx = lcdGame.context;
    var spd = 10 - lcdGame.paraSpeed;
    var missImg = new Image();
    missImg.src = "img/miss.png";
    ctx.textAlign = "left";
    ctx.font = "24px Digital7";
    ctx.fillStyle = "black";
    ctx.fillText(`Score: ${lcdGame.score}`, 8, 20);
    ctx.fillText(`Speed: ${spd}`, 8, 40);
    ctx.fillText(`Miss: ${lcdGame.misses}/3`, 8, 60);
    for (var i = 0; i < lcdGame.misses; i++){
        lcdGame.context.drawImage(missImg, 8 + i * missImg.width, 70);
    }
}

function update() {
    lcdGame.clear();

    const bgImage = new Image(width, height);
    bgImage.src = "img/boatgamebg.png";
    lcdGame.context.drawImage(bgImage, 0, 0);

    boat.update();
    heli.update();
    drawScore();

    if (lcdGame.updateCount % lcdGame.spawnInterval == 0){
        // create a parachuter
        var randomPos = Math.floor(Math.random() * 3)
        var para = new Parachute(randomPos, lcdGame.paraSpeed);
        lcdGame.parachuters.push(para);
    }

    for (i in lcdGame.parachuters){
        if (lcdGame.isGameOver)
            return;
        para = lcdGame.parachuters[i];
        if (!para.landed)
            para.update();
    }

    if (lcdGame.updateCount % lcdGame.speedInterval == 0 && lcdGame.updateCount != 0){
        // speed up
        if (lcdGame.spawnInterval > lcdGame.minSpawnInterval)
            lcdGame.spawnInterval -= 5;
        if (lcdGame.paraSpeed > lcdGame.minParaSpeed)
            lcdGame.paraSpeed -= 1;
    }

    if (rightPressed) {
        var index = lcdGame.boatPos.indexOf(boat.pos);
        if (index < lcdGame.boatPos.length - 1){
            boat.pos = lcdGame.boatPos[index + 1];
            boat.frame = boat.frame ? 0 : 1;
        }
        rightPressed = false;
    } else if (leftPressed) {
        index = lcdGame.boatPos.indexOf(boat.pos);
        if (index > 0){
            boat.pos = lcdGame.boatPos[index - 1];
            boat.frame = boat.frame ? 0 : 1;
        }
        leftPressed = false;
    }
    lcdGame.updateCount++;
}

let rightPressed = false;
let leftPressed = false;

function leftHandler(e) {
    if (e.type = "click")
        leftPressed = true;
    else
        leftPressed = false;
}

function rightHandler(e) {
    if (e.type = "click")
        rightPressed = true;
    else
        rightPressed = false;
}

function gameover(){
    var ctx = lcdGame.context;
    var runButton = document.getElementById("run-button");
    lcdGame.stop();
    lcdGame.clear();
    ctx.font = "36px Digital7";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(`GAME OVER`, width / 2, height / 2 + 10);
    drawScore();
    setTimeout(enableButton, 2000);
    runButton.classList.remove("hidden");
    runButton.innerText = "Play again";
}

function enableButton(){
    var runButton = document.getElementById("run-button");
    runButton.disabled = false;
}