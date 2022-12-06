import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { async, firstValueFrom, interval, lastValueFrom } from 'rxjs';
import { apiUrl } from '../../environments/environment.prod';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  public rowsResultado: any = [];
  public pessoasAPI:any = [];

  ColumnMode = ColumnMode;

  checkoutForm = this.formBuilder.group({
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

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'cliente/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  limpar(): void {
    this.checkoutForm.reset();
  }

  attResultado(){
    this.rowsResultado = [];
    firstValueFrom(this.http.get<any>('https://geradorbrasileiro.com/api/faker/pessoa?limit=3')).then(resultado => {
      for(let pessoa of resultado.values){
        this.rowsResultado = [...this.rowsResultado, pessoa];
      }
    });

    firstValueFrom(this.http.get<any>(apiUrl.url + 'cliente/get')).then(resultado => {
      for(let cliente of resultado.clientes){
        this.rowsResultado = [...this.rowsResultado, cliente];
      }
    });
  }

}
