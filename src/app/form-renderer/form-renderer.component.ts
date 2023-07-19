import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormService } from '../form.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.css']
})
export class FormRendererComponent implements OnChanges {

  arr:any = []
  customArr:any = []

  constructor(private formService:FormService,private http:HttpClient){
    this.arr = this.buildedForm;
    formService.myForm.subscribe((data:any)=>{
      this.customArr.push(data);
    })
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.arr = this.buildedForm;
  }

 @Input('buildedForm') buildedForm:any;

 genderVal:any;

  submit(){
    let obj:any={};
    for(let item of this.customArr){
      //console.log(item.value)
      if(typeof item.value=='string' && item.value.trim() == ""){
        return alert(item.label+" field Is Required")
      }

      for(let val of item.validations){
        if(val.minlength){
          if(item.value.length<val.minlength){
            return alert(item.label+" Minlength Should Be"+val.minlength)
          }
        }

        if(val.maxlength){
          if(item.value.length> val.maxlength){
            return alert(item.label+" Maxlength Should Be"+val.maxlength)
          }
        }
      }


      if(item.validations.includes("minlength")){
        //console.log("Minlength Works")
      }

      if(item.type=="email"){
        if(!this.checkEmail(item.value)){
          return alert("Please Enter Valid Email")
        }
      }

      if(item.type=="number"){
        if(!this.checkMobileNo(item.value)){
          return alert("Please Enter Valid Mobile Number")
        }
      }

      let myobj = {
        [item.dataModalName]:item.value
      }
      Object.assign(obj, myobj);
    }

    this.http.post('https://winter-summer-sceptre.glitch.me/submit',{data:obj}).subscribe((data)=>{
      console.log(data);
      this.formService.myForm.next();
      this.customArr=[];
      alert("Form Submitted Successfully");
    })

  }

  addFile(ind:any,event:any){
      if(this.customArr[ind].value==""){
        this.customArr[ind].value = [];
      }
      this.customArr[ind].value.push(event.target.files);
  }

  checkEmail(email:any){
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
   if(regex.test(email)){
    return true
   };
   return false;
  }

  checkMobileNo(number:any){
    let num = number.toString();
    if(num.length == 10){
      return true;
    }
    return false;
  }

  deleteItem(ind:any){
   this.customArr.splice(ind,1)
  }

  changeVal(ind:any,val:any){
    if( this.customArr[ind].type=='checkbox'){
      if(this.customArr[ind].value==""){
        this.customArr[ind].value = [];
      }

      for(let checkVal of this.customArr[ind].value){
        if(val==checkVal){
          this.customArr[ind].value = this.customArr[ind].value.filter((data:any)=>{return data!=checkVal});
          return
        }
      }
      this.customArr[ind].value.push(val);
      return;
    }

    this.customArr[ind].value=val;
    //console.log(this.customArr[ind].value);
  }

}
