import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { HeaderModule } from '../shared/components/header/header.module';
import { InputTextModule } from '../shared/lib/input-text/input-text.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from '../shared/components/card/card.module';
import { CardlistService } from './services/cardlist.service';


@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    HeaderModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule
  ],
  providers: [
    CardlistService
  ]
})
export class MainModule { }
