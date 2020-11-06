import { Component, OnDestroy } from '@angular/core';
import {PrintService} from './print.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'angular-print-service';

  constructor(public printService: PrintService) { }

  ngOnDestroy() {
    this.printService.closeDocument();
  }

  onPrintInvoice() {
    const invoiceIds = ['101', '102'];
    this.printService
      .printDocument('invoice', invoiceIds);
  }
}
