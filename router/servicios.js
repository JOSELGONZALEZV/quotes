//const { render } = require('ejs');
const { Router } = require('express');
//const quotes = require("../bd");
const { Cite_impdb } = require('../db');
const router = Router();

/*router.get("/",(req,res)=>{
	res.render('index');

});

router.get("/quotes", (req,res)=>{
	res.render('quotes',{quotes:quotes})
});

/*router.post("/quotes",(req,res)=>{
	res.render('quotes',{quotes:quotes});
});

router.post("/quotes",(req,res)=>{
	const newquote = req.body
	quotes.push(newquote)
	console.log(quotes)
	res.render("quotes", {quotes:quotes})
});*/

router.get ('/', async (req,res)=>{

	const cities_exprut = await Cite_impdb.findAll();

	let mensaje = req.flash("mensaje");
	let error = req.flash("error");

	res.render('index.ejs', {quotes: cities_exprut, mensaje, error});
});

router.get ('/quotes', async (req,res)=>{

	let mensaje = req.flash("mensaje");
	let error = req.flash("error");

	const cities_exprut = await Cite_impdb.findAll();
	res.render('quotes.ejs', {quotes: cities_exprut, mensaje, error})
});


router.post('/quotes', async (req,res) => {
	
	let existeError = false

if (req.body.author == "") {
	req.flash("error", "se requiere que ingrese el autor de la cita");
	existeError = true;
}
if (req.body.quote == "") {
	req.flash("error", "se requiere que ingrese la cita del autor ingresado")
}

if(existeError != true){

	const dat_db = req.body
	const new_Cite = await Cite_impdb.create({
		author: dat_db.author,
		quote: dat_db.quote
	});
	req.flash("mensaje", "la cita ha sido creada en la base de datos")
}
	const cities_exprut = await Cite_impdb.findAll();
	res.render('quotes.ejs',{quotes: cities_exprut, mensaje, error})

});

router.get('/delete/:id', async (req,res) => {
	
	const cite_elim = await Cite_impdb.findByPk(req.params.id);
	await cite_elim.destroy();
	req.flash("mensaje", `la cita del autor: ${cite_elim.author}, ha sido eliminada`);
	res.redirect("/");
});



router.post('/edit/:id' , async (req,res) => {
	
	const cites_editrut = await Cite_impdb.findByPk(req.params.id);
	cites_editrut.author = req.body.author;
	cites_editrut.quote = req.body.quote;
	await cites_editrut.save();
	res.redirect("/quotes");
});

router.get('/edit/:id', async (req, res)=>{
	const cites_editrut = await Cite_impdb.findByPk(req.params.id);
	res.render('edit', {cites_arutedit: cites_editrut});
});
module.exports = router;
