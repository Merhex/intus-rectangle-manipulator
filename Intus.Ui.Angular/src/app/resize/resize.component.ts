import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ResizeService } from 'src/app/_services/resizer.service';
import { Rectangle } from './rectangle.model';
import { timer } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

enum MouseAction {
  Idle = 0,
  Resize = 1
}

@Component({
  selector: 'app-resize',
  templateUrl: './resize.component.html',
  styleUrls: ['./resize.component.css'],
})
export class ResizeComponent implements OnInit, AfterViewInit {
  @ViewChild('svgRectangle')
  public htmlSvgRectangle!: ElementRef;
  @ViewChild('canvas')
  public canvas!: ElementRef;
  public isLoaded: boolean = false;

  public get rectangle(): Rectangle {
    return this._rectangle;
  }

  public set rectangle(value: Rectangle) {
    if (value.height < this._minHeight) {
      value.height = this._minHeight;
    }
    if (value.width < this._minWidth) {
      value.width = this._minWidth;
    }

    this._rectangle = value;
  }

  private _rectangle: Rectangle = new Rectangle(100, 200, 50, 50);
  private _mouse!: { x: number; y: number };
  private _canvasBounds!: Rectangle;
  private _mouseAction: MouseAction = MouseAction.Idle;
  private _minWidth: number = 50;
  private _minHeight: number = 50;
  private _lastRectanglePosition!: { x: number; y: number };
  private _canvasMargin!: { x: number; y: number };
  private _saveNeeded: boolean = true;

  constructor(
    private resizeService: ResizeService,
    private toastr: ToastrService
  ) {
    this.saveRectangleOnInterval();
    this._saveNeeded = false;
  }

  ngOnInit(): void {
    this.resizeService.getDimensions().subscribe(
      (rect) => {
        this.rectangle = rect;
        this.isLoaded = true;
      },
      () => {
        console.log('Error')
        this.toastr.error('Could not retrieve data.');
      }
    );
  }

  ngAfterViewInit(): void {
    this.setCanvasBounds();
    this.setLastRectanglePosition();

    this._saveNeeded = false;
  }

  public setMouseAction(event: MouseEvent, action: MouseAction) {
    this._mouseAction = action;
  }

  public getPerimiterOfRectangle() {
    return this.rectangle.height * 2 + this.rectangle.width * 2;
  }

  public getAreaOfRectangle() {
    return this.rectangle.height * this.rectangle.width;
  }

  onMouseUp(event: MouseEvent) {
    this._mouseAction = MouseAction.Idle;
    this._saveNeeded = true;
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.setMousePosition(event.clientX, event.clientY);

    switch (this._mouseAction) {
      case MouseAction.Resize: {
        this.resizeRectangle();
        break;
      }
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setCanvasBounds();
  }

  private resizeRectangle() {
    if (!this.isInCanvasBounds()) return;

    const width = this._mouse.x - this._lastRectanglePosition.x;
    const height = this._mouse.y - this._lastRectanglePosition.y;
    const newRectangle = {
      width,
      height,
      x: this.rectangle.x,
      y: this.rectangle.y,
    };

    this.rectangle = newRectangle;
  }

  private isInCanvasBounds(): boolean {
    const totalCanvasWidth =
      this._canvasBounds.width + this._canvasBounds.x - this._canvasMargin.x;
    const totalCanvasHeight =
      this._canvasBounds.height + this._canvasBounds.y - this._canvasMargin.y;

    return (
      this._mouse.x > this._canvasBounds.x &&
      this._mouse.x < totalCanvasWidth &&
      this._mouse.y > this._canvasBounds.y &&
      this._mouse.y < totalCanvasHeight
    );
  }

  private setCanvasBounds() {
    const { x, y, width, height } =
      this.canvas.nativeElement.getBoundingClientRect();
    this._canvasBounds = { x, y, width, height };

    this._canvasBounds = { x, y, width, height };
    this._canvasMargin = {
      x: this._canvasBounds.width * 0.05,
      y: this._canvasBounds.height * 0.05,
    };
  }

  private setLastRectanglePosition() {
    const { x, y } =
      this.htmlSvgRectangle.nativeElement.getBoundingClientRect();
    this._lastRectanglePosition = { x, y };
  }

  private setMousePosition(x: number, y: number) {
    this._mouse = { x, y };
  }

  saveRectangleOnInterval() {
    const source = timer(0, 1500);

    source.subscribe(() => {
      if (this._mouseAction === MouseAction.Idle && this._saveNeeded) {
        this.resizeService.saveDimensions(this.rectangle).subscribe(
          () => {
            this._saveNeeded = false;
            this.toastr.success('Succesfully saved the dimensions.');
          },
          () => {
            this._saveNeeded = false;
            this.toastr.error('Something went wrong during saving.');
          }
        );
      }
    })
  }
}
