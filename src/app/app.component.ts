import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private globalService: GlobalService, private router: Router) {}

  ngOnInit(): void {
      if(this.globalService.getUserId() === 'NotLoggedIn'){
        this.router.navigate(['/login']);
      }
  }
}
