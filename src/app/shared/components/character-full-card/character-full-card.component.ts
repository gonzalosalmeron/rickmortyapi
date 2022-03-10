import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from '../../services/like.service';
import { AuthService } from '../../services/auth.service';
import { Like } from '../../interfaces/like';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-character-full-card',
  templateUrl: './character-full-card.component.html',
  styleUrls: ['./character-full-card.component.scss']
})
export class CharacterFullCardComponent implements OnInit {
  
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
    // this.likes = this.likeService.getLikes();
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

  ngOnInit(): void { 

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
