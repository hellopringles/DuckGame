import { Color } from "../utils/colors";
import { PixelLocation } from "./pixel.location";
import { Pixel } from "./pixel";
import { Repeat } from "./repeat";

export class Heart {
    pixels: Pixel[] = [];
    WIDTH: number = 5;
    repeats: Repeat[] = [];
    life = 60;

    constructor(location: PixelLocation) {
        location.x = location.x - 2;
        location.y = location.y - 2;
        this.define();
        this.position(location)
    }

    private position(location: PixelLocation): void {
        let y = location.y;
        let x = location.x;
        this.repeats.forEach(repeat => {
            for (let i = 0; i < repeat.count; i++) {
                if (this.pixels.length == 0) {
                    x = location.x;
                } else {
                    x = this.pixels[this.pixels.length - 1].location.x + 1;
                }
                if (x - location.x >= this.WIDTH) {
                    x = location.x;
                    y++;
                }

                this.pixels.push(new Pixel(x, y, repeat.color));
            }
        });
    }

    public beat(): boolean {
        this.life--;
        return this.life > 0;
    }

    private define(): void {
        const repeats: Repeat[] = []
        // 1 LINE
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(1, Color.HEART));
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(1, Color.HEART));
        repeats.push(new Repeat(1, Color.WATER));
        // 2 LINE
        repeats.push(new Repeat(5, Color.HEART));
        // 3 LINE
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(3, Color.HEART));
        repeats.push(new Repeat(1, Color.WATER));
        // 4 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(1, Color.HEART));
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(1, Color.WATER));
        this.repeats = repeats;
    }
}