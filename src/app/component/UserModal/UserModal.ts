import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../service/user';

@Component({
  selector: 'app-user-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './UserModal.html',
  styleUrl: './UserModal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserModal implements OnChanges {
  @Input() user?: User | null;
  @Output() save = new EventEmitter<User>();
  @Output() close = new EventEmitter<void>();

  readonly availableRoles = ['Super admin', 'admin', 'employee'];
  readonly availablePermissions = ['read', 'write', 'delete'];
  userCopy: User = this.createEmptyUser();
  confirmPassword = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.userCopy = this.user ? this.cloneUser(this.user) : this.createEmptyUser();
      this.confirmPassword = this.userCopy.password ?? '';
    }
  }

  onRoleChange(roleName: string) {
    this.userCopy.role = {
      roleId: this.userCopy.role?.roleId || '',
      roleName,
    };

    const defaultPermissions = this.getDefaultPermissionsForRole(roleName);
    this.userCopy.permissions = defaultPermissions.map((permissionName) => ({
      permissionId: this.findPermissionId(permissionName),
      permissionName,
    }));
  }

  onPermissionToggle(permissionName: string, checked: boolean) {
    this.userCopy.permissions ??= [];

    if (checked) {
      const alreadySelected = this.userCopy.permissions.some(
        (p) => p.permissionName.toLowerCase() === permissionName
      );

      if (!alreadySelected) {
        this.userCopy.permissions.push({
          permissionId: this.findPermissionId(permissionName),
          permissionName,
        });
      }
      return;
    }

    this.userCopy.permissions = this.userCopy.permissions.filter(
      (p) => p.permissionName.toLowerCase() !== permissionName
    );
  }

  isPermissionChecked(permissionName: string): boolean {
    return (
      this.userCopy.permissions?.some((p) => p.permissionName.toLowerCase() === permissionName) ?? false
    );
  }

  get passwordsMatch(): boolean {
    return (this.userCopy.password ?? '') === this.confirmPassword;
  }

  onSave() {
    if (!this.passwordsMatch) {
      return;
    }

    // Parent will close modal after a successful API response.
    this.save.emit(this.userCopy);
  }

  onClose() {
    this.close.emit();
  }

  private createEmptyUser(): User {
    return {
      userId: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      username: '',
      password: '',
      role: {
        roleId: '',
        roleName: 'employee',
      },
      permissions: [
        { permissionId: '', permissionName: 'read' },
      ],
    };
  }

  private cloneUser(user: User): User {
    return {
      ...user,
      role: user.role
        ? { ...user.role }
        : { roleId: '', roleName: 'employee' },
      permissions: (user.permissions ?? []).map((permission) => ({ ...permission })),
    };
  }

  private getDefaultPermissionsForRole(roleName: string): string[] {
    const normalized = roleName.toLowerCase();
    if (normalized === 'super admin') return ['read', 'write', 'delete'];
    if (normalized === 'admin') return ['read', 'write'];
    return ['read'];
  }

  private findPermissionId(permissionName: string): string {
    const existing = this.userCopy.permissions?.find(
      (p) => p.permissionName.toLowerCase() === permissionName
    );
    return existing?.permissionId || '';
  }
}
