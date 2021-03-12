
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
canvas.style.backgroundColor = '#000';

// c.fillStyle = 'rgba(255, 0, 0, 0.3)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0 , 0.3)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.3)';
// c.fillRect(300, 300, 100, 100);
// console.log(canvas);

//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = "#BADA55";
// c.stroke();

// Arc / Circle
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, true);
// c.strokeStyle = 'blue';
// c.stroke();

// var circleNumber = 100;
// var number = Math.round(Math.random()) * 10;
// color = '#' + (0 * 10000000 + Math.random()).toString(16).substr(2, 6);
// console.log(color);




// for (var i = 0; i < circleNumber; i++) {
//         var x = Math.random() * window.innerWidth - 50;
//         var y = Math.random() * window.innerHeight;
//         c.beginPath();
//         c.arc(x, y, 30, 0, Math.PI * 2, true);
//         c.strokeStyle = color;
//         c.fillStyle = color;      
//         c.fill();
//         c.stroke();
//     }

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 40;
//var minRadius = 5;


window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    // console.log(mouse);
})

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.margin = 0;
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
    // console.log(this.color);
    
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
       
}

var circleArray = [];

function init() {

    circleArray = [];
    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5);
        var dy = (Math.random() - 0.5);
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
    console.log(radius);
};


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
        // console.log(circleArray);
    }
}
animate();
init();