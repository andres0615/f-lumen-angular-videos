import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingPageService {
  loading: boolean = false;

  constructor() { }

  getLoading() {
    return this.loading;
  }

  setLoading(loading: boolean) {
    
    setTimeout(() => {
      //console.log('seting: ' + loading);
      this.loading = loading;
    });

  }
}
