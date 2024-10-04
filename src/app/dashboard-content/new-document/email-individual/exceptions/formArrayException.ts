export class FormArrayException extends Error{
    constructor(message:string){
        super(message);
        this.name = "FormArrayException";
    }
}