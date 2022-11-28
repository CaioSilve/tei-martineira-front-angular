import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColumnMode } from '@swimlane/ngx-datatable';


@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  public rowsResultado = [];

  ColumnMode = ColumnMode;

  checkoutForm = this.formBuilder.group({
    nome: '',
    email: '',
    cpf: '',
    cidade: '',
    endereco: '',
    telefone: '',
    celular: ''
  });

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('https://geradorbrasileiro.com/api/faker/pessoa?limit=10')
      .subscribe(resultado => this.rowsResultado = resultado.values);
  }

  onSubmit(): void {
    console.warn(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }

}
