import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, map, retry, tap } from "rxjs/operators";
import { AuthenticationService } from "../component/login/service/authentication.service";
import { server } from "../server";
import { SnackbarService } from "../snackbar.service";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService,
        private snackbarService: SnackbarService,
        private router: Router) {

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.authenticationService.currentUserValue;
        const isLoggedIn = currentUser && currentUser.token;
        const isApiUrl = req.url.startsWith(server.serverUrl);
        if (isLoggedIn && isApiUrl) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.token}`
                }
            });
        }
        return next.handle(req).pipe(
            retry(1),
            tap(evt => {
                if (evt instanceof HttpResponse) {
                    if (evt.status == 200) {
                        this.snackbarService.openSnackBar('عملیات با موفقیت انجام شد', ' ');
                    }
                }
            }),
            catchError((error: HttpErrorResponse) => {
                let errorMessage = '';
                if (error instanceof ErrorEvent) {
                    errorMessage = `Error: ${error}`;
                } else {
                    // server-side error
                    if (typeof (error.error) === 'string') {
                        errorMessage = error.error;
                    } else {
                        errorMessage = 'خطای ناشناخته';
                        if (error.status === 401) {
                            errorMessage = 'انفضای session';
                            this.authenticationService.logout();
                            this.router.navigateByUrl('/login');
                        }
                    }

                    this.snackbarService.openSnackBar(errorMessage, ' ');
                }
                return throwError(errorMessage);
            }),
            finalize(() => {
            }
            )
        );
    }

}