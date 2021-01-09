import { Injectable, Injector, Type } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of, from } from 'rxjs';
import { concatMap, first, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompositeRouteGuard implements CanActivate {
  constructor(  
    protected router: Router,
    protected injector: Injector ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var compositeCanActivateObservable: Observable<boolean | UrlTree> = of(true);

      let routeGuards = route.data.routeGuards;
  
      if(routeGuards) {
        for(var i = 0; i < routeGuards.length; i++) {
          let routeGuard = this.injector.get<CanActivate>(routeGuards[i]);
          let canActivateObservable = routeGuard.canActivate(route, state);
          compositeCanActivateObservable = compositeCanActivateObservable.pipe(mergeMap((bool) => {
            if(!bool) {
              return of(false);
            } else {
              if (canActivateObservable instanceof Observable) {
                return canActivateObservable;
              } else if (canActivateObservable instanceof Promise) {
                return from(canActivateObservable);
              } else {
                return of(canActivateObservable);
              }
            }
          }));
        }
      }
  
      return compositeCanActivateObservable;
  }
}
