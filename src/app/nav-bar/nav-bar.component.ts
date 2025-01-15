import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;
    const navbarLinks = document.querySelector('.navbar-links');
    if (navbarLinks) {
      navbarLinks.classList.toggle('active', this.menuActive);
    }
  }
}
