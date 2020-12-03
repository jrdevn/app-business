import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Produto } from '../models/produto.module';

@Injectable({
  providedIn: 'root'
})
export class GeralService {

  constructor(private httpClient: HttpClient) { }

   URL_STRING : string = "http://localhost:8081/";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  obterProdutos(estabelecimentoId: String): Observable<Produto[]> {
    let url = this.URL_STRING + "cadastros/produto/estabelecimento/"; // 1 só de teste por enquanto
    return this.httpClient.get<Produto[]>(url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }
  
  salvarProduto(produto: Produto, estabelecimento: string) {
    let url = this.URL_STRING + "cadastros/produto";
    estabelecimento = "2";
    let body =  {
      Descricao: produto.descricao,
      ValorUnitario: produto.valor,
      //Estabelecimento: estabelecimento
    }
      return this.httpClient.post(url,body, this.httpOptions).
         pipe(
           retry(2),
           catchError(this.handleError));
  }

  
  

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) { // error server
      errorMessage = error.error.message;
    } else { // error client
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  };
}
