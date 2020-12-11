import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[isLoading]'
})
export class LoadingDirective implements OnInit, OnChanges {

  @Input('isLoading') loading?: boolean;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    console.log(this.loading, this.element);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}
