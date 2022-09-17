import { Heart } from "../classes/heart";
import { PixelLocation } from "../classes/pixel.location";

export class HeartCoordinator {
    private hearts: Heart[] = []

    public addHeart(x: number, y: number): void {
        const location = new PixelLocation(x, y);
        this.hearts.push(new Heart(location));
    }

    public beat(): void {
        this.hearts = this.hearts.filter(heart => heart.beat());
    }

    public draw(drawingFunction: Function): void {
        this.hearts.forEach(duck => drawingFunction(duck));
    }
}