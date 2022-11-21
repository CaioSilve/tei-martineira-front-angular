import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { CadastroClienteComponent } from '../../cadastro-cliente/cadastro-cliente.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LoginComponent } from 'app/login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'login',                component: LoginComponent },
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'table-list',           component: TableListComponent },
    { path: 'cadastro-cliente',     component: CadastroClienteComponent },
    { path: 'typography',           component: TypographyComponent },
    { path: 'icons',                component: IconsComponent },
    { path: 'maps',                 component: MapsComponent },
    { path: 'notifications',        component: NotificationsComponent },
];
