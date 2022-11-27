import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Cliente } from 'app/models/cliente.model';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss']
})
export class CadastroClienteComponent implements OnInit {

  checkoutForm = this.formBuilder.group({
    nome: '',
    raca: '',
    cpf: '',
    cidade: '',
    endereco: '',
    contato1: '',
    contato2: ''
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.warn(this.checkoutForm.value);
    this.checkoutForm.reset();
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }

}
