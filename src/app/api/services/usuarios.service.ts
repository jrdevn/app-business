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
        
        var dddHelp =  usuario.telefone.toString().substring(1,3);
        var telefone = usuario.telefone.toString().substring(4,usuario.telefone.toString().length).
                                                                               replace('-','').trim();

        console.log(dddHelp);
        console.log(telefone);
        let body = {
            email: usuario.email,
            nome: usuario.nome,
            senha: usuario.senha,
            ddd: Number(dddHelp),
            telefone: Number(telefone),
            perfil: {
                id: usuario.perfil_id
            },
            estabelecimento: {
                id: usuario.estabelecimento_id 
            }
        }
        return this.http.post(this.relativeLink,body) as Observable<Array<Usuario>>;
    }
}