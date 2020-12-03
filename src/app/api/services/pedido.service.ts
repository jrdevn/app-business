import { HttpClient } from '@angular/common/http';
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
        return this.http.post(`${this.relativeLink}`, pedido) as Observable<Pedido>;
    }

    public findAllByIdEstabelecimento(idEstabelecimento: number): Observable<Pedido[]> {
        return this.http.get(`${this.relativeLink}/estabelecimento/${idEstabelecimento}`) as Observable<Pedido[]>;
    }

    public findById(id: number): Observable<Pedido> {
        return this.http.get(`${this.relativeLink}/${id}`) as Observable<Pedido>;
    }
}