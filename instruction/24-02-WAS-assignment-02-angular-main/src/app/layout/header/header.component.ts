import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router, RouterModule } from '@angular/router'
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { CommonModule } from '@angular/common'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isScrolled = false
  isMobileMenuOpen = false

  constructor(
    private router: Router,
    library: FaIconLibrary
  ) {
    library.addIcons(faSearch, faUser, faTicket, faBars, faTimes)
  }

  ngOnInit() {
    window.addEventListener('scroll', this.handleScroll)
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  removeKey() {
    localStorage.removeItem('TMDb-Key')
    this.router.navigate(['/signin'])
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen
  }

  handleScroll = () => {
    this.isScrolled = window.scrollY > 50
  }
}
