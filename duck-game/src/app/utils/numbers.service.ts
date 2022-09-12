import { PixelLocation } from "../classes/location";
import { Pixel } from "../classes/pixel";
import { Repeat } from "../classes/repeat";
import { Color } from "./colors";

export class NumbersService {
    private mapOfRepeats: Map<string, Repeat[]> = new Map();
    private WIDTH = 5;
    private location: PixelLocation;

    constructor(location: PixelLocation) {
        this.location = location;
        this.init();
    }

    public toPixels(score: number): Pixel[] {
        const pixels: Pixel[] = [];
        const repeatsMap = this.split(score)
            .map(digit => this.mapOfRepeats.get(digit))
            .filter(pixelMap => pixelMap);
        let offset = 0;
        repeatsMap.forEach(repeats => {
            if (!repeats) {
                return;
            }
            pixels.push(...this.position(repeats, offset));
            offset++;
        });
        return pixels;
    }


    private split(score: number): string[] {
        return score.toString().split("");
    }

    private init(): void {
        const repeats_one: Repeat[] = [];
        // number 1
        repeats_one.push(new Repeat(3, Color.WATER));
        repeats_one.push(new Repeat(1, Color.WHITE));
        repeats_one.push(new Repeat(1, Color.WATER));
        // line 2
        repeats_one.push(new Repeat(2, Color.WATER));
        repeats_one.push(new Repeat(2, Color.WHITE));
        repeats_one.push(new Repeat(1, Color.WATER));
        // line 3
        repeats_one.push(new Repeat(1, Color.WATER));
        repeats_one.push(new Repeat(1, Color.WHITE));
        repeats_one.push(new Repeat(1, Color.WATER));
        repeats_one.push(new Repeat(1, Color.WHITE));
        repeats_one.push(new Repeat(1, Color.WATER));
        // line 4 - 7
        for (let i = 0; i < 4; i++) {
            repeats_one.push(new Repeat(3, Color.WATER));
            repeats_one.push(new Repeat(1, Color.WHITE));
            repeats_one.push(new Repeat(1, Color.WATER));
        }
        this.mapOfRepeats.set("1", repeats_one);

        // number 2
        const repeats_two: Repeat[] = [];
        repeats_two.push(new Repeat(2, Color.WATER));
        repeats_two.push(new Repeat(2, Color.WHITE));
        repeats_two.push(new Repeat(1, Color.WATER));
        // line 2
        repeats_two.push(new Repeat(1, Color.WATER));
        repeats_two.push(new Repeat(1, Color.WHITE));
        repeats_two.push(new Repeat(2, Color.WATER));
        repeats_two.push(new Repeat(1, Color.WHITE));
        // line 3
        repeats_two.push(new Repeat(4, Color.WATER));
        repeats_two.push(new Repeat(1, Color.WHITE));
        // line 4
        repeats_two.push(new Repeat(3, Color.WATER));
        repeats_two.push(new Repeat(1, Color.WHITE));
        repeats_two.push(new Repeat(1, Color.WATER));
        // line 5
        repeats_two.push(new Repeat(2, Color.WATER));
        repeats_two.push(new Repeat(1, Color.WHITE));
        repeats_two.push(new Repeat(2, Color.WATER));
        // line 6
        repeats_two.push(new Repeat(1, Color.WATER));
        repeats_two.push(new Repeat(1, Color.WHITE));
        repeats_two.push(new Repeat(3, Color.WATER));
        //line 7
        repeats_two.push(new Repeat(1, Color.WATER));
        repeats_two.push(new Repeat(4, Color.WHITE));

        this.mapOfRepeats.set("2", repeats_two);

        //number 3
        const repeats_three: Repeat[] = [];
        repeats_three.push(new Repeat(2, Color.WATER));
        repeats_three.push(new Repeat(2, Color.WHITE));
        repeats_three.push(new Repeat(1, Color.WATER));
        // line 2
        repeats_three.push(new Repeat(1, Color.WATER));
        repeats_three.push(new Repeat(1, Color.WHITE));
        repeats_three.push(new Repeat(2, Color.WATER));
        repeats_three.push(new Repeat(1, Color.WHITE));
        // line 3
        repeats_three.push(new Repeat(4, Color.WATER));
        repeats_three.push(new Repeat(1, Color.WHITE));
        //line 4
        repeats_three.push(new Repeat(2, Color.WATER));
        repeats_three.push(new Repeat(2, Color.WHITE));
        repeats_three.push(new Repeat(1, Color.WATER));
        //line 5
        repeats_three.push(new Repeat(4, Color.WATER));
        repeats_three.push(new Repeat(1, Color.WHITE));
        // line 6
        repeats_three.push(new Repeat(1, Color.WATER));
        repeats_three.push(new Repeat(1, Color.WHITE));
        repeats_three.push(new Repeat(2, Color.WATER));
        repeats_three.push(new Repeat(1, Color.WHITE));
        // line 7
        repeats_three.push(new Repeat(2, Color.WATER));
        repeats_three.push(new Repeat(2, Color.WHITE));
        repeats_three.push(new Repeat(1, Color.WATER));


        this.mapOfRepeats.set("3", repeats_three);

        // number 8
        const repeats_zero: Repeat[] = [];
        repeats_zero.push(new Repeat(2, Color.WATER));
        repeats_zero.push(new Repeat(2, Color.WHITE));
        repeats_zero.push(new Repeat(1, Color.WATER));
        // line 2 - 6
        for (let i = 0; i < 5; i++) {
            repeats_zero.push(new Repeat(1, Color.WATER));
            repeats_zero.push(new Repeat(1, Color.WHITE));
            repeats_zero.push(new Repeat(2, Color.WATER));
            repeats_zero.push(new Repeat(1, Color.WHITE));
        }
        // line 7
        repeats_zero.push(new Repeat(2, Color.WATER));
        repeats_zero.push(new Repeat(2, Color.WHITE));
        repeats_zero.push(new Repeat(1, Color.WATER));


        this.mapOfRepeats.set("0", repeats_zero);

        // number 9
        const repeats_nine: Repeat[] = [];
        repeats_nine.push(new Repeat(2, Color.WATER));
        repeats_nine.push(new Repeat(2, Color.WHITE));
        repeats_nine.push(new Repeat(1, Color.WATER));
        // line 2
        repeats_nine.push(new Repeat(1, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        repeats_nine.push(new Repeat(2, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        // line 3
        repeats_nine.push(new Repeat(1, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        repeats_nine.push(new Repeat(2, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        //line 4
        repeats_nine.push(new Repeat(2, Color.WATER));
        repeats_nine.push(new Repeat(3, Color.WHITE));
        //line 5
        repeats_nine.push(new Repeat(4, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        // line 6
        repeats_nine.push(new Repeat(1, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        repeats_nine.push(new Repeat(2, Color.WATER));
        repeats_nine.push(new Repeat(1, Color.WHITE));
        // line 7
        repeats_nine.push(new Repeat(2, Color.WATER));
        repeats_nine.push(new Repeat(2, Color.WHITE));
        repeats_nine.push(new Repeat(1, Color.WATER));


        this.mapOfRepeats.set("9", repeats_nine);

        // number 8
        const repeats_eigth: Repeat[] = [];
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(2, Color.WHITE));
        repeats_eigth.push(new Repeat(1, Color.WATER));
        // line 2
        repeats_eigth.push(new Repeat(1, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        // line 3
        repeats_eigth.push(new Repeat(1, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        //line 4
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(2, Color.WHITE));
        repeats_eigth.push(new Repeat(1, Color.WATER));
        //line 5
        repeats_eigth.push(new Repeat(1, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        // line 6
        repeats_eigth.push(new Repeat(1, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(1, Color.WHITE));
        // line 7
        repeats_eigth.push(new Repeat(2, Color.WATER));
        repeats_eigth.push(new Repeat(2, Color.WHITE));
        repeats_eigth.push(new Repeat(1, Color.WATER));


        this.mapOfRepeats.set("8", repeats_eigth);


        // number 4
        const repeats_four: Repeat[] = [];
        for (let i = 0; i < 3; i++) {
            repeats_four.push(new Repeat(1, Color.WATER));
            repeats_four.push(new Repeat(1, Color.WHITE));
            repeats_four.push(new Repeat(2, Color.WATER));
            repeats_four.push(new Repeat(1, Color.WHITE));
        }
        // line 2
        repeats_four.push(new Repeat(2, Color.WATER));
        repeats_four.push(new Repeat(3, Color.WHITE));
        // line 3
        for (let i = 0; i < 3; i++) {
            repeats_four.push(new Repeat(4, Color.WATER));
            repeats_four.push(new Repeat(1, Color.WHITE));
        }


        this.mapOfRepeats.set("4", repeats_four);

        // number 5
        const repeats_five: Repeat[] = [];
        repeats_five.push(new Repeat(1, Color.WATER));
        repeats_five.push(new Repeat(4, Color.WHITE));
        // line 2
        repeats_five.push(new Repeat(1, Color.WATER));
        repeats_five.push(new Repeat(1, Color.WHITE));
        repeats_five.push(new Repeat(3, Color.WATER));
        // line 3
        repeats_five.push(new Repeat(1, Color.WATER));
        repeats_five.push(new Repeat(3, Color.WHITE));
        repeats_five.push(new Repeat(1, Color.WATER));
        //line 4
        repeats_five.push(new Repeat(4, Color.WATER));
        repeats_five.push(new Repeat(1, Color.WHITE));
        //line 5
        repeats_five.push(new Repeat(4, Color.WATER));
        repeats_five.push(new Repeat(1, Color.WHITE));
        // line 6
        repeats_five.push(new Repeat(1, Color.WATER));
        repeats_five.push(new Repeat(1, Color.WHITE));
        repeats_five.push(new Repeat(2, Color.WATER));
        repeats_five.push(new Repeat(1, Color.WHITE));
        // line 7
        repeats_five.push(new Repeat(2, Color.WATER));
        repeats_five.push(new Repeat(2, Color.WHITE));
        repeats_five.push(new Repeat(0, Color.WATER));


        this.mapOfRepeats.set("5", repeats_five);

        // number 6
        const repeats_six: Repeat[] = [];
        repeats_six.push(new Repeat(2, Color.WATER));
        repeats_six.push(new Repeat(2, Color.WHITE));
        repeats_six.push(new Repeat(1, Color.WATER));
        // line 2
        repeats_six.push(new Repeat(1, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        repeats_six.push(new Repeat(2, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        // line 3
        repeats_six.push(new Repeat(1, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        repeats_six.push(new Repeat(3, Color.WATER));
        //line 4
        repeats_six.push(new Repeat(1, Color.WATER));
        repeats_six.push(new Repeat(3, Color.WHITE));
        repeats_six.push(new Repeat(1, Color.WATER));
        //line 5
        repeats_six.push(new Repeat(1, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        repeats_six.push(new Repeat(2, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        // line 6
        repeats_six.push(new Repeat(1, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        repeats_six.push(new Repeat(2, Color.WATER));
        repeats_six.push(new Repeat(1, Color.WHITE));
        // line 7
        repeats_six.push(new Repeat(2, Color.WATER));
        repeats_six.push(new Repeat(2, Color.WHITE));
        repeats_six.push(new Repeat(1, Color.WATER));


        this.mapOfRepeats.set("6", repeats_six);

        // number 6
        const repeats_seven: Repeat[] = [];
        repeats_seven.push(new Repeat(1, Color.WATER));
        repeats_seven.push(new Repeat(4, Color.WHITE));
        // line 2
        repeats_seven.push(new Repeat(4, Color.WATER));
        repeats_seven.push(new Repeat(1, Color.WHITE));
        // line 3
        repeats_seven.push(new Repeat(4, Color.WATER));
        repeats_seven.push(new Repeat(1, Color.WHITE));
        //line 4
        repeats_seven.push(new Repeat(3, Color.WATER));
        repeats_seven.push(new Repeat(1, Color.WHITE));
        repeats_seven.push(new Repeat(1, Color.WATER));
        //line 5
        for (let i = 0; i < 3; i++) {
            repeats_seven.push(new Repeat(2, Color.WATER));
            repeats_seven.push(new Repeat(1, Color.WHITE));
            repeats_seven.push(new Repeat(2, Color.WATER));
        }

        this.mapOfRepeats.set("7", repeats_seven);
    }

    private position(repeats: Repeat[], offset: number): Pixel[] {
        const pixels: Pixel[] = [];
        let y = this.location.y;
        let x = this.location.x + offset * this.WIDTH;
        repeats.forEach(repeat => {
            for (let i = 0; i < repeat.count; i++) {
                if (pixels.length == 0) {
                    x = this.location.x + offset * this.WIDTH;
                } else {
                    x = pixels[pixels.length - 1].location.x + 1;
                }
                if (x - (this.location.x + offset * this.WIDTH) >= this.WIDTH) {
                    x = this.location.x + offset * this.WIDTH;
                    y++;
                }

                pixels.push(new Pixel(x, y, repeat.color));
            }
        });
        return pixels;
    }
}