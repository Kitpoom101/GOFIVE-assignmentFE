import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-photo-icon',
  standalone: true,
  imports: [],
  templateUrl: './PhotoIcon.html',
  styleUrl: './PhotoIcon.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhotoIcon { }
