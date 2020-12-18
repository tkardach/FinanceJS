import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private static isMobile = new Subject<boolean>();
  public screenWidth: string;

  constructor() { }

  onMobileChange(status: boolean) {
    ResponsiveService.isMobile.next(status);
  }

  getMobileStatus(): Observable<boolean> {
    return ResponsiveService.isMobile.asObservable();    
  }

  public checkWidth() {
    const width = window.innerWidth;
    if (width <= 768) {
      this.screenWidth = 'sm';
      this.onMobileChange(true);
    } else if (width > 768 && width <= 992) {
      this.screenWidth = 'md';
      this.onMobileChange(false);
    } else {
      this.screenWidth = 'lg';
      this.onMobileChange(false);
    }
  }
}
