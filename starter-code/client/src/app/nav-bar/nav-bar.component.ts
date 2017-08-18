import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/Session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private session: SessionService, private router: Router) { }

  ngOnInit() {
  }

  logout(){
    this.session.logout().subscribe();
    this.router.navigate(['/'])
  }
}
