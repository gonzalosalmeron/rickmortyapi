import { Component, HostListener, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CharacterService } from 'src/app/shared/services/character.service';
import { filter, take } from 'rxjs/operators';
import { Character } from './../../../../shared/interfaces/character.interface';
import { ActivatedRoute, NavigationEnd, ParamMap, Router, RouterEvent } from '@angular/router';
import { DOCUMENT } from '@angular/common'
import { LikeService } from '../../../../shared/services/like.service';
import { Like } from '../../../../shared/interfaces/like';
import { AuthService } from '../../../../shared/services/auth.service';
import { arrayRemove } from 'firebase/firestore';

type requestInfo = {
  next: string;
}

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CharacterListComponent implements OnInit {

  characters: Character[] = [];
  charactersLiked: Character[] = [];
  info: requestInfo = { next: '' };
  likes: Like[] = [];
  actualUserLIkes: Like[] = [];

  private pageNum = 2;
  query?: any;

  checked: boolean = false;
  showOrNot: boolean = false;
  userId: string = "";

  constructor(@Inject(DOCUMENT) private document: Document, public characterService: CharacterService, private router: Router, private activatedRoute: ActivatedRoute, private likeService: LikeService, public authService: AuthService) {
    this.onUrlChanged();
  }
  
  ngOnInit() {
    this.getLikes()

    if(this.authService.isLoggedIn) {
      this.userId = this.authService.userId 
    }
  }

  onScrollTop() {
    this.document.body.scrollTop = 0; // FOR SAFARI
    this.document.documentElement.scrollTop = 0; // FOR OTHER BROWSERS
  }

  onScrollDown() {
    if(this.info.next != '' && !this.checked) {
      console.log('hola')
      this.pageNum++;
      this.getDataFromService();
    }
  }

  private onUrlChanged() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.characters = [];
      this.pageNum = 1;
      this.getCharactersByName();
    });
  }

  private getCharactersByName() {
    this.activatedRoute.queryParamMap.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params.get('q');
      this.getDataFromService();
    });
  }

  private getDataFromService() {
    this.characterService.searchCharacters(this.query, this.pageNum)
    
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

  getLikes() {
    this.likeService.getLikes().subscribe(data => {
      this.likes = data;
      
      this.actualUserLIkes = [];
      for(let i = 0; i < this.likes.length; i++) {
        if(this.likes[i].user_id == this.userId) {
          this.actualUserLIkes.push(this.likes[i]);
        }
      }

    });
  }

  showLiked() {
    this.getLikes();

    if (!this.checked) {
      this.actualUserLIkes.forEach(like => {
        this.characters.forEach(character => {
          if(character.id == like.character_id) {
            this.charactersLiked.push(character);
          }
        })
      });

      this.charactersLiked = this.charactersLiked.filter(
        (element, i) => i === this.charactersLiked.indexOf(element)
      );

    } else {
      this.charactersLiked = [];
    }
  }

}
