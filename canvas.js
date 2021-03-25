'use strict';
window.onload = function () {
    init();
    window.addEventListener('resize', init, false)
}

let canvas = document.getElementById('canvas');
let c = canvas.getContext('2d');

function init() {
    
    canvas.style.backgroundColor = '#000';  
    canvas.width = innerWidth - 5;
    canvas.height = innerHeight - 6;
    canvas.style.margin = 0;

    circleArray = [];
    for (let i = 0; i < 800; i++) {
        let radius = Math.random() * 3 + 1;
        let x = Math.random() * (innerWidth - radius * 2) + radius;
        let y = Math.random() * (innerHeight - radius * 2) + radius;
        let dx = (Math.random() - 0.5);
        let dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
    // console.log(radius);
};

let mouse = {
    x: undefined,
    y: undefined
}

let maxRadius = 50;
//let minRadius = 5;

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
});

function Circle(x, y, dx , dy, radius, minRadius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = '#' + (0 * 10000000 + Math.random()).toString(16).substr(2, 6);
    // console.log(this.radius);
    
    this.draw = function () {
        c.beginPath();
        c.arc(this.x ,this.y ,  this.radius, 0, Math.PI * 2, true);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
            this.x += this.dx;
            this.y += this.dy;
    

            // Interactivity
            if (mouse.x - this.x < 80 && mouse.x - this.x > -80
                && mouse.y - this.y < 100 && mouse.y - this.y > -100) {
                if (this.radius < maxRadius) {
                    this.radius += 2;
                }
            } else if (this.radius > this.minRadius) {
                this.radius -= 1;
            }
            this.draw();
        }  
};

let circleArray = [];

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        // console.log(circleArray);
    }
}
animate();

