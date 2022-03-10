import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-search',
  templateUrl: './form-search.component.html',
  styleUrls: ['./form-search.component.scss']
})
export class FormSearchComponent implements OnInit {
  

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
  }

  onSearch(value: string) {
    this.router.navigate(['/character-list'], {
      queryParams:{q:value}
    });
  }

}