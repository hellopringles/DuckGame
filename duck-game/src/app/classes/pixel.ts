import { Color as Color } from "../utils/colors";
import { PixelLocation } from "./location";

export class Pixel{
    location: PixelLocation;
    color: Color;

    constructor(x: number, y: number, color: Color){
        this.location = new PixelLocation(x, y);
        this.color = color;
    }
}