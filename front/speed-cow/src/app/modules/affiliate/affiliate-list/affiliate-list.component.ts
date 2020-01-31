import { Component, OnInit } from '@angular/core';
import {Affiliate} from '../../../models/affiliate.model';
import {AffiliateService} from '../service/affiliate.service';
import {fromArray} from 'rxjs/internal/observable/fromArray';
import {toArray} from 'rxjs/operators';
import {arrayify} from 'tslint/lib/utils';
import {ExitComponent} from '../../dialogs/exit/exit.component';
import {FormBuilder} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';

@Component({
  selector: 'sc-affiliate-list',
  templateUrl: './affiliate-list.component.html',
  styleUrls: ['./affiliate-list.component.css']
})
export class AffiliateListComponent implements OnInit {
  affiliates: Affiliate[];
  constructor(
    private service: AffiliateService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.load();
  }

  delete(id) {
    this.openDialog('Deseja remover esta filial?', 'Remover', 'Cancelar').subscribe(result => {
      if (result) {
        this.service.delete(id).subscribe(deleted => {
          this.load();
          this.openSnackBar('Removido', 'OK');
        });
      }
    });

  }

  cancel() {

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
        form: this.form
      }
    });
    return dialogRef.afterClosed();
  }

  load() {
    this.service.list().subscribe((result: Affiliate) => {

      this.affiliates =  [].concat(result);

      console.log(this.affiliates);
    });
  }

}
