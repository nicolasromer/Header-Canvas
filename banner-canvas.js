/*
    Generating a load of random particles (with gravity)
    */
    
if (document.documentElement.clientWidth > 1000) {
	// scripts

	function ballsDroppin() {
			
		// Initialise an empty canvas and place it on the page
		var canvas = document.getElementById("banner-canvas");
		var context = canvas.getContext("2d");
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight / 3.5;

		// Options to adjust visual style
		var viz = {
			wallWidth: 8
		};


		// Set up object to contain particles and set some default values
		var particles = {},
		  particleIndex = 0,
		  settings = {
			density: 10,
			particleTimer: 150,
			particleSize: 10,
			maxLife: 600,
			startingX: canvas.width / 3,
			startingY: canvas.height,
			gravity: 0.5,
			leftWall: canvas.width * 0.20,
			groundLevel: canvas.height,
			rightWall: canvas.width * 0.80
	
		  };
		  

		  
		

		// Set up a function to create multiple particles
		function Particle() {
		  // Establish starting positions and velocities
		  this.x = this.startingX = settings.startingX * (Math.random() + 1);
		  this.y = this.startingY = settings.startingY * (Math.random() / 1.3);

		  // Determine original X-axis speed based on setting limitation
		  this.vx = Math.random() * 20 - 10;
		  this.vy = Math.random() * 20 - 5;

		  // Add new particle to the index
		  // Object used as it's simpler to manage that an array
		  particleIndex++;
		  particles[particleIndex] = this;
		  this.id = particleIndex;
		  this.life = 0;
		  // vary the ground level for appearance of depth
		  this.depth = settings.groundLevel - (Math.random() * 10 + 5);
		}






		// Some prototype methods for the particle's "draw" function
		Particle.prototype.draw = function() {
		  this.x += this.vx;
		  this.y += this.vy;

		  // Bounce off the ground
		  if ((this.y + settings.particleSize) > this.depth) {
			this.vy *= -0.6;
			this.vx *= 0.75;
			this.y = this.depth - settings.particleSize;
		  }

		  // Determine whether to bounce the particle off a wall
		  if (this.x - (settings.particleSize) <= settings.leftWall) {
			this.vx *= -1;
			this.x = settings.leftWall + (settings.particleSize);
		  }

		  if (this.x + (settings.particleSize) >= settings.rightWall) {
			this.vx *= -1;
			this.x = settings.rightWall - settings.particleSize;
		  }

		  // Adjust for gravity
		  this.vy += settings.gravity;

		  // Age the particle
		  this.life++;

// 		  If Particle is old, it goes in the chamber for renewal
// 		  if (this.life >= settings.maxLife && Math.random() > 0.87) {
// 			delete particles[this.id];
// 		  }
		  
		  // draw wallHole
		  context.beginPath();
		  context.fillStyle = "#ffffff";
		  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
		  context.arc(this.startingX, this.startingY, settings.particleSize, 0, Math.PI * 2, true);
		  context.closePath();
		  context.fill();

		
		  // Create the shapes
		  context.clearRect(settings.leftWall, settings.groundLevel, canvas.width, canvas.height);
		  context.beginPath();
		  context.fillStyle = "#ef4836";
		  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
		  context.arc(this.x, this.y, settings.particleSize, 0, Math.PI * 2, true);
		  context.closePath();
		  context.fill();

		}
		
		
		
		var dropBalls = setInterval(function() {
		  
		  settings.particleTimer -= 1;
		  
		  if (  settings.particleTimer <=  -settings.maxLife ) { 
		  		clearInterval(dropBalls)
		  };
			
			// erase bg
		  context.fillStyle = "#A2DED0";
		  context.fillRect(0, 0, canvas.width, canvas.height);
		  


		  // Draw the particles
		  for (var i = 0; i < settings.density; i++) {
			if (Math.random() > 0.97 && settings.particleTimer >= 0 ) {
			  // Introducing a random chance of creating a particle
			  // corresponding to an chance of 1 per second,
			  // per "density" value
			  new Particle();
				
			}
		  }

		  for (var i in particles) {
			particles[i].draw();
		  }
		  
		//Build walls
		context.fillStyle = "#000000";
		//context.fillRect(settings.leftWall - viz.wallWidth, canvas.height/2 , viz.wallWidth, canvas.height/2);
		context.fillRect(settings.rightWall + viz.wallWidth, canvas.height/2 , viz.wallWidth, canvas.height/2);
		
		context.beginPath();
		context.moveTo(settings.leftWall +5, canvas.height/2);
		context.lineTo(settings.leftWall +5,canvas.height-3);
		context.lineTo(settings.leftWall - 30,canvas.height - 50);
		context.lineTo(60,canvas.height - 50);
		context.strokeStyle="black";
		context.stroke();
		  
		  
		}, 30);	
	
	}
	
	setTimeout(400, ballsDroppin() );
}	

// description fade in
function fadeIn(el, display){
  el.style.opacity = 0;
  el.style.display = display || "block";

  (function fade() {
    var val = parseFloat(el.style.opacity);
    if (!((val += .005) > 1)) {
      el.style.opacity = val;
      requestAnimationFrame(fade);
    }
  })();
}
var el = document.getElementById('fade-in');

setTimeout(600, fadeIn(el, "inline-block") );

	


