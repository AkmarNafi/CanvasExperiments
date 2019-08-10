var canvas = document.querySelector('canvas');

canvas.height = innerHeight - 23;
canvas.width = innerWidth - 5;

var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function (event) {

    mouse.x = event.x;
    mouse.y = event.y;



})


function randomcolor() {

    var red = Math.floor(Math.random() * 255);
    var green = Math.floor(Math.random() * 255);
    var blue = Math.floor(Math.random() * 255);
    var alpha = (Math.random());
    var color = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
    return color
}

function Circle() {


    this.radius = 30;

    this.x = Math.floor(this.radius + Math.random() * (canvas.width - this.radius * 2));
    this.y = Math.floor(this.radius + Math.random() * (canvas.height - this.radius * 2));
    this.dx = 0;
    this.dy = 0;


    this.red = Math.floor(Math.random() * 255);
    this.green = Math.floor(Math.random() * 255);
    this.blue = Math.floor(Math.random() * 255);
    this.alpha = 0.4+(Math.random())*0.4;

    this.color = "rgba(" + this.red + "," + this.green + "," + this.blue + "," + this.alpha + ")";

    this.friction=0.9;


    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();

    }


    this.update = function () {




        if (this.y+ this.radius > (canvas.height-10) || (this.y - this.radius) < 0) {
            this.dy *= -1*this.friction;

        }
        else{


            this.dy+=1;
        }

        this.y = this.y + this.dy;



        this.draw();


    }
}


var circleArray = [];
for (var i = 0; i < 10; i++) {


    circleArray.push(new Circle())
}


function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < circleArray.length; i++) {


        circleArray[i].update();


    }


}

animate();
