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

  userCopy: User = { userId: '', firstName: '', lastName: '', email: '', username: '' };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user']) {
      this.userCopy = this.user
        ? { ...this.user }
        : { userId: '', firstName: '', lastName: '', email: '', username: '' };
    }
  }

  onSave() {
    // emit copy to parent (create or update)
    this.save.emit(this.userCopy);
  }

  onClose() {
    this.close.emit();
  }
}
