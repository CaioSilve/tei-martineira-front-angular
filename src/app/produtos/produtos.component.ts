import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

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
    {id: 1, nome: 'Médico'},
    {id: 2, nome: 'Brinquedo'},
    {id: 3, nome: 'Alimento'},
    {id: 4, nome: 'Vestimenta'},
    {id: 5, nome: 'Eletrônico'},
  ]

  checkoutForm = this.formBuilder.group({
    desc: '',
    tipo: '',
    valorunit: '',
    qtde: ''
  });

  constructor(private formBuilder: FormBuilder, private http : HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.attResultado();
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
  }

  onSubmit(): void {
    this.checkoutForm.get('tipo').setValue(this.tipos.find(x => x.id == this.checkoutForm.value.tipo).nome);
    firstValueFrom(this.http.post<any>(apiUrl.url + 'produto/create', this.checkoutForm.value)).then(resultado => {
      this.toastr.success('Inserção', 'Produto inserido');
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  limpar(): void{ 
    this.checkoutForm.reset();
  }

  editar(){
    this.checkoutForm.get('tipo').setValue(this.tipos.find(x => x.id == this.checkoutForm.value.tipo).nome);
    firstValueFrom(this.http.put<any>(apiUrl.url + 'produto/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.attResultado();
    });
  }

  attResultado(){
    this.rowsResultado = [];
    firstValueFrom(this.http.get<any>(apiUrl.url + 'produto/get')).then(resultado => {
      this.rowsResultado = resultado.produtosç
    });
  }

  

}
