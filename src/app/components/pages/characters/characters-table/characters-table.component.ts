import { Character } from './../../../../shared/interfaces/character.interface';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CharacterService } from 'src/app/shared/services/character.service';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { filter, take } from 'rxjs/operators';
import * as moment from 'moment';

type requestInfo = {
  next: string;
}

@Component({
  selector: 'app-characters-table',
  templateUrl: './characters-table.component.html',
  styleUrls: ['./characters-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CharactersTableComponent implements OnInit {

  characters: Character[] = [];

  info: requestInfo = { next: '' };

  display: boolean = false;

  character: Character = {id: 0, name: '', image: '', species: '', status: '',type:'', gender: '', origin: {name: '', url: ''}, location: {name: '', url: ''}, episode: [], created: ''};

  private pageNum = 1;
  query?: any;

  constructor(public characterService: CharacterService, private router: Router, private ActivatedRoute: ActivatedRoute) {
    this.onUrlChanged();
  }

  ngOnInit() {
    for (let i = 0; i < 40; i++) {
      this.pageNum++
      this.getDataFromService(this.pageNum, this.query);
    }
  }

  showDialog(character: Character) {
    this.character = character;
    this.character.created = moment(this.character.created).fromNow();
    this.display = true;
  }

  private onUrlChanged() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.getDataFromService(this.pageNum, this.query);
    });
  }


  private getDataFromService(pageNum: number, query?: any) {
    this.characterService.searchCharacters(query, pageNum)
      .subscribe((res: any) => {
        if(res?.results?.length > 1){
          const { info, results} = res;
          this.characters = [...this.characters, ...results];
          this.info = info;
        } else {
          this.characters = [];
        }
        
      });
  }
}