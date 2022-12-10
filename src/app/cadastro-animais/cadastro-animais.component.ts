import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { str } from 'ajv';
import { Cliente } from 'app/models/cliente.model';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom } from 'rxjs';

declare var $: any;

class dogResponse{
  message = {}
  status: string;
} 

class catResponse{
  name: string
}


@Component({
  selector: 'app-cadastro-animais',
  templateUrl: './cadastro-animais.component.html',
  styleUrls: ['./cadastro-animais.component.scss']
})
export class CadastroAnimaisComponent implements OnInit {

  public racas = [];
  public rowsResultado = [];

  tipos = [
    { id: 1, nome: 'Cachorro'},
    { id: 2, nome: 'Gato'},
    { id: 3, nome: 'Tartaruga'},
    { id: 4, nome: 'Hamster'},
    { id: 5, nome: 'Coelho'},
    { id: 6, nome: 'Pássaro'},
    { id: 7, nome: 'Outro'},
  ];

  checkoutForm = this.formBuilder.group({
    id: null,
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    dono_id: [{}],
    raca: ['', Validators.required],
    idade: ''
  });

  constructor(private formBuilder: FormBuilder, private http : HttpClient) { }

  public donos: Array<Cliente>;

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  ngOnInit(): void {
    firstValueFrom(this.http.get<any>(apiUrl.url + 'cliente/get')).then(resultado => {
      this.donos = resultado.clientes;
    });

    this.attResultado();
  }

  tipoSelecionado(): boolean{
    if(this.checkoutForm.value.tipo == undefined)
      return false;
    return true;
  }

  tipoChange(tipo){
    this.racas = [];
    if(!this.tipoSelecionado())
      return;

    this.racas.push('Vira-Lata');
    if(tipo.value == "Cachorro")
      this.http.get<dogResponse>('https://dog.ceo/api/breeds/list/all')
          .subscribe(resultado => {
            for(let raca of Object.keys(resultado.message))
              this.racas.push(raca);
          });

    if(tipo.value == "Gato")
      this.http.get<Array<catResponse>>('https://api.thecatapi.com/v1/breeds')
        .subscribe(resultado => {
          for(let raca of resultado)
              this.racas.push(raca.name);
        });
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
    this.checkoutForm.get('dono_id').setValue(selected[0].dono_id.id);
    this.tipoChange({value: selected[0].tipo})
  }

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'animal/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Inserção', 'Animal inserido com sucesso');
      this.attResultado();
    });
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }

  editar(){
    firstValueFrom(this.http.put<any>(apiUrl.url + 'animal/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Edição', 'Animal editado com sucesso');
      this.attResultado();
    });
  }

  excluir() {
    firstValueFrom(this.http.delete<any>(apiUrl.url + 'animal/delete/' + this.checkoutForm.value.id)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Exclusão', 'Animal excluído com sucesso');
      this.attResultado();
    });
  }

  attResultado(){
    this.rowsResultado = [];
    firstValueFrom(this.http.get<any>(apiUrl.url + 'animal/get')).then(resultado => {
      for(let animal of resultado.animais){
        firstValueFrom(this.http.get<any>(apiUrl.url + 'cliente/get/' + animal.dono_id)).then(resultado => {
          animal.dono_id = resultado
          this.rowsResultado = [...this.rowsResultado, animal];
        });
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
