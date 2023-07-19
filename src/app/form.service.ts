import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  myForm:any = new Subject<any>();

  formArray:any = [];
  resetForm = new BehaviorSubject<boolean>(false);

  constructor() { }

  addData(data:any){
    this.myForm.next(data);
   // console.log(this.myForm.getValue())
  }

  deletData(ind:any){
    let arr:any = [];
    this.myForm.subscribe((data:any)=>{
      arr=data;
    })
    arr.splice(ind,1);
   
    this.myForm.next(arr);
   
  }
}
