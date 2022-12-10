import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom } from 'rxjs';


declare var $: any;

@Component({
  selector: 'app-exportar',
  templateUrl: './exportar.component.html',
  styleUrls: ['./exportar.component.scss']
})
export class ExportarComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {

  }



  exportar(){
    firstValueFrom(this.http.get(apiUrl.url + 'utils/export')).then(resultado => {
      this.showNotification('done', 2, 'Exportação', 'Dados exportados com sucesso');
    });
  }


  showNotification(icone, cor, tipo, mensa) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const msg = "<b>" + tipo + "</b>" + " - " + mensa;

    $.notify({
      icon: icone,
      message: msg

    }, {
      type: type[cor],
      timer: 300,
      placement: {
        from: 'bottom',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">done</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }

}
