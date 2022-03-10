import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersTableComponent } from './characters-table.component';

const routes: Routes = [{ path: '', component: CharactersTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharactersTableRoutingModule { }
