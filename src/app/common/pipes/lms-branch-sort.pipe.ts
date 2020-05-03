import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'lmsBranchSort'
})
export class LmsBranchSortPipe implements PipeTransform {

  transform(input: any[]): any {
    if(input){
      return input.sort((a, b) => {
        console.log(a);
        let branchName1: string = a.branchName;
        let branchName2: string = b.branchName;
        return branchName1 < branchName2 ? -1: (branchName1 >  branchName2 ? 1 :0);
      });
    }
  }
}
