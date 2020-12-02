import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estabelecimento } from 'src/app/models/estabelecimento.module';
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

    public saveProduto(produto: Produto) : Observable<Array<Produto>> {
        let body  = JSON.stringify(produto);
        let httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json");


        console.log(body);
        return this.http.post(this.relativeLink,body,{headers: httpHeaders}) as Observable<Array<Produto>>;
    }

    public updateProduto(produto: Produto, id: string) : Observable<Array<Produto>> {

        let bodyOpt = {
            descricao : produto.descricao,
            valor:     produto.valor,
            estabelecimento : [{
                id: produto.estabelecimento.id,
                nome: produto.estabelecimento.nome
            
            }]
        }

        console.log(bodyOpt);
        let httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json");

        return this.http.put(`${this.relativeLink}/${id}`,bodyOpt) as Observable<Array<Produto>>;
    }
}