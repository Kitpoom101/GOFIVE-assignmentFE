import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-document',
  standalone: true,
  imports: [],
  templateUrl: './Document.html',
  styleUrl: './Document.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Document { }
