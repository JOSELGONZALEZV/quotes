/*
const quotes = [
    {author: 'Jhon Lennon', quote:'"Haz el amor y no la gerra"'},
    {author: 'Jacinto Benavente', quote:'"Lo peor que hacen los malos es obligarnos a dudar de los buenos"'},
    {author: 'Albert Einstein', quote:'"Cada día sabemos más y entendemos menos"'},
    {author: 'Lao Tsé', quote:'"Si das pescado a un hombre hambriento lo nutres durante una jornada. Si le enseñas a pescar, le nutrirás toda su vida"'},
]
module.exports = quotes;
*/
const Sequelize = require('sequelize');
const clave = require('./elemento')

const sql = new Sequelize('cites_dbs', 'root', clave.password, {
    host: 'localhost',
    dialect: 'mysql'
});

const Cite_impdb = sql.define('quotes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false
    },
    quote: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { timestamps: true });

sql.sync()
    .then(() => {
        console.log('Base de datos y tablas creadas');

    });

module.exports = {
    Cite_impdb,
};