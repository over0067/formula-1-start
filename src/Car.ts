class Car {
    // Class attributes
    private image:HTMLImageElement;
    private _name:string;
    private _distance:number;
    private _xPosition:number;
    private _yPosition:number;
    private colour:string

    constructor(name:string, xPosition:number, yPosition:number, colour:string) {
        this._name = name;
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._distance = 0;
        this.colour = colour;
        this.image = this.loadNewImage(`./assets/img/${this.colour}-racing-car.png`);
        console.log(this.image);
    }
    //Class methods

    public set distance(dist : number) {
        this._distance = dist;
    }
    
    public get distance() : number {
        return this._distance;
    }
    
    public get xPosition() : number {
        return this._xPosition
    }
    
    public get yPosition() : number {
        return this._yPosition
    }
    
    
    public get name() : string {
        return this._name
    }
   //ctx:CanvasRenderingContext2D
    public draw(ctx:CanvasRenderingContext2D) {
        console.log("in car draw")
        ctx.drawImage(this.image,this._xPosition,this._yPosition)
    }

    /**
    * Method to load an image
    * @param {HTMLImageElement} source
    * @return HTMLImageElement - returns an image
    */
    private loadNewImage(source: string): HTMLImageElement {
        const img = new Image();
        img.src = source;
        return img;
    }
}