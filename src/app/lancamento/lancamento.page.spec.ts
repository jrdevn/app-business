import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LancamentoPage } from './lancamento.page';

describe('LancamentoPage', () => {
  let component: LancamentoPage;
  let fixture: ComponentFixture<LancamentoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancamentoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LancamentoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
