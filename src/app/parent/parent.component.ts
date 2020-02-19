import { Component, OnInit } from '@angular/core';
import { MsqdataService } from '../msqdata.service';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit {
  private data:any;
  public questionData:any;
  public optionData:any;
  public selectedVal:string='';
  public selectedValArr:any=['','','',''];
  public correctAnswer:any;
  public correctTxt:any;
  public incorrectTxt:any;
  public currentId:any;
  div1:boolean=false;
  div2:boolean=false;
  div3:boolean=false;
  div4:boolean=false;
  buttonDisabled:boolean = true;
  disable:boolean=false;
  multipalSelect:boolean=false;
  status: boolean = false;
  
  constructor(private http:MsqdataService) { }

  ngOnInit() {
    //
    console.log(this.http.getConfig());

    this.http.getConfig()

    .subscribe((data: any[])=>{
      this.data = data;
      this.questionData = this.data.question;
      this.optionData = this.data.options;
      this.correctAnswer = this.data.correctAns;
      this.correctTxt = this.data.correctFeedback;
      this.incorrectTxt = this.data.incorrectFeedback;
      console.log(data);
      console.log(this.optionData);
    })  
  }

  onDropdownChange(event) {
    this.buttonDisabled = true;
    let dropDownVal= event.target.value;
    this.selectedValArr=['','','',''];
    this.multipalSelect = false;
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;

    var a = document.getElementsByClassName('radiobtn')
    for(let i=0; i<a.length; i++){
      a[i].classList.remove('radiobtnSelected');
    }

    if(dropDownVal == "Single Select"){
      this.multipalSelect = false;
      for(let i=0; i<a.length; i++){
        a[i].classList.remove('multipalSel');
        a[i].classList.remove('radiobtnSelectedmul');
      }
    }else if(dropDownVal == "Multipal Select"){
      this.multipalSelect = true;
      for(let i=0; i<a.length; i++){
        a[i].classList.add('multipalSel');
      }
    }
  }

  onItemChange(index){
    this.selectedVal = index;
    console.log('value is : ', this.selectedVal);
    this.div4=true;
  }

  onItemChange1(index, event){
    debugger
    this.buttonDisabled = false;
    this.buttonDisabled = null;
    this.div4=true;
    this.currentId = event.toElement.id;
    console.log(this.currentId)
    if(this.multipalSelect == false){
      this.selectedVal = index;
      var a = document.getElementsByClassName('radiobtn')
      for(let i=0; i<a.length; i++){
        a[i].classList.remove('radiobtnSelected');
      }
      document.getElementsByClassName('radiobtn')[index].classList.add("radiobtnSelected");
    }else{
      let shadesEl = document.querySelector('#radiobtn_'+index);
        if (shadesEl.classList.contains('radiobtnSelectedmul')) {
          shadesEl.classList.remove('radiobtnSelectedmul');
          this.selectedValArr[index] = '';
          console.log(this.selectedValArr)
        } else {
          this.selectedValArr[index] = index;
          shadesEl.classList.add('radiobtnSelectedmul');
          console.log(this.selectedValArr)
        }
    }
  }

  onSubmit(){
    this.status = !this.status;
    this.disable = !this.disable;
    this.buttonDisabled = true;
    if(this.div4 == false){
      return;
    }
    this.div1=true;
    if(this.multipalSelect == false){
      if(this.selectedVal == this.correctAnswer){
        this.div2=true;
      }else{
        this.div3=true;
      }
    }else{
      if(JSON.stringify((this.selectedValArr.filter(n => typeof n === 'number')).sort()) == JSON.stringify(this.data.correctAns1.sort())){
        this.div2=true;
        this.selectedValArr=[];
      }else{
        this.div3=true;
      }
    }
  }

  close(){
    this.status = !this.status;
    this.disable = !this.disable;
    this.div1= this.div2= this.div3= this.div4=false;
    this.selectedValArr=['','','',''];
    var a = document.getElementsByClassName('radiobtn')
    for(let i=0; i<a.length; i++){
      a[i].classList.remove('radiobtnSelectedmul');
      a[i].classList.remove('radiobtnSelected');
    }
    //this.multipalSelect = false;
    this.div1 = false;
    this.div2 = false;
    this.div3 = false;
    this.div4 = false;
  }
}
