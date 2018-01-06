import {Directive, ElementRef, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appLampDirective]'

})
export class LampDirective implements OnInit {

  protected template: string;

  @Input() set state(_state: boolean) {
    let template = this.template;
    if (_state === true) {
      template = template.replace(/style="/igm, `style="fill: #DCC91F;; `);
    } else {
      template = template.replace(/style="/igm, `style="fill: #44739E; `);
    }
    this.elementRef.nativeElement.innerHTML = template;
  }

  constructor(private elementRef: ElementRef) {
    this.template = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
     style="pointer-events: none; display: block; width: 24px; height: 21px;" class="iron-icon">
    <g class="iron-icon">
        <path d="M12,2A7,7 0 0,0 5,9C5,11.38 6.19,13.47 8,14.74V17A1,1 0 0,0 9,18H15A1,1 0 0,0 16,17V14.74C17.81,13.47
        19,11.38 19,9A7,7 0 0,0 12,2M9,21A1,1 0 0,0 10,22H14A1,1 0 0,0 15,21V20H9V21Z"
              class="iron-icon" style=""></path>
    </g>
</svg>`;

  }

  ngOnInit(): void {

  }

}
