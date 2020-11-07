export interface LoginRetorno {
    id: number,
    email: string,
    token: string,
    nome: string,
    estabelecimento: number,
    tipoUsuario: number
}

export interface LoginEnvio {
    email: string,
    senha: string
}