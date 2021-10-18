import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formely-button',
  templateUrl: './formely-button.component.html',
  styleUrls: ['./formely-button.component.scss']
})
export class FormelyButtonComponent  extends FieldType {

  clickButton(){
    this.field.templateOptions?.click;
  }

}
