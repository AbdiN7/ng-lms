import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lmsSort'
})
export class LmsSortPipe implements PipeTransform {

  transform(input: any[]): any {
    if(input){
      return input.sort((a, b) => {
        console.log(a);
        let branchName1: string = a.bookCopyKey.branch.branchName;
        let branchName2: string = b.bookCopyKey.branch.branchName;
        return branchName1 < branchName2 ? -1: (branchName1 >  branchName2 ? 1 :0);
      });
    }
    // if(input){
    //   return input.sort((a, b) => {
    //     let authorName1: string = a.authorName;
    //     let authorName2: string = b.authorName;
    //     return authorName1 < authorName2 ? -1: (authorName1 >  authorName2 ? 1 :0);
    //   });
    // }
  }
}