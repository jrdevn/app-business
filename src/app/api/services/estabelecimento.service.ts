import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estabelecimento } from 'src/app/models/estabelecimento.module';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EstabelecimentoService {
    private relativeLink: string = `${environment.api}/estabelecimento`;

    constructor(private http: HttpClient) { }

    public findAll(): Observable<Array<Estabelecimento>> {
        return this.http.get(`${this.relativeLink}`) as Observable<Array<Estabelecimento>>;
    }
}