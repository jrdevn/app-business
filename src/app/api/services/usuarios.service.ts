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
    private relativeLink: string = `${environment.api}/cadastros/usuario`;

    constructor(private http: HttpClient) { }

    
    public saveUser(usuario: Usuario): Observable<Array<Usuario>> {
        return this.http.post(this.relativeLink,usuario) as Observable<Array<Usuario>>;
    }
}