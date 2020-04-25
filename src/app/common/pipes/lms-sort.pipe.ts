import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lmsSort'
})
export class LmsSortPipe implements PipeTransform {

  transform(input: any[]): any {
    if(input){
      return input.sort((a, b) => {
        let authorName1: string = a.authorName;
        let authorName2: string = b.authorName;
        return authorName1 < authorName2 ? -1: (authorName1 >  authorName2 ? 1 :0);
      });
    }
  }
}