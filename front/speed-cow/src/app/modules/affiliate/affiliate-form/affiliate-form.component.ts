import {Component, OnInit} from '@angular/core';
import {AffiliateService} from '../service/affiliate.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ExitComponent} from '../../dialogs/exit/exit.component';
import {ErrorComponent} from '../../dialogs/error/error.component';

@Component({
  selector: 'sc-affiliate-form',
  templateUrl: './affiliate-form.component.html',
  styleUrls: ['./affiliate-form.component.css']
})
export class AffiliateFormComponent implements OnInit {
  form: FormGroup;
  constructor(public service: AffiliateService,
              public fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.form = fb.group({
      _id: [],
      name: ['', [Validators.required, Validators.minLength(5)]],
      totalCows: [0],
      __v: []
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.params.id;
    if ( id !== 'new_record' ) {
      this.service.list(id).subscribe(result => {
        this.form.setValue(result);
      }, (error) => {
        this.openDialogError(error);
        this.navigateToBack();
      });
    }
  }

  navigateToBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  save() {
    const id = this.route.snapshot.params.id;
    const msg = ( id === 'new_record' ) ? 'Filial Salva!' : 'Filial Atualizada!';

    if (id === 'new_record' ) {
      this.service.save(this.form.value).subscribe(result => {
        this.openSnackBar(msg, 'OK');
        this.navigateToBack();
      }, (error) => {
        this.openDialogError(error);
        this.navigateToBack();
      });
    } else {
      this.service.save(this.form.value, id).subscribe(result => {
        this.openSnackBar(msg, 'OK');
        this.navigateToBack();
      }, (error) => {
        this.openDialogError(error);
        this.navigateToBack();
      });
    }

  }

  cancel() {
    this.openDialog('Deseja sair sem salvar?', 'Sim', 'Nao').subscribe(result => {
      if (result) {
        // FormDeactivateService.pressSalveOrCancel = true;
        this.navigateToBack();
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
        form: this.form
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
