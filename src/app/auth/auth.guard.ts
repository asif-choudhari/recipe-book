import { Injectable } from '@angular/core'
import { CanActivate, Router, UrlTree } from '@angular/router'
import { AuthService } from './auth.service'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService, private readonly router: Router) {}

  async canActivate(): Promise<boolean | UrlTree> {
    const { data } = await this.authService.getSessionUser();

    const isSignedIn = data.user === null || undefined ? false: true;

    if (!isSignedIn) {
      return this.router.createUrlTree(['/auth'])
    }

    return isSignedIn
  }
}
