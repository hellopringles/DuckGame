import { Pixel } from "../classes/pixel";

export class ResizeService {
    public chonkerize(pixels: Pixel[], width: number): Pixel[] {
        let resizedPixels = this.doubleWidth(this.doubleHeigth(pixels, width));
        return resizedPixels;
    }

    private doubleHeigth(pixels: Pixel[], width: number): Pixel[] {
        const resizedPixels: Pixel[] = [];
        const originalY = pixels[0].location.y;
        let row: Pixel[] = [];
        let interpolatedRow: Pixel[] = [];
        pixels.forEach(pixel => {
            pixel.location.y = pixel.location.y * 2 - originalY;
            row.push(pixel);
            const interpolatedPixel = new Pixel(pixel.location.x, pixel.location.y + 1, pixel.color);
            interpolatedRow.push(interpolatedPixel);
            if (row.length == width) {
                resizedPixels.push(...row);
                resizedPixels.push(...interpolatedRow);
                row = [];
                interpolatedRow = [];
            }
        });
        return resizedPixels;
    }

    private doubleWidth(pixels: Pixel[]): Pixel[] {
        const resizedPixels: Pixel[] = [];
        const originalX = pixels[0].location.x;
        pixels.forEach(pixel => {
            pixel.location.x = pixel.location.x * 2 - originalX;
            resizedPixels.push(pixel);
            const interpolatedPixel = new Pixel(pixel.location.x + 1, pixel.location.y, pixel.color);
            resizedPixels.push(interpolatedPixel);
        });

        return resizedPixels;
    }
}