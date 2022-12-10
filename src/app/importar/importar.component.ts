import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom } from 'rxjs';


declare var $: any;

@Component({
  selector: 'app-importar',
  templateUrl: './importar.component.html',
  styleUrls: ['./importar.component.scss']
})
export class ImportarComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  checkoutForm = this.formBuilder.group({
    url: ['', Validators.required],
  });

  ngOnInit(): void {
  }

  importar(){
    if(this.checkoutForm.invalid){
      firstValueFrom(this.http.get<any>(apiUrl.url + 'utils/importfile')).then(resultado => {
        if(resultado.mensagem == "formato inválido"){
          this.showNotification('error', 4, 'Exportação', 'Algo deu errado');
          return;
        }
        this.showNotification('done', 2, 'Exportação', 'Dados exportados com sucesso');
      });
      return;
    }
    
    firstValueFrom(this.http.get<any>(apiUrl.url + 'utils/import', {headers: this.checkoutForm.value})).then(resultado => {
      if(resultado.mensagem == "formato inválido"){
        this.showNotification('error', 4, 'Exportação', 'Algo deu errado');
        return;
      }
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
