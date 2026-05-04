import { Component } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { DashboardIcon } from '../icon/DashboardIcon/DashboardIcon';
import { UserIcon } from '../icon/UserIcon/UserIcon';
import { DocumentIcon } from '../icon/DocumentIcon/DocumentIcon';
import { PhotoIcon } from '../icon/PhotoIcon/PhotoIcon';
import { HierachyIcon } from '../icon/HierachyIcon/HierachyIcon';
import { SettingIcon } from '../icon/SettingIcon/SettingIcon';
import { MessageIcon } from '../icon/MessageIcon/MessageIcon';
import { HelpIcon } from '../icon/HelpIcon/HelpIcon';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [NgComponentOutlet, RouterLink, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  FunctionData = [
    { name: 'Dashboard', icon: DashboardIcon, routes: "dashboard" },
    { name: 'Users', icon: UserIcon, routes: "user" },
    { name: 'Document', icon: DocumentIcon, routes: "document" },
    { name: 'Photos', icon: PhotoIcon, routes: "photo" },
    { name: 'Hierachy', icon: HierachyIcon, routes: "hierachy" },
  ];
  UtilData = [
    { name: 'Message', icon: MessageIcon },
    { name: 'Help', icon: HelpIcon },
    { name: 'Setting', icon: SettingIcon },
  ]
}
