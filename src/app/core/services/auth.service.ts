
import { Injectable, signal, computed } from '@angular/core';

export type UserRole = 'employee' | 'manager' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  department: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly demoUsers: User[] = [
    {
      id: 1,
      name: 'Asha P ',
      email: 'asha@policydesk.com',
      role: 'employee',
      phone: '98470 1234',
      department: 'Finance'
    },
    {
      id: 2,
      name: 'Rahul M',
      email: 'rahul@policydesk.com',
      role: 'manager',
      phone: '98470 5678',
      department: 'Operations'
    },
    {
      id: 3,
      name: 'Meera J',
      email: 'meera@policydesk.com',
      role: 'admin',
      phone: '98470 9012',
      department: 'Administration'
    }
  ];

  private loadUser(): User | null {
    try {
      const storedUser = sessionStorage.getItem('policydesk_user');
      return storedUser ? JSON.parse(storedUser) as User : null;
    } catch {
      return null;
    }
  }

  currentUser = signal<User | null>(this.loadUser());

  isLoggedIn = computed(() => this.currentUser() !== null);

  login(userId: number): boolean {
    const user = this.demoUsers.find(u => u.id === userId);

    if (!user) {
      return false;
    }

    this.currentUser.set(user);
    sessionStorage.setItem('policydesk_user', JSON.stringify(user));

    return true;
  }

  logout(): void {
    this.currentUser.set(null);
    sessionStorage.removeItem('policydesk_user');
  }

  hasRole(roles: UserRole[]): boolean {
    const user = this.currentUser();
    return !!user && roles.includes(user.role);
  }

  getDemoUsers(): User[] {
    return this.demoUsers;
  }
}
