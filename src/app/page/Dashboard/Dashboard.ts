import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User, UserService } from '../../service/user';
import { DashboardUtil } from '../../component/DashboardUtil/DashboardUtil';
import { UserModal } from '../../component/UserModal/UserModal';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DashboardUtil, UserModal, CommonModule],
  templateUrl: './Dashboard.html',
  styleUrl: './Dashboard.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  users: User[] = [];
  allUsers: User[] = [];
  selectedUser?: User;
  isCreateMode = false;
  tableCols = [
    { name: 'Name', width: '40%' },
    { name: 'Username', width: '30%' },
    { name: 'Action', width: '30%' },
  ];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUsers().subscribe((data) => {
      this.allUsers = data || [];
      this.users = this.allUsers.slice();
    });
  }

  onUsersChange(filteredUsers: User[]) {
    this.users = filteredUsers || [];
  }

  openEdit(user?: User) {
    if (user) {
      this.isCreateMode = false;
      this.selectedUser = user;
    }
    else {
      this.isCreateMode = true;
      this.selectedUser = {
        userId: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        createdDate: '',
        role: {
          roleId: '',
          roleName: 'employee',
        },
        permissions: [{ permissionId: '', permissionName: 'read' }],
      };
    }
  }

  onModalClose() {
    this.selectedUser = undefined;
    this.isCreateMode = false;
  }

  onSaveUser(user: User) {
    if (this.isCreateMode) {
      const createPayload = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        username: user.username,
        password: user.password,
        createdDate: user.createdDate || new Date().toISOString(),
        role: user.role,
        permissions: user.permissions ?? [],
      };
      this.userService.createUser(createPayload).subscribe({
        next: () => {
          this.loadUser();
          this.onModalClose();
        },
        error: (error) => {
          console.error('Create user failed', error);
        },
      });
    } else {
      const updatePayload: User = {
        ...(this.selectedUser ?? user),
        ...user,
        userId: user.userId,
      };

      this.userService.updateUser(user.userId, updatePayload).subscribe({
        next: () => {
          this.loadUser();
          this.onModalClose();
        },
        error: (error) => {
          console.error('Update user failed', error);
        },
      });
    }
  }

  onDelete(user: User) {
    if (!confirm('Delete user ' + (user.firstName || '') + '?')) return;
    this.userService.deleteUser(user.userId).subscribe(() => this.loadUser());
  }
}
