import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { str } from 'ajv';
import { Cliente } from 'app/models/cliente.model';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom } from 'rxjs';



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
    if(tipo.value == 1)
      this.http.get<dogResponse>('https://dog.ceo/api/breeds/list/all')
          .subscribe(resultado => {
            for(let raca of Object.keys(resultado.message))
              this.racas.push(raca);
          });

    if(tipo.value == 2)
      this.http.get<Array<catResponse>>('https://api.thecatapi.com/v1/breeds')
        .subscribe(resultado => {
          for(let raca of resultado)
              this.racas.push(raca.name);
        });
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
    this.checkoutForm.get('tipo').setValue(selected[0].tipo.id);
    this.checkoutForm.get('dono_id').setValue(selected[0].dono_id.id);
    this.tipoChange({value: selected[0].tipo.id})
  }

  onSubmit(): void {
    this.checkoutForm.get('tipo').setValue(this.tipos.find(x => x.id == this.checkoutForm.value.tipo).nome);
    console.log(this.checkoutForm.value);
    firstValueFrom(this.http.post<any>(apiUrl.url + 'animal/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }

  editar(){
    this.checkoutForm.get('tipo').setValue(this.tipos.find(x => x.id == this.checkoutForm.value.tipo).nome);
    firstValueFrom(this.http.put<any>(apiUrl.url + 'animal/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  attResultado(){
    this.rowsResultado = [];
    firstValueFrom(this.http.get<any>(apiUrl.url + 'animal/get')).then(resultado => {
      for(let animal of resultado.animais){
        firstValueFrom(this.http.get<any>(apiUrl.url + 'cliente/get/' + animal.dono_id)).then(resultado => {
          animal.dono_id = resultado
          animal.tipo = this.tipos.find(x => x.nome == animal.tipo)
          this.rowsResultado = [...this.rowsResultado, animal];
        });
      }
    });
  }



}
