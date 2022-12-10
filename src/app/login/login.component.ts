import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Usuario } from 'app/models/usuario.model';
import { RequestService } from 'app/services/RequestGeneric.service';
import { apiUrl } from 'environments/environment.prod';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public msgErro: string;

  constructor(private router: Router, private formBuilder: FormBuilder, private http: HttpClient, private requestService: RequestService<Usuario>) { }

  checkoutForm = this.formBuilder.group({
    usuario: '',
    senha: ''
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    if(this.checkoutForm.value.usuario == "" || this.checkoutForm.value.senha == ""){
      this.msgErro = 'Entre com um usuário e senha';
      return;
    }

    this.http.get<any>(apiUrl.url + 'usuario/get/' + this.checkoutForm.value.usuario)
      .subscribe(resultado => {
          if(this.checkoutForm.value.senha != resultado.senha){
            this.msgErro = 'Senha não confere'
            return;
          }

          this.router.navigate(['']);
    });
  }

}
