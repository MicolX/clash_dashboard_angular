import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.css']
})
export class NavItemComponent {
  @Input() public path: string | undefined;
  @Input() public icon: string | undefined;
  @Input() public title: string | undefined;

  constructor() {
    
  }
}
