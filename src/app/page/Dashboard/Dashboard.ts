import { ChangeDetectionStrategy, Component, ChangeDetectorRef  } from '@angular/core';
import { User, UserService, UsersQueryParams } from '../../service/user';
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
  selectedUser?: User;
  isCreateMode = false;
  query: UsersQueryParams = {
    page: 1,
    pageSize: 6,
    sortBy: 'name',
    sortDir: 'asc',
    search: '',
  };
  totalPages = 1;
  tableCols = [
    { name: 'Name', width: '55%' },
    { name: 'Created Date', width: '30%' },
    { name: 'Action', width: '15%' },
  ];

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.query).subscribe((data) => {
      this.users = data?.items ?? [];
      this.totalPages = data?.totalPages || 1;
      this.query.page = data?.page || 1;

      this.cdr.markForCheck();
    });
  }

  onSearchChange(searchTerm: string) {
    this.query.search = searchTerm;
    this.query.page = 1;
    this.loadUsers();
  }

  onSortByChange(sortBy: 'name' | 'username' | 'email' | 'createdDate') {
    this.query.sortBy = sortBy;
    this.query.page = 1;
    this.loadUsers();
  }

  onSortDirChange(sortDir: 'asc' | 'desc') {
    this.query.sortDir = sortDir;
    this.query.page = 1;
    this.loadUsers();
  }

  onPageChange(page: number) {
    this.query.page = page;
    this.loadUsers();
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
          this.query.page = 1;
          this.loadUsers();
          this.onModalClose();
          this.cdr.markForCheck();
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
          this.loadUsers();
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
    this.userService.deleteUser(user.userId).subscribe(() => this.loadUsers());
  }
}
