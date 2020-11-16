/// <reference path="Car.ts" />
/// <reference path="KeyboardListener.ts" />

class Game {
  // Necessary canvas attributes
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;

  // KeyboardListener so the player can move
  private keyboardListener: KeyboardListener;

  // the state of the game: begin, dice and end
  private gameState: string;
  private winner: string;

  // Car that the player uses
  private CarRedBull:Car;
  private CarMercedes:Car;

  constructor(canvas: HTMLCanvasElement) {
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

  /**
   * Function to give a number between 1 and 6
   * @returns {number} number - number between 1 and 6
   */
  private rollDice(): number {
    return this.randomNumber(1, 6);
  }

  /**
   * Method for the Game Loop
   * Based on the game state some actions have to be executed
   */
  private loop = () => {
    if (this.gameState === "begin"){
    
    this.writeTextToCanvas("stuk text",50,this.canvas.width/2,60)
    this.draw();
     if (this.keyboardListener.isKeyDown(82)) {
      console.log("r is pressed")
      this.gameState = "dice"
     }
    }else if (this.gameState === "dice") {
      console.log("in dice")
      this.writeTextToCanvas("stuk text",20,200,50)
    }else if (this.gameState === "end") {
      console.log("in the end")
    }
    requestAnimationFrame(this.loop);
  };

  /**
   * Function to draw all the cars on the canvas
   */
  private draw() {
    this.CarRedBull.draw(this.ctx);
    this.CarMercedes.draw(this.ctx);
  }
  
  /**
   * Writes text to the canvas
   * @param {string} text - Text to write
   * @param {number} fontSize - Font size in pixels
   * @param {number} xCoordinate - Horizontal coordinate in pixels
   * @param {number} yCoordinate - Vertical coordinate in pixels
   * @param {string} alignment - Where to align the text
   * @param {string} color - The color of the text
   */
  public writeTextToCanvas(
    text: string,
    fontSize: number = 20,
    xCoordinate: number,
    yCoordinate: number,
    alignment: CanvasTextAlign = "center",
    color: string = "red"
  ) {
    this.ctx.font = `${fontSize}px Minecraft`;
    this.ctx.fillStyle = color;
    this.ctx.textAlign = alignment;
    this.ctx.fillText(text, xCoordinate, yCoordinate);
  }
  /**
   * Renders a random number between min and max
   * @param {number} min - minimal time
   * @param {number} max - maximal time
   */
  public randomNumber(min: number, max: number): number {
    return Math.round(Math.random() * (max - min) + min);
  }
}

/**
 * Start the game whenever the entire DOM is loaded
 */
let init = () =>
  new Game(document.getElementById("canvas") as HTMLCanvasElement);

// Add EventListener to load the game whenever the browser is ready
window.addEventListener("load", init);
