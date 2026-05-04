import {
  ChangeDetectionStrategy,
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-util',
  standalone: true,
  imports: [],
  templateUrl: './DashboardUtil.html',
  styleUrl: './DashboardUtil.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardUtil {
  @Input() searchTerm = '';
  @Input() sortBy: 'name' | 'username' | 'email' | 'createdDate' = 'name';
  @Input() sortDir: 'asc' | 'desc' = 'asc';

  @Output() addUser = new EventEmitter<void>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() sortByChange = new EventEmitter<'name' | 'username' | 'email' | 'createdDate'>();
  @Output() sortDirChange = new EventEmitter<'asc' | 'desc'>();

  onAdd() {
    this.addUser.emit();
  }

  onSearch(ev: Event) {
    this.searchTerm = (ev.target as HTMLInputElement).value || '';
    this.searchChange.emit(this.searchTerm);
  }

  onSort(ev: Event) {
    this.sortBy = (ev.target as HTMLSelectElement).value as 'name' | 'username' | 'email' | 'createdDate';
    this.sortByChange.emit(this.sortBy);
  }

  onSortDir(ev: Event) {
    this.sortDir = (ev.target as HTMLSelectElement).value as 'asc' | 'desc';
    this.sortDirChange.emit(this.sortDir);
  }
}
