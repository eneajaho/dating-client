import { transition, trigger } from '@angular/animations';
import { fadeInSteps } from '@shared/animations/fadeIn.animation';

/*export const slideFrom = (side: 'left' | 'right' | 'bottom' | 'top') => {
  return [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%'
      })
    ]),
    query(':enter', [
      style({ [side]: '-100%' })
    ]),
    query(':leave', animateChild()),
    group([
      query(':leave', [
        animate('300ms ease-out', style({ [side]: '100%' }))
      ]),
      query(':enter', [
        animate('300ms ease-out', style({ [side]: '0%' }))
      ])
    ]),
    query(':enter', animateChild()),
  ];
}*/

export const routerAnimation = trigger('routerAnimations', [
  transition('* <=> *', fadeInSteps),
  // transition('* <=> 404', fadeInSteps),
  // transition('Members => Settings', slideFrom('left')),
  // transition('Settings => Members', slideFrom('right')),
]);


