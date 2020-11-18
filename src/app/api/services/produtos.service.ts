import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/models/produto.module';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProdutoService {
    private relativeLink: string = `${environment.api}/produto`;

    constructor(private http: HttpClient) { }

    public findAll(idEstabelecimento : number): Observable<Array<Produto>> {
        return this.http.get(`${this.relativeLink}/estabelecimento/${idEstabelecimento}`) as Observable<Array<Produto>>;
    }

    public findByDescricao(estabelecimentoId: number, descricao : string): Observable<Array<Produto>> {
        return this.http.get(`${this.relativeLink}/${estabelecimentoId}/${descricao}`) as Observable<Array<Produto>>;
    }
}