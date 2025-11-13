// import { bootstrapApplication } from '@angular/platform-browser';
/* // import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err)); */



import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { appConfig } from './app/app.config';
import { Navbar } from './app/core/navbar/navbar';
import { Footer } from './app/core/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Navbar, Footer],
  template: `
    <app-navbar></app-navbar>
    <main class="min-vh-100">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `
})
export class RootComponent {
  year = new Date().getFullYear();
}

bootstrapApplication(RootComponent, appConfig)
  .catch(err => console.error(err));  