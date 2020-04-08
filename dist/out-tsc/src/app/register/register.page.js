import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { BACK_URL } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
var RegisterPage = /** @class */ (function () {
    function RegisterPage(router, http) {
        this.router = router;
        this.http = http;
        // registerForm: FormGroup;
        this.errorinfo = "";
        this.confirmpass = false;
        this.mail = "";
        this.password = "";
        this.passwordconfirm = "";
    }
    RegisterPage.prototype.ngOnInit = function () {
    };
    RegisterPage.prototype.registerForm = function () {
        var _this = this;
        /* Paramètrage du header */
        var httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': ''
            })
        };
        /** Verification mot de passe */
        if ((this.mail != "") && (this.password != "")) {
            if ((this.password == this.passwordconfirm)) {
                this.confirmpass = true;
            }
            else {
                this.errorinfo = "Les mots de passes ne sont pas identiques.";
            }
        }
        else {
            this.errorinfo = "Veuillez renseigner les champs.";
        }
        /** Verification  formulaire */
        if (this.confirmpass == true) {
            /* Donées en POST */
            var postData = {
                "email": this.mail,
                "password": this.password
            };
            /* Requete */
            this.http.post(BACK_URL + "api/register", postData, httpOptions)
                .subscribe(function (data) {
                _this.router.navigate(['/login']);
            }, function (error) {
                /** Si déja inscrit avec le mail */
                if (error['error'].violations[0].title == "exist") {
                    _this.errorinfo = "Un compte existe déjà avec l'adresse mail renseignée.";
                }
            });
        }
    };
    RegisterPage = tslib_1.__decorate([
        Component({
            selector: 'app-register',
            templateUrl: './register.page.html',
            styleUrls: ['./register.page.scss'],
        }),
        tslib_1.__metadata("design:paramtypes", [Router, HttpClient])
    ], RegisterPage);
    return RegisterPage;
}());
export { RegisterPage };
//# sourceMappingURL=register.page.js.map