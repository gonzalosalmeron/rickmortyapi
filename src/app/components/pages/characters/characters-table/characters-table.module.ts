import { BadgeModule } from 'primeng/badge';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharactersTableRoutingModule } from './characters-table-routing.module';
import { CharactersTableComponent } from './characters-table.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';





@NgModule({
  declarations: [
    CharactersTableComponent
  ],
  imports: [
    CommonModule,
    CharactersTableRoutingModule,
    TableModule,
    BadgeModule,
    DialogModule,
    ButtonModule
  ]
})
export class CharactersTableModule { }
