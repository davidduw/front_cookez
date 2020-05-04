import {
    HttpBackend,
    HttpClient,
    HttpHeaders
} from '@angular/common/http';
import {
    HttpTestingController,
    HttpClientTestingModule
} from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';
import { environment, API_TOKEN, TOKEN_KEY, BACK_URL } from '../../environments/environment';

import { DetailsRecetteService } from './details-recette.service';

describe('DetailsRecetteService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let detailsRecetteService: DetailsRecetteService;
    let httpOptionsTest = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'BEARER ' + 'token_test'
        })
    }

    const etiquettes = [
        {
            id: 1,
            intitule: "Etiquette 1"
        },
        {
            id: 2,
            intitule: "Etiquette 2"
        }
    ];

    const quantites = [
        {
            id: 1,
            ingredientId: 1,
            recetteId: 1,
            quantite: 2
        },
        {
            id: 2,
            ingredientId: 2,
            recetteId: 1,
            quantite: 3
        }
    ];

    const preparations = [
        {
            id: 1,
            recetteId: 1,
            etapeText: "Première étape de préparation",
            numEtape: 1
        },
        {
            id: 2,
            recetteId: 1,
            etapeText: "Deuxième étape de préparation",
            numEtape: 2
        },
    ];

    const cuissons = [
        {
            id: 1,
            recetteId: 1,
            etapeText: "Première étape de cuisson",
            numEtape: 1
        },
        {
            id: 2,
            recetteId: 1,
            etapeText: "Deuxième étape de cuisson",
            numEtape: 2
        },
    ];

    const recette: any = {};
    recette.id = 1;
    recette.nom = 'Nom';
    recette.difficulte = 1;
    recette.tempsprepa = '60';
    recette.tempscuisson = '30';
    recette.nbrPersonnes = 3;
    recette.etiquettes = etiquettes;
    recette.quantites = quantites;
    recette.preparations = preparations;
    recette.cuissons = cuissons;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [DetailsRecetteService]
        });

        httpClient = TestBed.get(HttpClient);
        httpTestingController = TestBed.get(HttpTestingController);
        detailsRecetteService = new DetailsRecetteService(httpClient);
    });

    it('exists', inject([DetailsRecetteService], (service: DetailsRecetteService) => {
        expect(service instanceof DetailsRecetteService).toBe(true);
    }));

    describe('recette', () => {
        it('gets the recipe', () => {
            detailsRecetteService.getRecettes('1', httpOptionsTest).subscribe(x => {
                expect(x).toEqual(recette);
            });
            const req = httpTestingController.expectOne(
                BACK_URL + '/api/recettes/' + '1'
            );
            expect(req.request.method).toEqual('GET');
            req.flush(recette);
            httpTestingController.verify();
        });
    });
});