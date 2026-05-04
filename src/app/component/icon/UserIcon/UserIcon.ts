import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-user-icon',
  standalone: true,
  imports: [],
  templateUrl: './UserIcon.html',
  styleUrl: './UserIcon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserIcon { }
