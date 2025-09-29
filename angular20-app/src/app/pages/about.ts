import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  title = 'Angular 20 App子应用信息';
}
