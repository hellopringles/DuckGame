import { Component, ViewChild } from '@angular/core';
import { Duck } from './classes/duck';
import { Heart } from './classes/heart';
import { Location } from './classes/location';
import { Pixel } from './classes/pixel';
import { Color } from './utils/colors';
import { DuckCoordinator } from './utils/duck.coordinator';
import { HeartCoordinator } from './utils/heart.coordinator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('canvas') canvas: any = null;

    title = 'duck-game';
    ctx: any;
    WIDTH = 500;
    HEIGHT = 500;
    PIXEL_SIZE = 5;
    duckCoordinator: DuckCoordinator = new DuckCoordinator();
    heartCoordinator: HeartCoordinator = new HeartCoordinator();
    clicks: Location[] = []

    ngAfterViewInit() {
        if (this.canvas == null) {
            console.log('null canvas...')
            return;
        }
        this.canvas.nativeElement.width = this.WIDTH;
        this.canvas.nativeElement.height = this.HEIGHT;
        console.log(this.canvas);

        this.ctx = this.canvas.nativeElement.getContext("2d");
        this.startGame();
    }

    public clickEvent(event: any): void {
        const clickX = Math.round(event.offsetX / this.PIXEL_SIZE);
        const clickY = Math.round(event.offsetY / this.PIXEL_SIZE);
        this.clicks.push(new Location(clickX, clickY));
    }

    private startGame(): void {
        this.drawWater();
        this.addNewDuck();
        this.duckCoordinator.draw((duck: Duck) => this.drawSprite(duck, this.ctx));
        window.requestAnimationFrame(() => this.animate());
    }

    private animate(): void {
        this.drawWater();
        this.clicks.forEach(click => {
            if (this.duckCoordinator.petDuck(click.x, click.y)) {
                this.heartCoordinator.addHeart(click.x, click.y);
                this.addNewDuck();
            } else {
                this.heartCoordinator.addHeart(click.x, click.y);
            }
        })
        this.clicks = [];
        this.duckCoordinator.moveDucks();
        this.duckCoordinator.draw((duck: Duck) => this.drawSprite(duck, this.ctx));
        this.heartCoordinator.beat();
        this.heartCoordinator.draw((heart: Heart) => this.drawSprite(heart, this.ctx));
        window.requestAnimationFrame(() => this.animate());
    }

    private addNewDuck(): void {
        const facingLeft = this.getRandomInt(2) == 1;
        const xCoordinate = facingLeft ? 90 : 11;
        this.duckCoordinator.addDuck(xCoordinate, this.getRandomInt(90), facingLeft);
    }


    private drawWater(): void {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.HEIGHT, this.WIDTH);
        this.ctx.fillStyle = Color.WATER;
        this.ctx.fill();
    }

    private getRandomInt(max: number) {
        return Math.floor(Math.random() * max);
    }


    private drawSprite(sprite: any, ctx: any): void {
        sprite.pixels.forEach((pixel: Pixel) => {
            if (pixel.color == Color.WATER) {
                return;
            }
            ctx.beginPath();

            ctx.rect(pixel.location.x * this.PIXEL_SIZE, pixel.location.y * this.PIXEL_SIZE, this.PIXEL_SIZE, this.PIXEL_SIZE);
            ctx.fillStyle = pixel.color;
            ctx.fill();
        });
    }
}
