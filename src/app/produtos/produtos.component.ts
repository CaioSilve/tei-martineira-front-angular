import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom } from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  public rowsResultado = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  tipos = [
    { id: 1, nome: 'Médico' },
    { id: 2, nome: 'Brinquedo' },
    { id: 3, nome: 'Alimento' },
    { id: 4, nome: 'Vestimenta' },
    { id: 5, nome: 'Eletrônico' },
  ]

  checkoutForm = this.formBuilder.group({
    id: null,
    desc: ['', Validators.required],
    tipo: ['', Validators.required],
    valorUnit: [''],
    qtde: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.attResultado();
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
  }

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'produto/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Inserção', 'Produto inserido com sucesso');
      this.attResultado();
    });
  }

  limpar(): void {
    this.checkoutForm.reset();
  }

  editar() {
    firstValueFrom(this.http.put<any>(apiUrl.url + 'produto/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Edição', 'Produto editado com sucesso');
      this.attResultado();
    });
  }

  excluir() {
    firstValueFrom(this.http.delete<any>(apiUrl.url + 'produto/delete/' + this.checkoutForm.value.id)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Exclusão', 'Produto excluído com sucesso');
      this.attResultado();
    });
  }

  attResultado() {
    this.rowsResultado = [];
    firstValueFrom(this.http.get<any>(apiUrl.url + 'produto/get')).then(resultado => {
      for (let produto of resultado.produtos) {
        produto.valorTotal = Number(produto.qtde) * parseFloat(produto.valorUnit);
        this.rowsResultado = [...this.rowsResultado, produto];
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

