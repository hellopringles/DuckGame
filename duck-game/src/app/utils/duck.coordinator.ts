import { Duck } from "../classes/duck";
import { PixelLocation } from "../classes/location";
import { Color } from "./colors";

export class DuckCoordinator {
   private ducks: Duck[] = [];
   private gridSize: number = 100;

   constructor(gridSize: number){
      this.gridSize = gridSize;
   }

   public addDuck(x: number, y: number, facingLeft = true): void {
      if (this.ducks.length > 100) {
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

   public petDuck(x: number, y: number): number {
      const originalCount = this.ducks.length;
      this.ducks = this.ducks
         .filter(duck => duck.pixels
            .filter(pixel => pixel.color != Color.WATER)
            .findIndex(pixel => pixel.location.x === x && pixel.location.y === y) < 0);
      return originalCount - this.ducks.length;
   }
}