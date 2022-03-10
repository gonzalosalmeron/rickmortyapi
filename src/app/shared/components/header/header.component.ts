import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import {MenuItem} from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  items: MenuItem[] = [];

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit() {
    this.items = [
      {
        label: 'Characters',
        routerLink: '/'
      },
      {
        label: 'Characters Table',
        routerLink: '/character-table'
      },
    ];
  }

  logout() {
    this.authService.SignOut();
  }

  goLogin() {
    this.router.navigateByUrl('/login');
  }

}
