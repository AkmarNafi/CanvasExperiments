var canvas = document.querySelector('canvas');

canvas.height = innerHeight - 3;
canvas.width = innerWidth - 5;
const colors = ['#2185C5', '#7ECEFD', '#FF7F66'];
var c = canvas.getContext('2d');


var mouse = {
    x: undefined,
    y: undefined
}
window.addEventListener("mousemove", function (event) {

    mouse.x = event.x;
    mouse.y = event.y;


})


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)]
}

function distance(x1, y1, x2, y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2))
}


function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}


function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
        const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

function randomcolor() {


    let color = randomColor(colors);
    return color;
}

function Circle(x, y, radius) {


    this.radius = radius;
    this.x = x;
    this.y = y;
    this.mass=Math.PI*radius*radius;
    this.velocity={x:((Math.random() - 0.5)*2),y:((Math.random() - 0.5)*2)}
    this.opacity=0;
    this.color = randomcolor();



    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.fillStyle = this.color;
        c.save();
        c.globalAlpha=this.opacity;

        c.fill();
        c.restore();

    }


    this.update = function () {


        if (this.x > (canvas.width - this.radius) || (this.x - this.radius) < 0) {
            this.velocity.x *= -1;
            this.color = randomcolor();
        }
        if (this.y > (canvas.height - this.radius) || (this.y - this.radius) < 0) {
            this.velocity.y *= -1;
            this.color = randomcolor();
        }
        this.x = this.x + this.velocity.x;
        this.y = this.y + this.velocity.y;
        for (let j = 0; j < circleArray.length; j++) {



            if (this === circleArray[j]) {
                continue;

            }

            if (distance(this.x, this.y, circleArray[j].x, circleArray[j].y) < (this.radius+circleArray[j].radius)) {
                resolveCollision(this, circleArray[j])


            }



        }

        if (((mouse.x - this.x) < 100 && (mouse.x - this.x) > -100) && ((mouse.y - this.y) < 100 && (mouse.y - this.y) > -100)) {


            this.opacity+=0.04;
            this.opacity=Math.min(0.8,this.opacity)

        } else if (this.opacity>0) {
            this.opacity-=0.04;
            this.opacity=Math.max(0,this.opacity)

        }


        this.draw();


    }
}


var circleArray = [];
for (let i = 0; i < 120; i++) {


    // var radius =  Math.floor( (5+Math.random() * 20));
    var radius =  15;

    var xnew = Math.floor(radius + (Math.random() * (canvas.width - (2*radius ))));
    var ynew = Math.floor(radius + (Math.random() * (canvas.height -(2*radius ))));


    if (i !== 0) {
        for (let j = 0; j < circleArray.length; j++) {

            console.log("j "+j+" array len "+circleArray.length)

            if (distance(xnew, ynew, circleArray[j].x, circleArray[j].y) < (radius+circleArray[j].radius)) {
                console.log(xnew,ynew,circleArray[j].x, circleArray[j].y,distance(xnew, ynew, circleArray[j].x, circleArray[j].y),circleArray.length)
                xnew = Math.floor(radius + (Math.random() * (canvas.width - (radius * 2))));
                ynew = Math.floor(radius + (Math.random() * (canvas.height - (radius * 2))));

                j = -1;
            }




        }
    }

    circleArray.push(new Circle(xnew, ynew, radius));

}


function animate() {

    requestAnimationFrame(animate);

    c.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (var i = 0; i < circleArray.length; i++) {


        circleArray[i].update();


    }


}

animate();





