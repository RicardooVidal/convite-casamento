const express = require('express');
const router = express.Router();
const path = require('path');
const Login = require('../app/Login');
const Guests = require('../app/Guests');
const auth = require('../auth.js');
const { header } = require('express/lib/request');

router.get('/login', (req, res, next) => {
	res.render("login");
})

router.get('/', async (req, res, next) => {
	res.redirect("/login");
})

router.get('/invite', async (req, res, next) => {
	let id = req.query.guest;
	let response = {
		nome: '',
		confirmacao: false
	}
	let err = new Error('Convite inexistente ou indisponível');
	err.status = 403;

	if (!id) {
		return next(err);
	}

	let guest = new Guests();
	let guestObj = await guest.find(id);

	if (guestObj) {
		if (guestObj.nome) {
			response = {
				id: guestObj.id,
				nome: guestObj.nome,
				confirmacao: guestObj.confirmacao
			}
		}
	}

	res.render("index", {response});
});

router.post('/confirm', async (req, res, next) => {
	let id = req.body.id;

	let guests = new Guests();
	let status = await guests.confirm(id);

	res.send(status);
})

router.get('/convidados', auth.isAuthorized, async (req, res, next) => {
	let guests = new Guests();
	let data = await guests.getAll();
	let status = {}
	// data.guests.forEach(function(convidado, i) {
	// 	console.log(i, convidado);
	// })
	res.render("convidados", {data, status});
})

router.post('/convidados', auth.isAuthorized, async (req, res, next) => {
	let nome = req.body.nome;
	let sobrenome = req.body.sobrenome;
	
	let guests = new Guests();
	await guests.insertGuest(nome, sobrenome);
	res.redirect("/convidados?token=" + req.query.token);
})

router.delete('/convidados', auth.isAuthorized, async (req, res, next) => {
	let id = req.body.id;
	
	let guests = new Guests();
	let status = await guests.deleteGuest(id);

	if (status.error) {
        let err = new Error('Não foi possível deletar');
        err.status = 500;
        return next(err);
	}

	res.send(status);
})

router.post('/login', async (req, res, next) => {
	let login = req.body.login;
	let password = req.body.password;
	
	let loginAuth = new Login(login, password);
	let token = await loginAuth.authenticate()

	res.send(token);
})

module.exports = router
