import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css']
})
export class ThemeComponent implements OnInit {
  darkThemeEnabled!: boolean;
  

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  ngOnInit() {
    const storedTheme = localStorage.getItem('darkThemeEnabled');
    this.darkThemeEnabled = storedTheme ? JSON.parse(storedTheme) : false;
    this.applyThemeInstant();
  }
  
  toggleTheme() {
    this.darkThemeEnabled = !this.darkThemeEnabled;
    localStorage.setItem('darkThemeEnabled', JSON.stringify(this.darkThemeEnabled));
    this.applyThemeInstant();
  }
  
  applyThemeInstant() {
    if (this.darkThemeEnabled) {
      this.renderer.setStyle(this.document.body, 'background-color', '#3f3f3f');
      this.renderer.setStyle(this.document.body, 'color', '#ffffff');
    } else {
      this.renderer.removeStyle(this.document.body, 'background-color');
      this.renderer.removeStyle(this.document.body, 'color');
    }
  }
  
}
