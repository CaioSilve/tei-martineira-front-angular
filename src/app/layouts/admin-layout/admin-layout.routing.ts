import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { CadastroClienteComponent } from '../../cadastro-cliente/cadastro-cliente.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LoginComponent } from 'app/login/login.component';
import { CadastroAnimaisComponent } from 'app/cadastro-animais/cadastro-animais.component';
import { ProdutosComponent } from 'app/produtos/produtos.component';
import { ConsultasComponent } from 'app/consultas/consultas.component';
import { SobrenosComponent } from 'app/sobrenos/sobrenos.component';
import { ExamesComponent } from 'app/exames/exames.component';
import { ImportarComponent } from 'app/importar/importar.component';
import { ExportarComponent } from 'app/exportar/exportar.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'login',                component: LoginComponent },
    { path: 'dashboard',            component: DashboardComponent },
    { path: 'table-list',           component: TableListComponent },
    { path: 'clientes',             component: CadastroClienteComponent },
    { path: 'animais',              component: CadastroAnimaisComponent },
    { path: 'produtos',             component: ProdutosComponent },
    { path: 'importar',             component: ImportarComponent },
    { path: 'exportar',             component: ExportarComponent },
    { path: 'exames',               component: ExamesComponent },
    { path: 'sobrenos',             component: SobrenosComponent},
    { path: 'consultas',            component: ConsultasComponent },
    { path: 'typography',           component: TypographyComponent },
    { path: 'notifications',        component: NotificationsComponent }
];
