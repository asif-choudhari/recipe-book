import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const { data } = await this.authService.getSessionUser();

    const isSignedIn = data.user === null || undefined ? false: true;

    if (isSignedIn) {
      return this.router.createUrlTree(['/'])
    }

    return !isSignedIn;
  }
}
