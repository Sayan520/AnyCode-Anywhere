import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeConverterComponent } from './code-converter.component';

describe('CodeConverterComponent', () => {
  let component: CodeConverterComponent;
  let fixture: ComponentFixture<CodeConverterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeConverterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeConverterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
