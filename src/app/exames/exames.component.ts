import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { apiUrl } from 'environments/environment.prod';
import { async, firstValueFrom, interval, lastValueFrom } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.scss']
})
export class ExamesComponent implements OnInit {

  public rowsResultado: any = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  checkoutForm = this.formBuilder.group({
    id: null,
    data: ['', Validators.required]
  });

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  ngOnInit(): void {
    this.attResultado();  
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
  }

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'cliente/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Inserção', 'Cliente inserido com sucesso');
      this.attResultado();
    });
  }

  limpar(): void {
    this.checkoutForm.reset();
  }

  editar(){
    firstValueFrom(this.http.put<any>(apiUrl.url + 'cliente/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Edição', 'Cliente editado com sucesso');
      this.attResultado();
    });
  }

  excluir() {
    firstValueFrom(this.http.delete<any>(apiUrl.url + 'cliente/delete/' + this.checkoutForm.value.id)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Exclusão', 'Cliente excluído com sucesso');
      this.attResultado();
    });
  }

  attResultado(){
    this.rowsResultado = [];
    // firstValueFrom(this.http.get<any>('https://geradorbrasileiro.com/api/faker/pessoa?limit=3')).then(resultado => {
    //   for(let pessoa of resultado.values){
    //     this.rowsResultado = [...this.rowsResultado, pessoa];
    //   }
    // });

    firstValueFrom(this.http.get<any>(apiUrl.url + 'cliente/get')).then(resultado => {
      for(let cliente of resultado.clientes){
        this.rowsResultado = [...this.rowsResultado, cliente];
      }
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
