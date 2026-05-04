import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-page',
  imports: [],
  templateUrl: './NoPage.html',
  styleUrl: './NoPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoPage { }
