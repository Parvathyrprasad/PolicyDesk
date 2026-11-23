
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  demoUsers = this.auth.getDemoUsers();

  login(userId: number): void {
    const success = this.auth.login(userId);

    if (!success) {
      return;
    }

    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');

    // Only allow internal application routes.
    const destination =
      returnUrl?.startsWith('/') && !returnUrl.startsWith('//')
        ? returnUrl
        : '/dashboard';

    this.router.navigateByUrl(destination);
  }
}
