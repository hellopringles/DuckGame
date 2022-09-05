import { Color as Color } from "../utils/colors";
import { Location } from "./location";

export class Pixel{
    location: Location;
    color: Color;

    constructor(x: number, y: number, color: Color){
        this.location = new Location(x, y);
        this.color = color;
    }
}