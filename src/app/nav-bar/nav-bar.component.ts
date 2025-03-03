import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent {
  menuActive = false;
  isDropdownOpen = false;
  isMobileMenuOpen = false;

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Empêche l'événement de remonter au `document`
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown toggled: ', this.isDropdownOpen);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('.dropdown-container')) {
      this.isDropdownOpen = false;
    }
  }
}
