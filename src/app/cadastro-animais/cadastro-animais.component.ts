import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';



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

  donos = [
    { id: 1, nome: 'Caio'},
    { id: 2, nome: 'Arislan'},
    { id: 3, nome: 'Pedro'},
    { id: 4, nome: 'Leonardo'},
  ];

  checkoutForm = this.formBuilder.group({
    nome: '',
    tipo: {},
    dono: {},
    raca: {},
    idade: ''
  });

  constructor(private formBuilder: FormBuilder, private http : HttpClient) { }

  ColumnMode = ColumnMode;

  ngOnInit(): void {
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
    if(this.checkoutForm.value.raca == undefined)
      return;
    console.warn(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }



}
