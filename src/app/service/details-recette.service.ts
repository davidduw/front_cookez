import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class DetailsRecetteService{
    constructor(private http: HttpClient) {}

    getRecettes(idRecette: string, httpOptions: any): Observable<any> {
        return this.http.get(BACK_URL + "/api/recettes/" + idRecette, httpOptions);
    }
}