import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lmsNameSort'
})
export class LmsNameSortPipe implements PipeTransform {

  transform(input: any[]): any {
    if(input){
      return input.sort((a, b) => {
        let title1: string = a.title;
        let title2: string = b.title;
        return title1 < title2 ? -1: (title1 >  title2 ? 1 :0);
      });
    }
  }

}
