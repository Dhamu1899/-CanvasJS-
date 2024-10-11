document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('bubblesCanvas');
    const ctx = canvas.getContext('2d');
    const hitButton = document.getElementById('hitButton');
    const resetButton = document.getElementById('resetButton');

    let circleX = 100;
    let circleY = 200;
    let circleRadius = 50;
    let circleColor = getRandomColor();

    let arrowX = 500;
    let arrowY = 200;
    let arrowLength = 50;
    let arrowMoving = false;

    function drawCircle() {
        ctx.beginPath();
        ctx.arc(circleX, circleY, circleRadius, 0, 2 * Math.PI);
        ctx.fillStyle = circleColor;
        ctx.fill();
    }

    function drawArrow() {
        ctx.beginPath();
        ctx.moveTo(arrowX, arrowY);
        ctx.lineTo(arrowX - arrowLength, arrowY - 10);
        ctx.lineTo(arrowX - arrowLength, arrowY + 10);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
    }

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }

    function drawScene() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCircle();
        drawArrow();
    }

    function moveArrow() {
        if (arrowMoving) {
            arrowX -= 5;
            if (arrowX - arrowLength <= circleX + circleRadius) {
                arrowMoving = false;
                circleColor = getRandomColor();
            }
            drawScene();
            requestAnimationFrame(moveArrow);
        }
    }

    function hitButtonClick() {
        if (!arrowMoving) {
            arrowMoving = true;
            moveArrow();
        }
    }

    function resetButtonClick() {
        arrowX = 500;
        arrowMoving = false;
        circleColor = getRandomColor();
        drawScene();
    }

    hitButton.addEventListener('click', hitButtonClick);
    resetButton.addEventListener('click', resetButtonClick);

    drawScene();
});
