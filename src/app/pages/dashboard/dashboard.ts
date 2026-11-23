
import { Component } from '@angular/core';
import { Header } from '../../layout/header/header';
import { AuthService } from '../../core/services/auth.service';
import { inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {
  auth = inject(AuthService);

  activities = [
    {
      title: 'New policy submitted',
      description: 'A new insurance policy was submitted for review.',
      time: '10 minutes ago'
    },
    {
      title: 'Policy approved',
      description: 'A pending policy has been approved.',
      time: '1 hour ago'
    },
    {
      title: 'Review reminder',
      description: 'Three policies are due for review.',
      time: '2 hours ago'
    }
  ];
}
