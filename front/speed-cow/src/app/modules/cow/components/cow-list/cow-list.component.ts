import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ExitComponent} from '../../../dialogs/exit/exit.component';
import {ErrorComponent} from '../../../dialogs/error/error.component';
import {Cow} from '../../../../models/cow.model';
import {CowService} from '../../service/cow.service';

@Component({
  selector: 'sc-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.css']
})
export class CowListComponent implements OnInit {

  cows: Cow[];

  constructor(
    private service: CowService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.load();

  }

  load() {
    this.service.list().subscribe(result => {
      this.cows = [].concat(result);
      console.log(this.cows);
    });
  }

  delete(id) {
    this.openDialog('Deseja remover esta vaca?', 'Remover', 'Cancelar').subscribe(result => {

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
