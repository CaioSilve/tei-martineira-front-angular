import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { async, firstValueFrom, interval, lastValueFrom } from 'rxjs';
import { apiUrl } from '../../environments/environment.prod';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  public rowsResultado: any = [];
  public rowSelecionada: any;
  public pessoasAPI:any = [];

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  checkoutForm = this.formBuilder.group({
    id: null,
    nome: ['', Validators.required],
    email: [''],
    cpf: ['', Validators.required],
    cidade: [''],
    endereco: ['', Validators.required],
    telefone: [''],
    celular: ['']
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.attResultado();  
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
  }

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'cliente/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  limpar(): void {
    this.checkoutForm.reset();
  }

  editar(){
    firstValueFrom(this.http.put<any>(apiUrl.url + 'cliente/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  excluir() {
    firstValueFrom(this.http.delete<any>(apiUrl.url + 'cliente/delete/' + this.checkoutForm.value.id)).then(resultado => {
      this.checkoutForm.reset();
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

}
