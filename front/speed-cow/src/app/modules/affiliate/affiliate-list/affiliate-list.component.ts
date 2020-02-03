import {Component, OnInit} from '@angular/core';
import {Affiliate} from '../../../models/affiliate.model';
import {AffiliateService} from '../service/affiliate.service';
import {ExitComponent} from '../../dialogs/exit/exit.component';
import {MatDialog, MatSnackBar, PageEvent} from '@angular/material';
import {ErrorComponent} from '../../dialogs/error/error.component';

@Component({
  selector: 'sc-affiliate-list',
  templateUrl: './affiliate-list.component.html',
  styleUrls: ['./affiliate-list.component.css']
})
export class AffiliateListComponent implements OnInit {
  affiliates: Affiliate[] = [];

  pageEvent: PageEvent;
  itemsPerPage = 5;
  startIntervalPages =  0;
  endIntervalPages = this.itemsPerPage;

  constructor(
    private service: AffiliateService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.load();
  }

  functionPageEvent(e) {
    this.pageEvent = e;
    this.startIntervalPages = this.pageEvent.pageSize * this.pageEvent.pageIndex;
    this.endIntervalPages = this.pageEvent.pageSize  * (this.pageEvent.pageIndex + 1 ) ;
  }

  delete(id) {
    this.openDialog('Deseja remover esta filial?', 'Remover', 'Cancelar').subscribe((result) => {
      if (result) {
        this.service.delete(id).subscribe(deleted => {
          this.load();
          this.openSnackBar('Removido', 'OK');
        }, (e) => {
          this.openDialogError(e);
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

  load() {
    this.service.list().subscribe((result: Affiliate) => {

      this.affiliates =  [].concat(result);

    });
  }

}
