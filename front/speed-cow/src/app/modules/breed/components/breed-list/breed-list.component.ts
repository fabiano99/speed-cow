import { Component, OnInit } from '@angular/core';
import {BreedService} from '../../service/breed.service';
import {Breed} from '../../../../models/breed.model';
import {ExitComponent} from '../../../dialogs/exit/exit.component';
import {MatDialog, MatSnackBar, PageEvent} from '@angular/material';
import {ErrorComponent} from '../../../dialogs/error/error.component';

@Component({
  selector: 'sc-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.css']
})
export class BreedListComponent implements OnInit {
  breeds: Breed[] = [];

  pageEvent: PageEvent;
  itemsPerPage = 5;
  startIntervalPages =  0;
  endIntervalPages = this.itemsPerPage;
  constructor(
    private service: BreedService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.load();
  }

  functionPageEvent(e) {
    this.pageEvent = e;
    this.startIntervalPages = this.pageEvent.pageSize * this.pageEvent.pageIndex;
    this.endIntervalPages = this.pageEvent.pageSize  * (this.pageEvent.pageIndex + 1 ) ;
  }

  load() {
    this.service.list().subscribe(result => {
      this.breeds = [].concat(result);
    });
  }

  delete(id) {
    this.openDialog('Deseja remover esta raça?', 'Remover', 'Cancelar').subscribe(result => {

      if (result) {
        this.service.delete(id).subscribe(deleted => {
          this.load();
          this.openSnackBar('Removido', 'OK');
        }, (error) => {
          this.openDialogError(error);
        });
      }

    });

  }

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 1 * 1000,
    });
  }

  openDialog(message, yes, no) {
    const dialogRef = this.dialog.open(ExitComponent, {
      width: '250px',
      data: {
        message: message,
        yes: yes,
        no: no,
        colorNo: 'primary',
        colorYes: 'warn',
        form: undefined
      }
    });
    return dialogRef.afterClosed();
  }

  openDialogError(error) {
    const dialogRef = this.dialog.open(ErrorComponent, {
      width: '350px',
      data: error
    });
    return dialogRef.afterClosed();
  }

}
