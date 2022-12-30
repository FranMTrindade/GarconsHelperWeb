export class AuthTokenError extends Error{
    constructor(){
        super("Falha na autenticação.")
    }
}