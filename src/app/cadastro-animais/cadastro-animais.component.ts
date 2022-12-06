import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
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
    nome: ['', Validators.required],
    tipo: ['', Validators.required],
    dono: {},
    raca: ['', Validators.required],
    idade: ''
  });

  constructor(private formBuilder: FormBuilder, private http : HttpClient) { }

  public donos: Array<Cliente>;

  ColumnMode = ColumnMode;

  ngOnInit(): void {
    firstValueFrom(this.http.get<any>(apiUrl.url + 'cliente/get')).then(resultado => {
      this.donos = resultado.clientes;
    });
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

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'animal/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }

  attResultado(){
    this.rowsResultado = [];
    firstValueFrom(this.http.get<any>(apiUrl.url + 'animal/get')).then(resultado => {
      for(let animal of resultado.animais){
        this.rowsResultado = [...this.rowsResultado, animal];
      }
    });
  }



}
