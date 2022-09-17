import { Pixel } from "./pixel";
import { PixelLocation } from "./pixel.location";
import { Repeat } from "./repeat";

export class Sprite{
    pixels: Pixel[] = [];
    repeats: Repeat[];
    location: PixelLocation;
    size: number;
    WIDTH: number;

    constructor(location: PixelLocation, size: number, width: number, pixels: Pixel[], repeats: Repeat[]) {
        this.location = location;
        this.size = size;
        this.WIDTH = width;
        this.pixels = pixels;
        this.repeats = repeats;
    }

    protected position(): Pixel[] {
        const pixels: Pixel[] = [];
        let y = this.location.y;
        let x = this.location.x;
        this.repeats.forEach(repeat => {
            for (let i = 0; i < repeat.count; i++) {
                pixels.push(new Pixel(x, y, repeat.color));
            }
        });
        return pixels;
    }

    protected flip(): void {
        let row = -1;
        let collum = -1;
        for (let i = 0; i < this.pixels.length; i++) {
            if (i % this.WIDTH === 0) {
                row++;
                collum = 0;
            } else {
                collum++;
            }
            if (collum < this.WIDTH / 2) {
                const storedColor = this.pixels[i].color;
                const switchIndex = this.WIDTH * row + (this.WIDTH - collum - 1);
                if (this.pixels[i].color != undefined && this.pixels[switchIndex] != undefined) {
                    this.pixels[i].color = this.pixels[switchIndex].color;
                    this.pixels[switchIndex].color = storedColor;
                } else {
                    console.log('Pixel out of bound; math gone wrong');
                }
            }
        }
    }
}