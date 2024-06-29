import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { TagModule } from '../../lib/tag/tag.module';



@NgModule({
  declarations: [
    CardComponent
  ],
  imports: [
    CommonModule,
    TagModule
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }
