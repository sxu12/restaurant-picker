const restaurants = ["餐厅A", "餐厅B", "餐厅C", "餐厅D", "餐厅E", "餐厅F"];
const wheelCanvas = document.getElementById("wheelCanvas");
const ctx = wheelCanvas.getContext("2d");
const spinButton = document.getElementById("spinButton");
const resultDiv = document.getElementById("result");
const numRestaurants = restaurants.length;
const arcSize = (2 * Math.PI) / numRestaurants;
let startAngle = 0;
let spinTimeout = null;
let spinAngleStart = 10;
let spinTime = 0;
let spinTimeTotal = 0;

function drawWheel() {
    for (let i = 0; i < numRestaurants; i++) {
        const angle = startAngle + i * arcSize;
        ctx.beginPath();
        ctx.arc(250, 250, 200, angle, angle + arcSize, false);
        ctx.lineTo(250, 250);
        ctx.fillStyle = i % 2 === 0 ? "#ffdd00" : "#ffa500";
        ctx.fill();
        ctx.stroke();
        ctx.save();
        ctx.translate(250 + Math.cos(angle + arcSize / 2) * 150, 250 + Math.sin(angle + arcSize / 2) * 150);
        ctx.rotate(angle + arcSize / 2 + Math.PI / 2);
        ctx.fillStyle = "#000";
        ctx.fillText(restaurants[i], -ctx.measureText(restaurants[i]).width / 2, 0);
        ctx.restore();
    }
}

function rotateWheel() {
    startAngle += (spinAngleStart * Math.PI) / 180;
    drawWheel();
    spinTime += 30;
    if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
    } else {
        spinTimeout = setTimeout(rotateWheel, 30);
    }
}

function stopRotateWheel() {
    clearTimeout(spinTimeout);
    const degrees = (startAngle * 180) / Math.PI + 90;
    const arcd = (arcSize * 180) / Math.PI;
    const index = Math.floor((360 - (degrees % 360)) / arcd);
    resultDiv.textContent = `今天去吃: ${restaurants[index]}`;
}

spinButton.addEventListener("click", () => {
    spinTime = 0;
    spinTimeTotal = Math.random() * 1000; // 随机转动时间在2到5秒之间
    rotateWheel();
});

drawWheel();
