import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'sc-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = moment().year();
  constructor() { }

  ngOnInit() {
  }

}
