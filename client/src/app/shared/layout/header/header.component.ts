import { Component, OnInit } from '@angular/core';
import { TokenStorage } from '../../../website/auth/authority/token.storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private tokenStorage: TokenStorage) { }

  ngOnInit() {
  }

}
