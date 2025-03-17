const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.particles = [];
        for (let i = 0; i < 30; i++) {
            this.particles.push(new Particle(this.x, this.y, this.color));
        }
    }

    draw() {
        this.particles.forEach(particle => particle.update());
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.size = Math.random() * 5 + 2;
        this.velocityX = (Math.random() - 0.5) * 6;
        this.velocityY = (Math.random() - 0.5) * 6;
        this.alpha = 1;
    }

    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.alpha -= 0.02;
        if (this.alpha > 0) {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

let fireworks = [];

function launchFireworks() {
    setInterval(() => {
        fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height));
    }, 500);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks.forEach(firework => firework.draw());
    requestAnimationFrame(animate);
}

animate();

