
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Header } from '../../layout/header/header';
import { AuthService } from '../../core/services/auth.service';
import { CanLeave } from '../../core/guards/unsaved-changes.guard';

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [Header, ReactiveFormsModule],
  templateUrl: './profile-edit.html',
  styleUrl: './profile-edit.scss'
})
export class ProfileEdit implements CanLeave {

  private fb = inject(FormBuilder);
  auth = inject(AuthService);

  showLeaveDialog = false;
  successMessage = '';

  private resolveNavigation?: (allow: boolean) => void;

  profileForm = this.fb.nonNullable.group({
    name: [
      this.auth.currentUser()?.name ?? '',
      Validators.required
    ],
    phone: [
      this.auth.currentUser()?.phone ?? '',
      Validators.required
    ],
    department: [
      this.auth.currentUser()?.department ?? '',
      Validators.required
    ]
  });

  get isDirty(): boolean {
    return this.profileForm.dirty;
  }

  // Called by the CanDeactivate guard
  canDeactivate(): boolean | Promise<boolean> {

    if (!this.profileForm.dirty) {
      return true;
    }

    this.showLeaveDialog = true;

    return new Promise<boolean>((resolve) => {
      this.resolveNavigation = resolve;
    });
  }

  // User chooses Stay
  stay(): void {
    this.showLeaveDialog = false;

    this.resolveNavigation?.(false);
    this.resolveNavigation = undefined;
  }

  // User chooses Leave
  leave(): void {
    this.showLeaveDialog = false;

    this.resolveNavigation?.(true);
    this.resolveNavigation = undefined;
  }

  // Save profile changes
  save(): void {

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      this.successMessage = '';
      return;
    }

    const currentUser = this.auth.currentUser();

    if (!currentUser) {
      return;
    }

    const updatedUser = {
      ...currentUser,
      name: this.profileForm.controls.name.value.trim(),
      phone: this.profileForm.controls.phone.value.trim(),
      department: this.profileForm.controls.department.value.trim()
    };

    // Update Angular signal
    this.auth.currentUser.set(updatedUser);

    // Persist updated profile in sessionStorage
    sessionStorage.setItem(
      'policydesk_user',
      JSON.stringify(updatedUser)
    );

    // Clear dirty state to prevent confirmation dialog
    this.profileForm.patchValue(updatedUser);
    this.profileForm.markAsPristine();

    // Show success message
    this.successMessage = 'Profile saved successfully!';
  }

  // Restore original profile values
  cancel(): void {

    const currentUser = this.auth.currentUser();

    this.profileForm.reset({
      name: currentUser?.name ?? '',
      phone: currentUser?.phone ?? '',
      department: currentUser?.department ?? ''
    });

    this.successMessage = '';
  }
}
