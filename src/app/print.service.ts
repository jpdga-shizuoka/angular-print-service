import { Injectable, OnDestroy } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PrintService implements OnDestroy {
  private state: 'close' | 'open' = 'close';

  constructor(private router: Router) {
  }

  ngOnDestroy() {
    this.closeDocument();
  }

  printDocument(documentName: string, documentData: string[]) {
    if (this.state === 'open') {
      this.onDataReady();
    } else {
      this.router.navigate(['/',
        { outlets: {
          'print': ['print', documentName, documentData.join()]
        }}],
        { skipLocationChange: true })
      .then(result => this.state = result ? 'open' : this.state);
    }
  }

  onDataReady() {
    setTimeout(() => window.print());
  }

  closeDocument() {
    if (this.state === 'open') {
      this.router.navigate([{ outlets: { print: null }}])
      .then(() => this.state = 'close');
    }
  }
}
