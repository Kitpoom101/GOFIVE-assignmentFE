import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DashboardIcon } from '../icon/DashboardIcon/DashboardIcon';
import { UserIcon } from '../icon/UserIcon/UserIcon';
import { DocumentIcon } from '../icon/DocumentIcon/DocumentIcon';
import { PhotoIcon } from '../icon/PhotoIcon/PhotoIcon';
import { HierachyIcon } from '../icon/HierachyIcon/HierachyIcon';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [NgComponentOutlet],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  FunctionData = [
    { name: 'Dashboard', icon: DashboardIcon },
    { name: 'Users', icon: UserIcon },
    { name: 'Document', icon: DocumentIcon },
    { name: 'Photos', icon: PhotoIcon },
    { name: 'Hierachy', icon: HierachyIcon },
  ];
}
