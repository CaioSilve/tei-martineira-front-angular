import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/cadastro-cliente', title: 'Clientes',  icon:'person', class: '' }, 
    { path: '/cadastro-animais', title: 'Animais',  icon:'pets', class: '' }, 
    { path: '/produtos', title: 'Produtos',  icon:'category', class: '' }, 
    { path: '/consultas', title: 'Consultas',  icon:'query_stats', class: '' }, 
    { path: '/typography', title: 'Tipografia',  icon:'library_books', class: '' },
    { path: '/sobrenos', title: 'Sobre nós',  icon:'info', class: '' },
    { path: '/notifications', title: 'Notificações',  icon:'notifications', class: '' },
    { path: '/user-profile', title: 'Exemplo Form',  icon:'sort', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
