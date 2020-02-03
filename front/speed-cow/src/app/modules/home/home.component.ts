import {Component, OnInit} from '@angular/core';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, Label} from 'ng2-charts';
import {Cow} from '../../models/cow.model';
import {CowService} from '../cow/service/cow.service';
import {Affiliate} from '../../models/affiliate.model';

@Component({
  selector: 'sc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public top5ChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
  elements: {
      rectangle: {backgroundColor: ['blue']}
  },
    scales: {
      yAxes:[{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public top5ChartLabels: Label[] = ['Filiais'];
  public top5ChartType: ChartType = 'bar';
  public top5ChartLegend = false;
  public barChartPlugins = [pluginDataLabels];
  public top5ChartColor: Color[] = [
    {backgroundColor: ['blue', 'red', 'yellow', 'gray', 'green']}
  ];

  // public top5ChartPlugins = [pluginDataLabels];

  public top5ChartData: ChartDataSets[] = [];

  listCows: Cow[] = [];
  affiliates: Affiliate[] = [];
  cowsPerAffiliate: any[] = [];

  constructor(private cowService: CowService) { }

  ngOnInit() {
    this.cowService.list().subscribe(result => {
        this.listCows = [].concat(result);

        // List of populated affiliates
        const unique: any[] = [];
        this.affiliates = this.listCows.map(cow => cow.affiliate).filter( (value, index , self) => {
          if (!unique.includes(value._id)) {
            unique.push(value._id);
            return true;
          } else {
            return false;
          }
        });

        // count cows per affiliate
        this.affiliates.map(aff => {
          this.cowService.list(null, aff._id).subscribe(r => {
            const obj: any[] = [].concat(r);
            this.cowsPerAffiliate.push( { name: aff.name, total: obj.length});

            this.top5ChartData.push({label: aff.name, data: [obj.length]});

            this.cowsPerAffiliate = this.cowsPerAffiliate.sort(function(a, b) {
              if (a.total < b.total) { return 1; }
              if (a.total > b.total) { return -1; }
              return 0;
            });

            this.top5ChartData = this.top5ChartData.sort(function(a, b) {
              if (a.data[0] < b.data[0]) { return 1; }
              if (a.data[0] > b.data[0]) { return -1; }
              return 0;
            });
          });
        });
      }
    );
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {

  }


}
