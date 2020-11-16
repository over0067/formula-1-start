class Car {
    constructor(name, xPosition, yPosition, colour) {
        this._name = name;
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._distance = 0;
        this.colour = colour;
        this.image = this.loadNewImage(`./assets/img/${this.colour}-racing-car.png`);
        console.log(this.image);
    }
    set distance(dist) {
        this._distance = dist;
    }
    get distance() {
        return this._distance;
    }
    get xPosition() {
        return this._xPosition;
    }
    get yPosition() {
        return this._yPosition;
    }
    get name() {
        return this._name;
    }
    draw(ctx) {
        console.log("in car draw");
        ctx.drawImage(this.image, this._xPosition, this._yPosition);
    }
    loadNewImage(source) {
        const img = new Image();
        img.src = source;
        return img;
    }
}
class KeyboardListener {
    constructor() {
        this.keyDown = (ev) => {
            this.keyCodeStates[ev.keyCode] = true;
        };
        this.keyUp = (ev) => {
            this.keyCodeStates[ev.keyCode] = false;
        };
        this.keyCodeStates = new Array();
        window.addEventListener("keydown", this.keyDown);
        window.addEventListener("keyup", this.keyUp);
    }
    isKeyDown(keyCode) {
        return this.keyCodeStates[keyCode] === true;
    }
}
KeyboardListener.KEY_SPACE = 32;
KeyboardListener.KEY_LEFT = 37;
KeyboardListener.KEY_UP = 38;
KeyboardListener.KEY_RIGHT = 39;
KeyboardListener.KEY_DOWN = 40;
KeyboardListener.KEY_R = 82;
class Game {
    constructor(canvas) {
        this.loop = () => {
            if (this.gameState === "begin") {
                this.writeTextToCanvas("stuk text", 50, this.canvas.width / 2, 60);
                this.draw();
                if (this.keyboardListener.isKeyDown(82)) {
                    console.log("r is pressed");
                    this.gameState = "dice";
                }
            }
            else if (this.gameState === "dice") {
                console.log("in dice");
                this.writeTextToCanvas("stuk text", 20, 200, 50);
            }
            else if (this.gameState === "end") {
                console.log("in the end");
            }
            requestAnimationFrame(this.loop);
        };
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.keyboardListener = new KeyboardListener();
        this.gameState = "begin";
        this.CarRedBull = new Car("Max Verstappen", 100, 60, "red");
        this.CarMercedes = new Car("Louise Hamilton", 100, 260, "zilver");
        this.loop();
    }
    rollDice() {
        return this.randomNumber(1, 6);
    }
    draw() {
        this.CarRedBull.draw(this.ctx);
        this.CarMercedes.draw(this.ctx);
    }
    writeTextToCanvas(text, fontSize = 20, xCoordinate, yCoordinate, alignment = "center", color = "red") {
        this.ctx.font = `${fontSize}px Minecraft`;
        this.ctx.fillStyle = color;
        this.ctx.textAlign = alignment;
        this.ctx.fillText(text, xCoordinate, yCoordinate);
    }
    randomNumber(min, max) {
        return Math.round(Math.random() * (max - min) + min);
    }
}
let init = () => new Game(document.getElementById("canvas"));
window.addEventListener("load", init);
//# sourceMappingURL=app.js.map