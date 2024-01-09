// home.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  menuItems: any[];
  searchQuery: string = '';

  menuBarStyle: { [klass: string]: any } = {
    'direction': 'rtl'
  };

  constructor(private router: Router) {
    this.menuItems = [
      {label: 'الصفحة الرئيسية', icon: 'pi pi-home', routerLink: [''] },
      { label: 'الأسئلة', icon: 'pi pi-question', routerLink: ['questions'] },
      { label: 'بحث', icon: 'pi pi-search', escape: false }
    ];
  }
  ngOnInit() {
    window.scrollTo(0, 0);
  }


  redirectToQuestionsPage() {
    this.router.navigate(['/questions']);
  }
}
