class Messages {
    constructor() {
        this.message = '';
    }

    async GenerateMessage(seccion, action, success, id) {
        switch(action) {
            case 'save':
                this.message = success ? `Éxito: ${seccion} con ${id} guardad@` : `Error: ${id} al ejecutar ${action} en ${seccion}`;
                break;
            case 'update': 
                this.message = success ? `Éxito: ${seccion} con ${id} editad@` : `Error: ${id} al ejecutar ${action} en ${seccion}`;
                break;
            case 'delete':
                this.message = success ? `Éxito: ${seccion} con ${id} eliminad@` : `Error: ${id} al ejecutar ${action} en ${seccion}`;
                break;
            case 'read':
                this.message = success ? `Éxito: ${seccion} con ${id} eliminad@` : `Error: ${id} al ejecutar ${action} en ${seccion}`;
                break;
            default:
                this.message = success ? `No se detectó acción` : `Error: ${id} al ejecutar ${action} en ${seccion}`;
                break;
        }
        return this.message;
    }
}

module.exports = Messages;