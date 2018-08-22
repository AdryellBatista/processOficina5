import { Component } from '@angular/core';

import { Router } from '@angular/router'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class AppHeaderComponent {

  userLogado = JSON.parse(localStorage.getItem('USER'));

  constructor(
    private router: Router
  ){}


  logout(){
    localStorage.clear();
    this.router.navigate(["/login"]);
  }

}
