import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  signedIn: boolean = false;

  constructor(private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.authService.userChanges.subscribe((response) => {
      this.signedIn = response;
    });
  }

  async onSignOut() {
    await this.authService.signOut();
    this.router.navigate(['/auth']);
  }

}
