import { Injectable, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService implements OnDestroy {
  private static instance: PrintService;
  private static beforeprint(event: Event) {
    PrintService.instance.isPrinting = true;
  }
  private static afterprint(event: Event) {
    PrintService.instance.isPrinting = false;
    PrintService.instance.router.navigate([{ outlets: { print: null }}]);
  }

  isPrinting = false;

  constructor(private router: Router) {
    PrintService.instance = this;
    window.addEventListener('beforeprint', PrintService.beforeprint);
    window.addEventListener('afterprint', PrintService.afterprint);
  }

  ngOnDestroy() {
    window.removeEventListener('afterprint', PrintService.afterprint);
    window.removeEventListener('beforeprint', PrintService.beforeprint);
  }

  printDocument(documentName: string, documentData: string[]) {
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData.join()]
      }}],
      { skipLocationChange: true });
  }

  onDataReady() {
    setTimeout(() => window.print());
  }
}
