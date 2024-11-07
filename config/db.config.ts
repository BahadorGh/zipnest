import { Sequelize } from "sequelize";

const db_url = 'postgres://postgres:bahador@localhost:5432/zipblock'

console.log(db_url);
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'bahador',
    database: 'zipblock',

})


sequelize.authenticate().then(async () => {
    await sequelize.sync({ alter: true });
    console.log('Connected to Postgress');
}).catch((error) => {
    console.log("Cannot connect to Postgress,error:", error/*?.message*/);
})


export default sequelize; 