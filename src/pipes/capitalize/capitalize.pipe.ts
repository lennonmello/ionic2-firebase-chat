import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string, onlyFirst: boolean) {

    if(onlyFirst)
      return value.charAt(0).toUpperCase() + value.substr(1);
    
    let words: string[] = value.split(' ');
    let outPut: string = '';


    words.forEach((value:string, index:number, words: string[]) =>{
      outPut += value.charAt(0).toUpperCase() + value.substr(1).toLocaleLowerCase() + ' ';
    });

    return outPut;

  }
}
