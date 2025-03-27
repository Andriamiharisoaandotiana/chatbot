import { CommonModule } from '@angular/common';
import { Component, HostListener, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'], // Correction ici
})
export class NavBarComponent {
  menuActive = false;
  isDropdownOpen = false;
  isMobileMenuOpen = false;
  isDarkMode = false;
  faSun = faSun;
  faMoon = faMoon;

  /**login */
  token: string = '';
  isConnected: boolean = false;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') || '';
    this.isConnected = this.token.length > 0;
  }

  /**logout */
  
  logout() {
    localStorage.clear();
    location.reload()
  }

  toggleDropdown(event: Event) {
    event.stopPropagation(); // Empêche la propagation pour éviter la fermeture immédiate
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('Dropdown toggled:', this.isDropdownOpen);
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    console.log('Mobile menu toggled:', this.isMobileMenuOpen);
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    console.log('Mode sombre activé ?', this.isDarkMode);
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
    this.cdr.detectChanges(); // Force la détection de changements
  }

  applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: Event) {
    const targetElement = event.target as HTMLElement;

    // Ferme le dropdown si on clique en dehors
    if (!targetElement.closest('.dropdown-container')) {
      this.isDropdownOpen = false;
      console.log('Dropdown closed');
    }

    // Ferme le menu mobile aussi si ouvert
    if (!targetElement.closest('.mobile-menu') && this.isMobileMenuOpen) {
      this.isMobileMenuOpen = false;
      console.log('Mobile menu closed');
    }
  }
}
