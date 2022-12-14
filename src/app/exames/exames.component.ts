import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { CustomDateAdapter, CustomDateParserFormatter } from 'app/utils/formUtil';
import { apiUrl } from 'environments/environment.prod';
import { firstValueFrom} from 'rxjs';

declare var $: any;

@Component({
  selector: 'app-exames',
  templateUrl: './exames.component.html',
  styleUrls: ['./exames.component.scss'],
  providers: [{provide: NgbDateAdapter, useClass: CustomDateAdapter},
              {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}]
})
export class ExamesComponent implements OnInit {

  public rowsResultado: any = [];
  public pacientes = [];

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  checkoutForm = this.formBuilder.group({
    id: null,
    data: ['', Validators.required],
    paciente: ['', Validators.required],
    procedimento: ['', Validators.required],
    resultado: [''],
    horaInicio: ['', Validators.required],
    horaFim: ['', Validators.required]
  });

  ColumnMode = ColumnMode;
  SelectionType = SelectionType;

  ngOnInit(): void {
    this.checkoutForm.get('data').setValue(new Date().toLocaleDateString());
    var data = new Date();
    this.checkoutForm.get('horaFim').setValue(data.toLocaleTimeString());
    data.setHours(data.getHours() - 2);
    this.checkoutForm.get('horaInicio').setValue(data.toLocaleTimeString());
    firstValueFrom(this.http.get<any>(apiUrl.url + 'animal/get')).then(resultado => {
      this.pacientes = resultado.animais;
    });

    this.attResultado();  
  }

  onSelect({ selected }) {
    this.checkoutForm.patchValue(selected[0]);
  }

  onSubmit(): void {
    firstValueFrom(this.http.post<any>(apiUrl.url + 'exame/create', this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Inser????o', 'Exame inserido com sucesso');
      this.attResultado();
    });
  }

  limpar(): void {
    this.checkoutForm.reset();
  }

  editar(){
    firstValueFrom(this.http.put<any>(apiUrl.url + 'exame/update/' + this.checkoutForm.value.id, this.checkoutForm.value)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Edi????o', 'Exame editado com sucesso');
      this.attResultado();
    });
  }

  excluir() {
    firstValueFrom(this.http.delete<any>(apiUrl.url + 'exame/delete/' + this.checkoutForm.value.id)).then(resultado => {
      this.checkoutForm.reset();
      this.showNotification('done', 2, 'Exclus??o', 'Exame exclu??do com sucesso');
      this.attResultado();
    });
  }

  attResultado(){
    this.rowsResultado = [];

    firstValueFrom(this.http.get<any>(apiUrl.url + 'exame/get')).then(resultado => {
      for(let exame of resultado.exames){
        firstValueFrom(this.http.get<any>(apiUrl.url + 'animal/get/' + exame.paciente)).then(resultado => {
          exame.dono_id = resultado
          this.rowsResultado = [...this.rowsResultado, exame];
        });
      }
    });
  }


  showNotification(icone, cor, tipo, mensa) {
    const type = ['', 'info', 'success', 'warning', 'danger'];

    const msg = "<b>" + tipo + "</b>" + " - " + mensa;

    $.notify({
      icon: icone,
      message: msg

    }, {
      type: type[cor],
      timer: 300,
      placement: {
        from: 'bottom',
        align: 'right'
      },
      template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
        '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
        '<i class="material-icons" data-notify="icon">done</i> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
        '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
  }
}
