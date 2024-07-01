class User {
    constructor(id, fullName, email, password, phoneNumber, location) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.location = location;
    }

    // Método para validar si el email está en un formato correcto (simplificado)
    validateEmail() {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(this.email);
    }

    // Método para ocultar información sensible del objeto usuario antes de devolverlo al cliente
    hideSensitiveInfo() {
        delete this.password;
        return this;
    }
}

module.exports = User;
