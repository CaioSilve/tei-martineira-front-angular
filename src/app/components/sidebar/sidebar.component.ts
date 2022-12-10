import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/clientes', title: 'Clientes',  icon:'person', class: '' }, 
    { path: '/animais', title: 'Animais',  icon:'pets', class: '' }, 
    { path: '/produtos', title: 'Produtos',  icon:'category', class: '' },
    { path: '/exames', title: 'Exames',  icon:'query_stats', class: '' },  
    { path: '/pedidos', title: 'Pedidos',  icon:'shopping_cart', class: '' }, 
    { path: '/importar', title: 'Importar',  icon:'publish', class: '' }, 
    { path: '/exportar', title: 'Exportar',  icon:'download', class: '' }, 
    { path: '/sobrenos', title: 'Sobre nós',  icon:'info', class: '' },
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
