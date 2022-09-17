import { Component, ViewChild } from '@angular/core';
import { Duck } from './classes/duck';
import { Heart } from './classes/heart';
import { PixelLocation } from './classes/pixel.location';
import { ClickLocation } from './classes/click.location';
import { Pixel } from './classes/pixel';
import { Color } from './utils/colors';
import { DuckCoordinator } from './utils/duck.coordinator';
import { HeartCoordinator } from './utils/heart.coordinator';
import { NumbersService } from './utils/numbers.service';
import { skip } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild('canvas') canvas: any = null;

    title = 'duck-game';
    ctx: any;
    WIDTH = 750;
    HEIGHT = 750;
    PIXEL_SIZE = 3;
    delay = 3;
    currentFrame = 0
    duckCoordinator: DuckCoordinator = new DuckCoordinator(this.HEIGHT / this.PIXEL_SIZE);
    heartCoordinator: HeartCoordinator = new HeartCoordinator();
    NumbersService: NumbersService = new NumbersService(new PixelLocation(5, 5));
    clicks: ClickLocation[] = [];
    score: number = 0;

    ngAfterViewInit() {
        const savedScore = this.getCookie("SCORE");
        this.score = savedScore ? parseInt(savedScore) : 0;
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
        this.clicks.push(new ClickLocation(clickX, clickY, event.offsetX, event.offsetY));
    }

    private startGame(): void {
        this.drawWater();
        this.addNewDuck();
        this.duckCoordinator.draw((duck: Duck) => this.drawSprite(duck, this.ctx));
        window.requestAnimationFrame(() => this.animate());
    }

    private animate(): void {
        if (this.currentFrame < this.delay) {
            this.currentFrame++;
            window.requestAnimationFrame(() => this.animate());
        } else {
            this.drawWater();
            let ducksPetted = 0;
            this.clicks.forEach(click => {
                const ducksThisPet = this.duckCoordinator.petDuck(click, (location: ClickLocation, duck: Duck) =>  this.onDuck(location, duck));
                ducksPetted = ducksPetted + ducksThisPet;
                if (ducksThisPet > 0) {
                    this.addNewDuck();
                }
                this.heartCoordinator.addHeart(click.x, click.y);
            })
            this.clicks = [];
            this.currentFrame = 0;
            this.duckCoordinator.moveDucks();
            this.duckCoordinator.draw((duck: Duck) => this.drawDuck(duck, this.ctx));
            this.heartCoordinator.beat();
            this.heartCoordinator.draw((heart: Heart) => this.drawSprite(heart, this.ctx));
            window.requestAnimationFrame(() => this.animate());
            this.score = this.score + ducksPetted;
            this.updateScoreDisplay();
            this.randomDuck();
            if (ducksPetted > 0) {
                this.setCookie("SCORE", this.score.toString())
            }
        }
    }

    private updateScoreDisplay(): void {
        this.NumbersService.toPixels(this.score).forEach((pixel: Pixel) => {
            if (pixel.color == Color.WATER) {
                return;
            }
            this.ctx.beginPath();

            this.ctx.rect(pixel.location.x * this.PIXEL_SIZE, pixel.location.y * this.PIXEL_SIZE, this.PIXEL_SIZE, this.PIXEL_SIZE);
            this.ctx.fillStyle = pixel.color;
            this.ctx.fill();
        });;

    }

    private randomDuck(): void {
        if (this.getRandomInt(20) == 1) {
            this.addNewDuck();
        }
    }

    private addNewDuck(): void {
        const facingLeft = this.getRandomInt(2) == 1;
        const xCoordinate = facingLeft ? this.WIDTH / this.PIXEL_SIZE : 0;
        this.duckCoordinator.addDuck(xCoordinate, this.getRandomInt(this.HEIGHT / this.PIXEL_SIZE - 15), facingLeft);
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


    private drawDuck(duck: Duck, ctx: any): void {
        let i = 0;
        let row = -1;
        let collum = -1;
        const cornerX = duck.location.x * this.PIXEL_SIZE;
        const cornerY = duck.location.y * this.PIXEL_SIZE;
        duck.pixels.forEach(pixel => {
            if (i % duck.WIDTH === 0) {
                row++;
                collum = 0;
            }

            const currentX = cornerX + collum * duck.size * this.PIXEL_SIZE;
            const currentY = cornerY + row * duck.size * this.PIXEL_SIZE;
            i++;
            collum++;

            if (pixel.color !== Color.WATER) {
                ctx.beginPath();
                ctx.rect(currentX, currentY, this.PIXEL_SIZE * duck.size, this.PIXEL_SIZE * duck.size);
                ctx.fillStyle = pixel.color;
                ctx.fill();

            }
        });
    }

    private onDuck(click: ClickLocation, duck: Duck): boolean {
        let petted = false;
        let i = 0;
        let row = -1;
        let collum = -1;
        const cornerX = duck.location.x * this.PIXEL_SIZE;
        const cornerY = duck.location.y * this.PIXEL_SIZE;
        duck.pixels.forEach(pixel => {
            if (petted) {
                skip;
            }
            if (i % duck.WIDTH === 0) {
                row++;
                collum = 0;
            }

            const currentX = cornerX + collum * duck.size * this.PIXEL_SIZE;
            const currentY = cornerY + row * duck.size * this.PIXEL_SIZE;

            const currentXMaxim = currentX + this.PIXEL_SIZE * duck.size;
            const currentYMaxim = currentY + this.PIXEL_SIZE * duck.size;
            i++;
            collum++;

            if (pixel.color !== Color.WATER && 
                currentX <= click.xAbsolut && currentXMaxim >= click.xAbsolut &&
                currentY <= click.yAbsolute && currentYMaxim >= click.yAbsolute) {
                petted = true;
            }
        });
        return petted;
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


    private setCookie(name: string, val: string) {
        const date = new Date();
        const value = val;

        // Set it expire in 7 days
        date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

        // Set it
        document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
    }

    private getCookie(name: string) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");

        if (parts.length == 2) {
            return (parts.pop() as any).split(";").shift();
        }
    }
}
