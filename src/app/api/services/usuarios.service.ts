import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.module';
import { environment } from 'src/environments/environment';
import { GeralService } from '../geral.service';



@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private relativeLink: string = `${environment.api}/usuario`;

    constructor(private http: HttpClient) { }

    
    public saveUser(usuario: Usuario): Observable<Array<Usuario>> {
        let body = {
            email: usuario.email,
            nome: usuario.nome,
            senha: usuario.senha,
            ddd: 11,
            telefone: usuario.telefone,
            perfil: {
                id: usuario.perfil_id
            },
            estabelecimento: {
                id: 1 //@TODO: APLICAR SELECT OPTIONS PARA VALIDAR
            }
        }
        return this.http.post(this.relativeLink,body) as Observable<Array<Usuario>>;
    }
}