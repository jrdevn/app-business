import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Pedido } from 'src/app/models/pedido.module';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class PedidoService {
    private relativeLink: string = `${environment.api}/pedido`;

    constructor(private http: HttpClient) { }

    public create(pedido: Pedido): Observable<Pedido> {
        pedido.itens.forEach(pedidoHelp => {
            delete pedidoHelp.produto.estabelecimento;
            delete pedidoHelp.produto.status;
            delete pedidoHelp.produto.valor;
        });
        let httpHeaders = new HttpHeaders()
        .set("Content-Type", "application/json");

        pedido.dataVenda = pedido.dataVenda.substring(0,19);
        let body = {
            dataVenda: pedido.dataVenda,
            estabelecimento: {
                id: pedido.estabelecimentoId,
            },
            usuarioLogado: {
                id: pedido.usuarioLogadoId
            },
            itens: pedido.itens
        }
        JSON.stringify(body);
        console.log(body);
        return this.http.post(`${this.relativeLink}`, body,{headers: httpHeaders}) as Observable<Pedido>;
    }

    public findAllByIdEstabelecimento(idEstabelecimento: number): Observable<Pedido[]> {
        return this.http.get(`${this.relativeLink}/estabelecimento/${idEstabelecimento}`) as Observable<Pedido[]>;
    }

    public findById(id: number): Observable<Pedido> {
        return this.http.get(`${this.relativeLink}/${id}`) as Observable<Pedido>;
    }
}