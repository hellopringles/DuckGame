import { Color as Color } from "../utils/colors";

export class Repeat{
    count: number;
    color: Color;

    constructor(count: number, color: Color){
        this.count = count;
        this.color = color;
    }
}