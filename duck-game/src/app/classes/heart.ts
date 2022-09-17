import { Color } from "../utils/colors";
import { PixelLocation } from "./pixel.location";
import { Pixel } from "./pixel";
import { Repeat } from "./repeat";
import { Sprite } from "./sprite";

export class Heart extends Sprite{
    life = 60;

    constructor(location: PixelLocation) {
        super(location, 1, 5, [], []);
        location.x = location.x - 2;
        location.y = location.y - 2;
        this.repeats = this.define();
        this.pixels = this.position();
    }

    public beat(): boolean {
        this.life--;
        if (this.life % 10 === 0) {
            const locationOffset = this.size == 1 ? 2 : -2;
            this.location.x = this.location.x - locationOffset;
            this.location.y = this.location.y - locationOffset;
            this.size = this.size == 1 ? 2 : 1;
        }
        return this.life > 0;
    }

    private define(): Repeat[] {
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
        return repeats;
    }
}