import { Component, Input, OnInit } from '@angular/core';
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
    this.authService.getSessionUser().then(({data}) => {
      this.signedIn = data.user === null || undefined ? false: true;
      if(this.signedIn === false) {
        this.authService.userChanges.subscribe((change) => {
          this.signedIn = change
        });
      }
    });
  }

  async onSignOut() {
    await this.authService.signOut();
    this.authService.userChanges.next(false);
    this.router.navigate(['/auth']);
  }

}
