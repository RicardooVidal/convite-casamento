const Usuario = require("../models/usuario");
const crypto = require("crypto");
const { 
    v1: uuidv1,
  } = require('uuid');

class Login {
    constructor(login, password) {
        this.login = login;
        this.password = password;
    }

    async authenticate() {
        let user = await Usuario.findOne({
            where: {login: this.login}
        });
        let token = crypto.randomBytes(16).toString("hex");
        let response = {
            "token": null
        }

        if (user) {
            user.token = '';

            if (user.password == this.password) {
                user.token = token;
    
                response = {
                    "token": token
                }
            }
    
            const status = await user.save();

            if (status) {
                return response;
            }
        }

        throw new TypeError('Não foi possível fazer o login');
    }
}

module.exports = Login;