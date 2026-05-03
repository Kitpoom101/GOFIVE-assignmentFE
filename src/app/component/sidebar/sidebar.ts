import { Component } from '@angular/core';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  FunctionData = [
    "Dashboard",
    "Users",
    "Document",
    "Photos",
    "Hierachy"
  ]
}
