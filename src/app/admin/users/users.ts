
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface User {
  name: string;
  role: 'Employee' | 'Manager' | 'Admin';
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './users.html',
  styleUrl: './users.scss',
})
export class Users {
  showAddUserModal = false;

  users: User[] = [
    { name: 'Asha Nair', role: 'Employee', status: 'Active' },
    { name: 'Rahul Menon', role: 'Manager', status: 'Active' },
    { name: 'Meera Pillai', role: 'Admin', status: 'Active' },
    { name: 'Joseph K', role: 'Employee', status: 'Inactive' },
  ];

  newUser: User = {
    name: '',
    role: 'Employee',
    status: 'Active',
  };

  openAddUser(): void {
    this.newUser = {
      name: '',
      role: 'Employee',
      status: 'Active',
    };

    this.showAddUserModal = true;
  }

  closeAddUser(): void {
    this.showAddUserModal = false;
  }

  addUser(): void {
    const name = this.newUser.name.trim();

    if (!name) {
      return;
    }

    this.users = [
      ...this.users,
      {
        name,
        role: this.newUser.role,
        status: this.newUser.status,
      },
    ];

    this.closeAddUser();
  }
}
