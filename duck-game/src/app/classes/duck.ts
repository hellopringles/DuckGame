import { Color } from "../utils/colors";
import { Location } from "./location";
import { Pixel } from "./pixel";
import { Repeat } from "./repeat";

export class Duck {
    pixels: Pixel[] = [];
    age: number = 1;
    HEIGTH = 10;
    WIDTH = 11;
    repeats: Repeat[] = [];
    facingLeft: Boolean = true;

    constructor(location: Location, facingLeft = true) {
        this.define();
        this.position(location);
        if (!facingLeft) {
            this.flip();
        }
    }

    public move(): void {
        this.facingLeft ?
            this.pixels.forEach(pixel => pixel.location.x--) :
            this.pixels.forEach(pixel => pixel.location.x++);
        this.shouldReverse();
    }

    private shouldReverse(): void {
        if (this.pixels[0].location.x < -11 || this.pixels[0].location.x > 111) {
            this.flip();
        }
    }

    private flip(): void {
        this.facingLeft = !this.facingLeft;
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
                    console.log('Hello World');
                }
            }
        }
    }


    private sliceIntoChunks(arr: any[], chunkSize: number) {
        const res = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            const chunk = arr.slice(i, i + chunkSize);
            res.push(chunk);
        }
        return res;
    }

    private position(location: Location): void {
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

    private define(): void {
        const repeats: Repeat[] = []
        // 1 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(3, Color.DUCK));
        repeats.push(new Repeat(6, Color.WATER));
        // 2 LINE
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(5, Color.DUCK));
        repeats.push(new Repeat(5, Color.WATER));
        // 3 LINE
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(2, Color.PEAK));
        repeats.push(new Repeat(1, Color.DUCK));
        repeats.push(new Repeat(1, Color.EYE));
        repeats.push(new Repeat(1, Color.DUCK));
        repeats.push(new Repeat(5, Color.WATER));
        // 4 LINE
        repeats.push(new Repeat(3, Color.PEAK));
        repeats.push(new Repeat(3, Color.DUCK));
        repeats.push(new Repeat(4, Color.WATER));
        repeats.push(new Repeat(1, Color.DUCK));
        // 5 LINE
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(5, Color.DUCK));
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(3, Color.DUCK));
        // 6 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(9, Color.DUCK));
        // 7 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(9, Color.DUCK));
        // 8 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(9, Color.DUCK));
        // 9 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(1, Color.SHADOW));
        repeats.push(new Repeat(7, Color.DUCK));
        repeats.push(new Repeat(1, Color.SHADOW));
        // 10 LINE
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(7, Color.SHADOW));
        repeats.push(new Repeat(1, Color.WATER));
        this.repeats = repeats;
    }
}