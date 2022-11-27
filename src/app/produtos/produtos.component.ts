import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  tipos = [
    {id: 1, nome: 'Médico'},
    {id: 2, nome: 'Brinquedo'},
    {id: 3, nome: 'Alimento'},
    {id: 4, nome: 'Vestimenta'},
    {id: 5, nome: 'Eletrônico'},
  ]

  checkoutForm = this.formBuilder.group({
    desc: '',
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
