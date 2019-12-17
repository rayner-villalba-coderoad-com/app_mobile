import { NgModule } from '@angular/core';
import { ParallaxHeaderDirective } from './parallax-header.directive';
import { SwipeTabDirective } from './swipe-tab.directive';

@NgModule({
  imports: [],
  declarations: [ParallaxHeaderDirective, SwipeTabDirective],
  exports: [ParallaxHeaderDirective, SwipeTabDirective]
})
export class DirectivesModule { }