import { Component, Input, OnInit } from '@angular/core';
import { Like } from '../../interfaces/like';
import { LikeService } from '../../services/like.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.scss']
})
export class CharacterCardComponent implements OnInit {
  
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() status: string = '';
  @Input() species: string = '';
  @Input() image: string = '';
  @Input() type: string = '';
  @Input() gender: string = '';
  @Input() origin = {
    name: '',
    url: ''
  };
  @Input() location = {
    name: '',
    url: ''
  }
  @Input() episode = [];
  @Input() created = '';

  likes: Like[] = [];
  userId: string = "";
  liked = false;
  likeId: string = "";

  constructor(private likeService: LikeService, private AuthService: AuthService, private router: Router) { 
  }

  ngOnInit(): void { 
    this.likeService.getLikes().subscribe(data => {
      this.likes = data;

      for(let i = 0; i < this.likes.length; i++) {
        if(this.likes[i].character_id == this.id && this.likes[i].user_id == this.userId) {
          this.liked = true
          this.likeId = this.likes[i].likeId
        }
      }
    });

    if(this.AuthService.isLoggedIn) {
      this.userId = this.AuthService.userId
    }
  }

  likeOrNot(id: string) {
    if (this.AuthService.isLoggedIn) {
      if (this.liked) {
        this.likeService.deleteLike(id);
        this.liked = false
      } else {
        const newLike: Like = {
          likeId: "",
          character_id: this.id,
          user_id: this.userId
        }
        this.likeService.addLike(newLike);
        this.liked = true;
      }
    } else {
      Swal.fire({
        title: 'Heyy',
        text: "You need to log in to be able to add favorites",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Login'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigateByUrl('/login')
        }
      })
    }
    
  }

}
