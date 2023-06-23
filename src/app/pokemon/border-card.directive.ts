import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[pokeBorderCard]'
})

export class BorderCardDirective {

  private initialColor: string = '#f5f5f5';
  private defaultColor: string = '#4CEED5';
  private defaultHeight: number = 180;
  private initalBackGround: string = '#ffffff';
  private defaultBackGround: string = '#DDF3EF';

  constructor(private el: ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor);
    this.setBackGround(this.initalBackGround);
  }

  @Input('pokeBorderCard') borderColor: string;

  @HostListener('mouseenter') onMouseEnter() {

    // la couleur de la bordure sera celle choisi dans le template ou #E83838 si il n'y a rien dans le template
    this.setBorder(this.borderColor || this.defaultColor );
    this.setBackGround(this.defaultBackGround);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder(this.initialColor);
    this.setBackGround(this.initalBackGround);
  }

  setHeight(height: number) {
    this.el.nativeElement.style.height = `${height}px`;
  }

  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }

  setBackGround(color: string) {
    this.el.nativeElement.style.background = `${color}`;
  }
}
