import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './Header.html',
  styleUrl: './Header.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header{
  
}
