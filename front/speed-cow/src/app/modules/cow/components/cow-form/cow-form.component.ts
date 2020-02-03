import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ExitComponent} from '../../../dialogs/exit/exit.component';
import {ErrorComponent} from '../../../dialogs/error/error.component';
import {CowService} from '../../service/cow.service';
import {Affiliate} from '../../../../models/affiliate.model';
import {Breed} from '../../../../models/breed.model';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'sc-cow-form',
  templateUrl: './cow-form.component.html',
  styleUrls: ['./cow-form.component.css']
})
export class CowFormComponent implements OnInit {

  form: FormGroup;
  affiliates: Affiliate[] = [];
  breeds: Breed[] = [];

  filteredAffiliates: Observable<Affiliate[]>;
  filteredBreeds: Observable<Breed[]>;

  minDate = new Date(1970, 0, 1);
  maxDate = new Date();

  constructor(public service: CowService,
              public fb: FormBuilder,
              public router: Router,
              public route: ActivatedRoute,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
    this.form = fb.group({
      _id: [],
      internalCode: ['', [Validators.required, Validators.minLength(2)]],
      birthDate: [moment().format('dd-mm-yyyy')],
      affiliate: [],
      breed: [],
      __v: []
    });

    this.service.loadAffiliates().subscribe(result => {
      this.affiliates = [].concat(result);
    });
    this.service.loadBreeds().subscribe(result => {
      this.breeds = [].concat(result);
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

    this.filteredAffiliates = this.form.get('affiliate').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ?  this._filterAffiliate(name) : this.affiliates.slice() )

    );



    this.filteredBreeds = this.form.get('breed').valueChanges.pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filterBreed(name) : this.breeds.slice())

    );

  }

  displayAffiliate(affiliate?: Affiliate): string | undefined {
    return affiliate ? affiliate.name : undefined;
  }

  displayBreed(breed?: Breed): string | undefined {
    return breed ? breed.name : undefined;
  }

  private _filterAffiliate(value: any): Affiliate[] {
    const filteredAffiliate = value.toLowerCase();
    return this.affiliates.filter(aff => aff.name.toLowerCase().includes(filteredAffiliate));
  }

  private _filterBreed(value: any): Breed[] {
    const filteredBreed = value.toLowerCase();
    return this.breeds.filter(breed => breed.name.toLowerCase().includes(filteredBreed));
  }

  navigateToBack() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  save() {
    const id = this.route.snapshot.params.id;
    const msg = ( id === 'new_record' ) ? 'Vaca Salva!' : 'Vaca Atualizada!';

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
