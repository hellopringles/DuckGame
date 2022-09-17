import { Color } from "../utils/colors";
import { ResizeService } from "../utils/resize.service";
import { PixelLocation } from "./pixel.location";
import { Pixel } from "./pixel";
import { Repeat } from "./repeat";
import { Sprite } from "./sprite";

export class Duck extends Sprite {
    HEIGTH = 10;
    facingLeft: Boolean = true;
    resizeService: ResizeService = new ResizeService();
    gridSize: number;
    hidden: boolean = false;
    surprised_frame = 0;

    constructor(location: PixelLocation, facingLeft = true, gridSize: number) {
        super(location, 2, 11, [], []);
        this.gridSize = gridSize;
        this.repeats = this.casualDuck();
        this.pixels = this.position();
        if (!facingLeft) {
            this.facingLeft = !this.facingLeft;
            this.flip();
        }
    }

    public move(): void {
        if (this.surprised_frame > 0) {
            this.surprised_frame++;
            if (this.surprised_frame > 20) {
                this.hidden = true;
            }
            return;
        }
        this.facingLeft ?
            this.location.x-- :
            this.location.x++;

        this.shouldReverse();
    }

    public surprise(): void {
        if (this.surprised_frame > 0) {
            return;
        }
        this.repeats = this.suprisedDuck();
        this.pixels = this.position();

        this.surprised_frame++;
        if (!this.facingLeft) {
            this.facingLeft = !this.facingLeft;
            this.flip();
        }
    }

    private shouldReverse(): void {
        if (this.location.x < 0|| this.location.x > this.gridSize) {
            this.facingLeft = !this.facingLeft;
            this.flip();
            this.getChonkier();
        }
    }


    private getChonkier(): void {
        this.size = this.size + 1;
    }

    private casualDuck(): Repeat[] {
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
        return repeats;
    }

    private suprisedDuck(): Repeat[] {
        const repeats: Repeat[] = []
        // 1 LINE
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(3, Color.DUCK));
        repeats.push(new Repeat(5, Color.WATER));
        // 2 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(5, Color.DUCK));
        repeats.push(new Repeat(4, Color.WATER));
        // 3 LINE
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(3, Color.PEAK));
        repeats.push(new Repeat(1, Color.DUCK));
        repeats.push(new Repeat(1, Color.EYE));
        repeats.push(new Repeat(1, Color.DUCK));
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(1, Color.DUCK));
        // 4 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(2, Color.PEAK));
        repeats.push(new Repeat(3, Color.DUCK));
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(3, Color.DUCK));
        // 5 LINE
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(7, Color.DUCK));
        repeats.push(new Repeat(1, Color.WATER));
        // 6 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(7, Color.DUCK));
        repeats.push(new Repeat(1, Color.WATER));
        repeats.push(new Repeat(1, Color.DUCK));
        // 7 LINE
        repeats.push(new Repeat(2, Color.WATER));
        repeats.push(new Repeat(9, Color.DUCK));
        // 8 LINE
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(8, Color.DUCK));
        // 9 LINE
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(1, Color.SHADOW));
        repeats.push(new Repeat(6, Color.DUCK));
        repeats.push(new Repeat(1, Color.SHADOW));
        // 10 LINE
        repeats.push(new Repeat(3, Color.WATER));
        repeats.push(new Repeat(7, Color.SHADOW));
        repeats.push(new Repeat(1, Color.WATER));

        return repeats;
    }
}