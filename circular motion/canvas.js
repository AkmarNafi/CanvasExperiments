var canvas = document.querySelector('canvas');

canvas.height = innerHeight ;
canvas.width = innerWidth;

var c = canvas.getContext('2d');
const colors = ['#2185C5', '#7ECEFD', '#FF7F66'];
var mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}
window.addEventListener("mousemove", function (event) {

    mouse.x = event.x;
    mouse.y = event.y;


})


function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function Circle() {


    this.radius = 2 + ((Math.random() * 4));
    this.distanceFromCenter = 50 + Math.random() * 120
    this.centerx = canvas.width / 2;
    this.centery = canvas.height / 2;
    this.x = this.centerx;
    this.y = this.centery;
    this.lastx = this.x;
    this.lasty = this.y;
    this.dx = ((Math.random() - 0.5));
    this.dy = ((Math.random() - 0.5));
    this.radian = Math.random() * Math.PI * 2;

    this.color = randomColor(colors);
    this.lastmouseX = this.x;
    this.lastmouseY = this.y;


    this.draw = function () {
        c.beginPath();
        c.strokeStyle = this.color;
        c.lineWidth = this.radius
        c.moveTo(this.lastx, this.lasty);
        c.lineTo(this.x, this.y);

        c.stroke()
        c.closePath()
    }


    this.update = function () {
        this.lastx = this.x;
        this.lasty = this.y;

        this.lastmouseX += (mouse.x - this.lastmouseX) * 0.04;  //reduce mouse responsivity for a smooth efferct
        this.lastmouseY += (mouse.y - this.lastmouseY) * 0.04;

        this.x = this.lastmouseX + Math.cos(this.radian) * this.distanceFromCenter;
        this.y = this.lastmouseY + Math.sin(this.radian) * this.distanceFromCenter;

        this.radian += 0.05;
        if(this.radian==Math.PI*2)this.radian=0;
        this.draw();


    }
}


var circleArray = [];
for (var i = 0; i < 50; i++) {


    circleArray.push(new Circle())
}


function animate() {

    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(0,0,0,0.04)';

    c.fillRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < circleArray.length; i++) {


        circleArray[i].update();


    }


}

animate();
