import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BACK_URL } from '../../environments/environment';
import { Storage } from '@ionic/storage';
//import { AuthService } from '../auth.service';
var LoginPage = /** @class */ (function () {
    function LoginPage(router, http, storage) {
        this.router = router;
        this.http = http;
        this.storage = storage;
        this.token = "";
    }
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
        /** Verification si déjà connectée */
        this.storage.get('token').then(function (value) {
            _this.token = value;
            console.log(_this.token);
        });
        if ((this.token != "") && (this.token != undefined) && (this.token != null)) {
            this.router.navigate(['/']);
        }
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.mail != undefined && this.password != undefined) {
            /* Paramètrage du header */
            var httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                })
            };
            var postData = {
                "email": this.mail,
                "password": this.password,
                'Authorization': ''
            };
            /* Requete */
            this.http.post(BACK_URL + "authentication_token", postData, httpOptions)
                .subscribe(function (data) {
                console.log(data['token']);
                // Data storage du token
                _this.storage.set('token', data['token']);
                _this.router.navigate(['/']);
            }, function (error) {
                console.log("Email ou mot de passe incorrect");
            });
        }
        else {
            console.log("Veuillez renseigner les champs");
        }
        //this.router.navigate(['/'])
    };
    LoginPage.prototype.register = function () {
        console.log("register");
    };
    LoginPage = tslib_1.__decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, HttpClient, Storage])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map