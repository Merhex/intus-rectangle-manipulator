import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Rectangle } from 'src/app/resize/rectangle.model';

@Injectable()
export class ResizeService {
  constructor(private http: HttpClient) {}
  baseUri: string = environment.apiUrl;

  public saveDimensions(rectangle: Rectangle) {
    return this.http.post(
      this.baseUri + '/resizewindow/dimensions/save',
      rectangle
    );
  }

  public getDimensions() {
    return this.http.get<Rectangle>(this.baseUri + '/resizewindow/dimensions');
  }
}
