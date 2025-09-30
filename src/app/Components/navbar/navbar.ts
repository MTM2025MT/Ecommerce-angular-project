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
 import {CommonModule} from "@angular/common"

@Component({
  selector: 'app-navbar',
    standalone: true,
  imports: [CommonModule,RouterLink, Navbarcartcounter, RouterLinkActive, FormsModule],
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
      this.startAutoPlay();
   }
    ngOnDestroy(): void {
      this.sub?.unsubscribe();
      this.stopAutoPlay();
    }
      private updateSearchBar(url: string) {
    // Show only on '/home'
    this.showSearchBar.set(url === '/main/home'||url==='/');
    console.log(url)
  }
   onserach(){
    this.Serachservice.setSearchTerm(this.serachvalue());
   }

   currentIndex: number = 0;
   autoPlayInterval: any;

   slides = [
     {
       welcomeText: 'Welcome to Chairy',
       title: 'Best Furniture Collection For Your Interior.',
       discount: '54%',
       chairColor: {
         base: '#2d2d2d',
         seat: '#3a3a3a',
         back1: '#4a4a4a',
         back2: '#2d2d2d',
         arm: '#6b6b6b',
         leg1: '#1a1a1a',
         leg2: '#2d2d2d',
         cushion: '#525252'
       }
     },
     {
       welcomeText: 'Premium Quality',
       title: 'Modern Designs That Define Comfort.',
       discount: '40%',
       chairColor: {
         base: '#4a3020',
         seat: '#5a4030',
         back1: '#6a5040',
         back2: '#4a3020',
         arm: '#8a7060',
         leg1: '#2a1a10',
         leg2: '#3a2a20',
         cushion: '#5a4030'
       }
     },
     {
       welcomeText: 'Exclusive Deals',
       title: 'Transform Your Space With Style.',
       discount: '35%',
       chairColor: {
         base: '#1a3a4a',
         seat: '#2a4a5a',
         back1: '#3a5a6a',
         back2: '#1a3a4a',
         arm: '#5a7a8a',
         leg1: '#0a2a3a',
         leg2: '#1a3a4a',
         cushion: '#2a4a5a'
       }
     }
   ];


   goToSlide(index: number): void {
     this.currentIndex = index;
   }

   nextSlide(): void {
     this.currentIndex = (this.currentIndex + 1) % this.slides.length;
   }

   prevSlide(): void {
     this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
   }

   startAutoPlay(): void {
     this.autoPlayInterval = setInterval(() => {
       this.nextSlide();
     }, 5000);
   }

   stopAutoPlay(): void {
     if (this.autoPlayInterval) {
       clearInterval(this.autoPlayInterval);
     }
   }

   isActive(index: number): boolean {
     return this.currentIndex === index;
   }
 }
