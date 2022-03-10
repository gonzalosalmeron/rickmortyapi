import { ChartModule } from 'primeng/chart';
import { CharacterFullCardComponent } from './../../../shared/components/character-full-card/character-full-card.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListComponent } from './character-list/character-list.component';
import { CharacterDetailsComponent } from './character-details/character-details.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ScrollTopModule } from 'primeng/scrolltop';
import { ImageModule } from 'primeng/image';
import { CharacterCardComponent } from 'src/app/shared/components/character-card/character-card.component';
import {BadgeModule} from 'primeng/badge';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    CharacterDetailsComponent,
    CharacterListComponent,
    CharacterCardComponent,
    CharacterFullCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    CardModule,
    ButtonModule,
    InfiniteScrollModule,
    ScrollTopModule,
    ImageModule,
    BadgeModule,
    ChartModule,
    FormsModule
  ],
  exports: [
    CharacterDetailsComponent,
    CharacterListComponent,
    CharacterCardComponent,
    CharacterFullCardComponent
  ],
})
export class CharactersModule { }
