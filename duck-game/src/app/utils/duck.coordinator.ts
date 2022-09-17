import { Duck } from "../classes/duck";
import { PixelLocation } from "../classes/pixel.location";
import { ClickLocation } from "../classes/click.location";
import { Color } from "./colors";

export class DuckCoordinator {
   private ducks: Duck[] = [];
   private gridSize: number = 100;

   constructor(gridSize: number){
      this.gridSize = gridSize;
   }

   public addDuck(x: number, y: number, facingLeft = true): void {
      if (this.ducks.length > 0) {
         return;
      }
      const duckLocation = new PixelLocation(x, y);
      this.ducks.push(new Duck(duckLocation, facingLeft, this.gridSize));
   }

   public draw(drawingFunction: Function): void {
      this.ducks.forEach(duck => drawingFunction(duck));
   }

   public moveDucks(): void {
      this.ducks.forEach(duck => duck.move());
   }

   public petDuck(location: ClickLocation, callback: Function): number {
      const originalCount = this.ducks.length;
      this.ducks = this.ducks
         .filter(duck => !callback(location, duck));
      return originalCount - this.ducks.length;
   }
}