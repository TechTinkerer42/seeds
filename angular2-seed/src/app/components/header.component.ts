import { Component } from '@angular/core';

@Component({
    selector: 'my-header',
    template: `
        <header>
            <a routerLink="/" >Home</a>
            <a routerLink="/login">Login</a>
        </header>
    `
})
export class HeaderComponent  { 
}