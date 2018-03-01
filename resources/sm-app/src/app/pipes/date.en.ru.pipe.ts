import {DomSanitizer} from '@angular/platform-browser';
import {PipeTransform, Pipe} from '@angular/core';

@Pipe({name: 'dateEnRu'})
export class DateEnRuPipe implements PipeTransform {
  constructor(private sanitized: DomSanitizer) {
  }

  /**
   *
   * @param value
   * @return {string}
   */
  transform(value): string {
    if (value && typeof value === 'string') {
      return value.substr(0, 10).split('-').reverse().join('.') + value.substr(10, 6);
    }
    return value;
  }
}
