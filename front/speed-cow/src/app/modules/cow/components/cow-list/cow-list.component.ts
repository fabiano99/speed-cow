import {Component, OnInit} from '@angular/core';
import {MatDialog, MatIconRegistry, MatSnackBar, PageEvent} from '@angular/material';
import {ExitComponent} from '../../../dialogs/exit/exit.component';
import {ErrorComponent} from '../../../dialogs/error/error.component';
import {Cow} from '../../../../models/cow.model';
import {CowService} from '../../service/cow.service';
import {Affiliate} from '../../../../models/affiliate.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'sc-cow-list',
  templateUrl: './cow-list.component.html',
  styleUrls: ['./cow-list.component.css']
})
export class CowListComponent implements OnInit {

  cows: Cow[] = [];

  searchValue = localStorage.getItem('affiliate');

  pageEvent: PageEvent;
  itemsPerPage = 5;
  startIntervalPages =  0;
  endIntervalPages = this.itemsPerPage;
  affiliates: Affiliate[] = [];

  constructor(
    private service: CowService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      'cow',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../../assets/vaca.svg')
    );
  }

  ngOnInit() {
    this.service.list().subscribe(result => {
      this.cows = [].concat(result);

      // List of populated affiliates
      const unique: any[] = [];
      this.affiliates = this.cows.map(cow => cow.affiliate).filter( (value, index , self) => {
        if (!unique.includes(value._id)) {
          unique.push(value._id);
          return true;
        } else {
          return false;
        }
      });

      // remember affiliate
      if (this.searchValue) {
        this.search({value: this.searchValue});
      }

    });

  }

  functionPageEvent(e) {
    this.pageEvent = e;
    this.startIntervalPages = this.pageEvent.pageSize * this.pageEvent.pageIndex;
    this.endIntervalPages = this.pageEvent.pageSize  * (this.pageEvent.pageIndex + 1 ) ;
  }

  load(affiliate?) {
    this.service.list(null, affiliate).subscribe(result => {
      this.cows = [].concat(result);
    });
  }

  search(event?) {

    if (event.value == '') {
      this.load();
      localStorage.removeItem('affiliate');
    } else {
      this.load(event.value);
      localStorage.setItem('affiliate', event.value);
      this.startIntervalPages =  0;
      this.endIntervalPages = this.itemsPerPage;
    }

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

