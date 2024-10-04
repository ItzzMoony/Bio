console.log("Discord bio site loaded!");

document.addEventListener('DOMContentLoaded', () => {
    const cursor = document.querySelector('.cursor');
    const trails = [];
    const trailCount = 20;

    // Create trails for cursor effect
    for (let i = 0; i < trailCount; i++) {
        const trail = document.createElement('div');
        trail.className = 'trail';
        document.body.appendChild(trail);
        trails.push(trail);
    }

    let currentTrail = 0;
    let isMouseDown = false;

    function updateCursorPosition(e) {
        const x = e.clientX;
        const y = e.clientY;
        cursor.style.left = `${x}px`;
        cursor.style.top = `${y}px`;
        cursor.style.transform = isMouseDown ? 'translate(-50%, -50%) scale(0.8)' : 'translate(-50%, -50%)';

        const trail = trails[currentTrail];
        trail.style.left = `${x}px`;
        trail.style.top = `${y}px`;
        trail.style.opacity = 1;
        trail.style.backgroundColor = isMouseDown ? '#ff8c69' : '#ff6347';
        trail.style.width = `${Math.random() * 10 + 5}px`;
        trail.style.height = `${Math.random() * 10 + 5}px`;

        setTimeout(() => {
            trail.style.opacity = 0;
            trail.style.transform = 'scale(0.5)';
        }, 50);

        currentTrail = (currentTrail + 1) % trailCount;
    }

    document.addEventListener('mousemove', updateCursorPosition);

    document.addEventListener('mousedown', () => {
        isMouseDown = true;
        cursor.classList.add('clicked');
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        cursor.classList.remove('clicked');
    });

    document.querySelectorAll('a, button').forEach(elem => {
        elem.addEventListener('mouseover', () => {
            cursor.classList.add('hover');
        });
        elem.addEventListener('mouseout', () => {
            cursor.classList.remove('hover');
        });
    });

    // Force setting the background immediately on load
    //document.body.style.background = `#0f3460 url('leaves.jpg?${timestamp}') no-repeat center center fixed`;
    document.body.style.backgroundSize = "cover";

    // Setup star canvas for background effect
    const starCanvas = document.getElementById('starCanvas');
    const starCtx = starCanvas.getContext('2d');

    function setupStarCanvas() {
        starCanvas.width = window.innerWidth;
        starCanvas.height = window.innerHeight;
        drawStars(); // Draw stars initially
    }

    const stars = [];
    const starCount = 300;

    class Star {
        constructor() {
            this.x = Math.random() * starCanvas.width;
            this.y = Math.random() * starCanvas.height;
            this.size = Math.random() * 2;
            this.twinkleSpeed = Math.random() * 0.05 + 0.025;
            this.angle = 0;
        }

        twinkle() {
            this.angle += this.twinkleSpeed;
            this.currentSize = this.size * Math.sin(this.angle) + this.size;
        }

        draw() {
            starCtx.fillStyle = 'rgba(255, 255, 255, ' + (0.5 + Math.sin(this.angle) * 0.5) + ')';
            starCtx.beginPath();
            starCtx.arc(this.x, this.y, this.currentSize, 0, Math.PI * 2);
            starCtx.fill();
        }
    }

    function createStars() {
        stars.length = 0; // Clear existing stars
        for (let i = 0; i < starCount; i++) {
            stars.push(new Star());
        }
    }

    function drawStars() {
        starCtx.clearRect(0, 0, starCanvas.width, starCanvas.height);
        stars.forEach(star => {
            star.twinkle();
            star.draw();
        });
    }

    function animateStars() {
        drawStars();
        requestAnimationFrame(animateStars);
    }

    setupStarCanvas();
    createStars();
    animateStars();

    // Setup leaf canvas for falling leaves effect
    const leafCanvas = document.getElementById('leafCanvas');
    const leafCtx = leafCanvas.getContext('2d');

    function setupLeafCanvas() {
        leafCanvas.width = window.innerWidth;
        leafCanvas.height = window.innerHeight;
    }

    const leaves = [];
    const leafColors = ['#ff6347', '#ffa07a', '#ff8c69', '#ffd700'];
    const leafCount = 20;

    class Leaf {
        constructor() {
            this.x = Math.random() * leafCanvas.width;
            this.y = -50;
            this.size = Math.random() * 15 + 10;
            this.speedY = Math.random() * 1 + 0.5;
            this.speedX = Math.random() * 1 - 0.5;
            this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 0.5 - 0.25;
            this.oscillationSpeed = Math.random() * 0.02 + 0.01;
            this.oscillationDistance = Math.random() * 3 + 1;
            this.swingFactor = 0;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.swingFactor) * this.oscillationDistance;
            this.swingFactor += this.oscillationSpeed;
            this.rotation += this.rotationSpeed;

            if (this.y > leafCanvas.height + 50) {
                this.y = -50;
                this.x = Math.random() * leafCanvas.width;
            }
        }

        draw() {
            leafCtx.save();
            leafCtx.translate(this.x, this.y);
            leafCtx.rotate(this.rotation * Math.PI / 180);
            leafCtx.fillStyle = this.color;
            leafCtx.beginPath();
            leafCtx.moveTo(0, -this.size / 2);
            leafCtx.quadraticCurveTo(this.size / 4, -this.size / 2, this.size / 2, 0);
            leafCtx.quadraticCurveTo(this.size / 4, this.size / 2, 0, this.size);
            leafCtx.quadraticCurveTo(-this.size / 4, this.size / 2, -this.size / 2, 0);
            leafCtx.quadraticCurveTo(-this.size / 4, -this.size / 2, 0, -this.size / 2);
            leafCtx.closePath();
            leafCtx.fill();
            leafCtx.restore();
        }
    }

    for (let i = 0; i < leafCount; i++) {
        leaves.push(new Leaf());
    }

    /*function drawLeaves() {
        leafCtx.clearRect(0, 0, leafCanvas.width, leafCanvas.height);
        leaves.forEach(leaf => {
            leaf.update();
            leaf.draw();
        });
    }

    function animateLeaves() {
        drawLeaves();
        requestAnimationFrame(animateLeaves);
    }

    setupLeafCanvas();
    animateLeaves();*/

    // Adjust canvas sizes on window resize
    window.addEventListener('resize', () => {
        setupStarCanvas();
        createStars();
        setupLeafCanvas();
    });
});
