import { Injectable } from "@angular/core";
import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";


//PARA O MODEL
@Injectable()
export class CustomDateAdapter {
  fromModel(value: string): any {
    if (!value) return null;
    let parts = value.split('/');
    return {
      day: +parts[0],
      month: +parts[1],
      year: +parts[2]
    } as NgbDateStruct;
  }

  toModel(
    date: NgbDateStruct
  ): string { // from internal model -> your mode
    return date
      ? ('0' + date.day).slice(-2) +
          '/' +
          ('0' + date.month).slice(-2) +
          '/' +
          date.year 
      : null;
  }
}

//PARA O DATE PICKER
@Injectable()
export class CustomDateParserFormatter {
  parse(value: string): NgbDateStruct {
    if (!value) return null;
    let parts = value.split('/');
    return {
      day: +parts[0],
      month: +parts[1],
      year: +parts[2]
    } as NgbDateStruct;
  }
  format(date: NgbDateStruct): string {
    return date
      ? ('0' + date.day).slice(-2) +  
        '/' +
        ('0' + date.month).slice(-2) +
        '/' +
        date.year 
      : null;
  }
}
