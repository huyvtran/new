import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chart'
})
export class ChartPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
