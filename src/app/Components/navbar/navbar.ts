import { Component, inject, OnInit ,OnDestroy} from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { Navbarcartcounter } from '../../Directive/navbarcartcounter';
import { signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { SharedSearchvalue } from '../../services/shared-searchvalue';
import { FormsModule } from "@angular/forms";
@Component({
  selector: 'app-navbar',
    standalone: true,
  imports: [RouterLink, Navbarcartcounter, RouterLinkActive, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar  implements OnInit, OnDestroy {
  router=inject(Router);
  Serachservice=inject(SharedSearchvalue);
  serachvalue=signal('');
  image = 'foto.jpg';
  showSearchBar = signal(false);
  private sub!: Subscription;
   ngOnInit(): void {
    this.updateSearchBar(this.router.url);

    // Subscribe to future route changes
    this.sub = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.updateSearchBar(event.url);
      });
   }
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
    }
      private updateSearchBar(url: string) {
    // Show only on '/home'
    this.showSearchBar.set(url === '/home'||url==='/');
    console.log(url)
  }
   onserach(){
    this.Serachservice.setSearchTerm(this.serachvalue());
   }

}
