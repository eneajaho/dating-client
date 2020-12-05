import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export const fadeInSteps = [
  style({
    opacity: 0,
    // transform: 'translateY(-10px)'
  }),
  // animate(1000)
  animate('500ms ease-in')
];

export const fadeIdAnimation = trigger('fadeIn', [
  // transition('void => *', [
  transition(':enter', fadeInSteps)
]);

