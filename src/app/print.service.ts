import { Injectable, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService implements OnDestroy {
  private static instance: PrintService;
  private static afterprint(event: Event) {
    PrintService.instance.afterprint();
  }
  private state: 'idle' | 'done' | 'complete' = 'complete';

  constructor(private router: Router) {
    PrintService.instance = this;
    window.addEventListener('afterprint', PrintService.afterprint);
  }

  ngOnDestroy() {
    window.removeEventListener('afterprint', PrintService.afterprint);
  }

  printDocument(documentName: string, documentData: string[]) {
    this.state = 'idle';
    this.router.navigate(['/',
      { outlets: {
        'print': ['print', documentName, documentData.join()]
      }}],
      { skipLocationChange: true });
  }

  onDataReady() {
    setTimeout(() => {
      window.print();
      this.afterprint();
    });
  }

  private afterprint() {
    switch (this.state) {
      case 'idle':
        return this.state = 'done';
      case 'done':
        this.state = 'complete';
        return this.endOfPrint();
    }
  }

  private endOfPrint() {
    setTimeout(() => this.router.navigate([{ outlets: { print: null }}]), 1000); // any good idea?
  }
}
