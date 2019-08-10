var canvas = document.querySelector('canvas');

canvas.height = innerHeight - 3;
canvas.width = innerWidth - 5;

var c = canvas.getContext('2d');

const colors = ['#2185C5', '#7ECEFD', '#FF7F66'];
var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function (event) {

    mouse.x = event.x;
    mouse.y = event.y;



})



function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function Circle() {


    this.radius = 5+Math.floor((Math.random() * 5));
    this.maxradius = 40;
    this.minradius = this.radius;
    this.x = Math.floor(this.radius + Math.random() * (canvas.width - this.radius * 2));
    this.y = Math.floor(this.radius + Math.random() * (canvas.height - this.radius * 2));
    this.dx = ((Math.random() - 0.5));
    this.dy = ((Math.random() - 0.5));


    this.color = randomColor(colors);


    this.distanceToActivate=80;



    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.fill();

    }


    this.update = function () {


        if (this.x > (canvas.width - this.radius) || (this.x - this.radius) < 0) {
            this.dx *= -1;
            this.color = randomColor(colors);
        }
        if (this.y > (canvas.height - this.radius) || (this.y - this.radius) < 0) {
            this.dy *= -1;
            this.color = randomColor(colors);
        }
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;


        if (((mouse.x - this.x) < this.distanceToActivate && (mouse.x - this.x) > -this.distanceToActivate) && ((mouse.y - this.y) < this.distanceToActivate && (mouse.y - this.y) > -this.distanceToActivate) && this.radius < this.maxradius) {

            this.radius += 1;


        } else if (this.radius > this.minradius) {
            this.radius -= 1;
        }



        this.draw();


    }
}


var circleArray = [];
for (var i = 0; i < 300; i++) {


    circleArray.push(new Circle())
}


function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < circleArray.length; i++) {


        circleArray[i].update();


    }


}

animate();
