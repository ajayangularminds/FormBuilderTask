import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { FormService } from '../form.service';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent {

  arr:any = [];
  options:any =[];

  constructor(private formService:FormService){
    // formService.resetForm.subscribe((data)=>{
    //   if(data){
    //     this.arr=[];
    //     formService.resetForm.next(false);
    //   }
    // })
  }

  @ViewChild('req') selectboxOfReq:any;
  @ViewChild('sel') sel:any;
  @ViewChild('opVal') optionValue:any;

  addFormControlField(){

    let myValue="";
   
    if(this.type==""){
      return alert("Pleas Select Type")
    }

    if(this.dataModelName==""){
      return alert("Pleas add data Modal Name")
    }

    let valArr = [];
    if(this.isRequired){
      valArr.push({required:true})
    }

    if(this.minlength){
      valArr.push({"minlength":this.minlength})
    }

    if(this.maxlength){
      valArr.push({"maxlength":this.maxlength})
    }

    let obj = {
      name:this.name,
      label:this.label,
      type:this.type,
      value:"",
      dataModalName:this.dataModelName,
      options:[],
      validations: valArr,
      file:""
    }

    // if(this.type=="select"){
    //   obj.value = this.options
    // }
  
    if(this.type=='select' || this.type=='radio' || this.type=='checkbox'){
      obj.options = this.options
    }


    this.name="";
    this.type="";
    this.label="";
    this.minlength=undefined;
    this.maxlength=undefined;
    this.isRequired=undefined;

    if(this.selectboxOfReq){
      this.selectboxOfReq.nativeElement.checked = false;
    }

    this.dataModelName="";
    if(this.sel){
      this.sel.nativeElement.value="";
    }
   
    this.formService.addData(obj);
    this.options=[];

  }

  addOption(val:any){
    this.options.push(val);
    this.optionValue.nativeElement.value="";
    console.log(val);
  }
  isRequired:any;

  label:any;
  name:any;
  type:any="";
  dataModelName:any;

  minlength:any;
  maxlength:any;


  addReq(req:any){
    this.isRequired = !this.isRequired;
    //console.log(this.isRequired);
  }

  change(val:any){
    this.type = val
  }

  changeVal(val:any){
    //console.log(val);
    this.type = val
  }

  deleteItem(ind:any){
    this.arr.splice(ind,1);
  }

}
