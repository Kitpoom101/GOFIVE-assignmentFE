import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { User } from '../../service/user';

@Component({
  selector: 'app-dashboard-util',
  standalone: true,
  imports: [],
  templateUrl: './DashboardUtil.html',
  styleUrl: './DashboardUtil.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUtil implements OnChanges {
  @Input() users: User[] = [];
  searchTerm = '';
  sortBy = 'name';
  filteredUsers: User[] = [];

  @Output() addUser = new EventEmitter<void>();
  @Output() usersChange = new EventEmitter<User[]>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['users']) {
      this.applyFiltersAndSort();
    }
  }

  onAdd() {
    this.addUser.emit();
  }

  onSearch(ev: Event) {
    this.searchTerm = (ev.target as HTMLInputElement).value || '';
    this.applyFiltersAndSort();
  }

  onSort(ev: Event) {
    this.sortBy = (ev.target as HTMLSelectElement).value;
    this.applyFiltersAndSort();
  }

  private applyFiltersAndSort() {
    const term = this.searchTerm.trim().toLowerCase();
    let list = this.users.slice();

    if (term) {
      list = list.filter((u) => {
        const full = `${u.firstName || ''} ${u.lastName || ''} ${u.username || ''} ${u.email || ''}`.toLowerCase();
        return full.includes(term);
      });
    }

    if (this.sortBy === 'name') {
      list.sort((a, b) =>
        `${a.firstName || ''} ${a.lastName || ''}`.localeCompare(`${b.firstName || ''} ${b.lastName || ''}`),
      );
    } else if (this.sortBy === 'username') {
      list.sort((a, b) => (a.username || '').localeCompare(b.username || ''));
    } else if (this.sortBy === 'email') {
      list.sort((a, b) => (a.email || '').localeCompare(b.email || ''));
    }

    this.filteredUsers = list;
    this.usersChange.emit(this.filteredUsers);
  }
}
