const Convidado = require("../models/convidado");
const crypto = require("crypto");
const { 
    v1: uuidv1,
  } = require('uuid');

class Guests {
    constructor() {}

    async find(id) {
        if (!id) {
            return {
                'error': 'Informe um id'
            }
        }

        let guest = await Convidado.findByPk(id)
            .then((data) => {
                return data;
            })

        if (guest) {
            return guest
        }

        return {}
    }

    async getAll() {
        let guests = await Convidado.findAll()
            .then((data) => {
                return data;
            })
            .catch((err) => {
                console.log(err);
            })
        let token = crypto.randomBytes(16).toString("hex");
        let response = {
            "guests": null
        }

        if (guests) {
            response = {
                "guests": guests
            }
        }

        return response;
    }

    async insertGuest(nome, sobrenome) {
        if (nome.length < 3) {
            return {
                'error': 'Favor, informar um nome ou apelido válido'
            }
        }

        let id = crypto.randomBytes(16).toString("hex");
        let link = '/invite?guest=' + id;
        let status = await Convidado.create({
            id,
            nome,
            sobrenome,
            link
        })
        .then((data) => {
            return {
                'success': 'ok'
            }
        })
        .catch((err) => {
            return {
                'error': err
            }
        })

        return status;
    }

    async confirm(id) {
        if (!id) {
            return {
                'error': 'Informe um id'
            }
        }

        let guest = await Convidado.findByPk(id);
        guest.confirmacao = 1;
        let save = await guest.save();

        if (save) {
            return {
                'success': 'Obrigado por confirmar!'
            }
        }
    }

    async deleteGuest(id) {
        if (!id) {
            return {
                'error': 'Informe um id'
            }
        }

        let guest = await Convidado.findByPk(id);
        let status = await guest.destroy();

        if (status) {
            return {
                'success': 'Removido com sucesso.'
            }
        }

        return {
            'error': 'Não foi possível deletar'
        }
    }
}

module.exports = Guests;