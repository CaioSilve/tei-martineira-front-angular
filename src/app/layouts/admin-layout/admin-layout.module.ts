import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatSelectModule } from '@angular/material/select';
import { CadastroClienteComponent } from 'app/cadastro-cliente/cadastro-cliente.component';
import { CadastroAnimaisComponent } from 'app/cadastro-animais/cadastro-animais.component';
import { ProdutosComponent } from 'app/produtos/produtos.component';
import { SobrenosComponent } from 'app/sobrenos/sobrenos.component';
import { ExamesComponent } from 'app/exames/exames.component';
import { ImportarComponent } from 'app/importar/importar.component';
import { PedidosComponent } from 'app/pedidos/pedidos.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    NgxDatatableModule,
    NgbModule
  ],
  declarations: [
    DashboardComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    CadastroClienteComponent,
    CadastroAnimaisComponent,
    SobrenosComponent,
    ProdutosComponent,
    PedidosComponent,
    ExamesComponent,
    ImportarComponent
  ]
})

export class AdminLayoutModule { }
