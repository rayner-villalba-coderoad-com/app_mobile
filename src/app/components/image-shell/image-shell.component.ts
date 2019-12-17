import { Component, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { ImageLoaderService } from './image-loader.service';

export interface ImageAttribute {
  element: string;
  value: string;
}

@Component({
  selector: 'app-image-shell',
  templateUrl: './image-shell.component.html',
  styleUrls: [
    './image-shell.component.scss'
  ]
})
export class ImageShellComponent {
  _src = '';
  _alt = '';

  @HostBinding('class.img-loaded') imageLoaded = false;

  @Input()
  set src(val: string) {
    this._src = (val !== undefined && val !== null) ? `${val}` : '';
    this.updateImage(this._src);
  }

  @Input()
  set alt(val: string) {
    this._alt = (val !== undefined && val !== null) ? val : '';
  }
  @Input() imgAttributes: ImageAttribute[] = [];
  @Input() fallbackUrl: string;
  element: HTMLElement;

  constructor(
    private _element: ElementRef,
    private renderer: Renderer2,
    private imageLoader: ImageLoaderService) { }

  _imageLoaded() {
    this.imageLoaded = true;
  }

  _errorImageLoaded() {
    this._src = this.fallbackUrl;
    this.imageLoaded = true;
  }

  private updateImage(imageUrl: string) {
    this.imageLoader
      .getImagePath(imageUrl)
      .then((url: string) => {
        this.setImage(url);
      }).catch((error: any) => {
        this.setImage(this.fallbackUrl || imageUrl);
      });
  }

  private setImage(imageUrl: string) {
      if (!this.element) {
        // create img element if we dont have one
        this.element = this.renderer.createElement('img');
        this.renderer.appendChild(this._element.nativeElement, this.element);
      }

      this.renderer.listen(this.element, 'load', () => {
        this.imageLoaded = true;
      });

      // set it's src
      this.renderer.setAttribute(this.element, 'src', imageUrl);

      // if imgAttributes are defined, add them to our img element
      this.imgAttributes.forEach((attribute) => {
        this.renderer.setAttribute(this.element, attribute.element, attribute.value);
      });

      if (this.fallbackUrl && !this.imageLoader.nativeAvailable) {
        this.renderer.listen(this.element, 'error', () =>
          this.renderer.setAttribute(this.element, 'src', this.fallbackUrl),
        );
      }
  }
}
