import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroAnimaisComponent } from './cadastro-animais.component';

describe('CadastroAnimaisComponent', () => {
  let component: CadastroAnimaisComponent;
  let fixture: ComponentFixture<CadastroAnimaisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastroAnimaisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroAnimaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
