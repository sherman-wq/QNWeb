import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesListComponent } from './file-list.component';

describe('FileListComponent', () => {
  let component: FilesListComponent;
  let fixture: ComponentFixture<FilesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
