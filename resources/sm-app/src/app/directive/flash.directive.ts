import {Directive, ElementRef, OnInit, Input} from '@angular/core';

@Directive({
  selector: '[appFlashDirective]'

})
export class FlashDirective implements OnInit {

  protected template: string;

  @Input() set state(_state: boolean) {
    let template = this.template;
    if (_state === true) {
      template = template.replace(/style="/igm, `style="fill: #96D45E; `);
    } else {
      template = template.replace(/style="/igm, `style="fill: #44739E; `);
    }
    this.elementRef.nativeElement.innerHTML = template;
  }

  constructor(private elementRef: ElementRef) {
    this.template = `<svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"
     style="pointer-events: none; display: block; width: 24px; height: 21px;" class="iron-icon">
    <g class="iron-icon">
               <path style="" class="iron-icon" d="M7,2V13H10V22L17,10H13L17,2H7Z" />
    </g>
</svg>`;

  }

  ngOnInit(): void {

  }

}
