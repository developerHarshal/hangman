import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestHelper } from 'src/TestHelper/test-helper';

import { KeyboardComponent } from './keyboard.component';

describe('KeyboardComponent', () => {
  let component: KeyboardComponent;
  let fixture: ComponentFixture<KeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit the key on press', () => {
    // jest.
    TestHelper.checkPresenceAndClick(fixture, '#key_B');
  });
});
