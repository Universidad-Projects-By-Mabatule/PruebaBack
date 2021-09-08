const Pool = require("pg").Pool

const pool = new Pool
({
    user: "postgres",
    password: "yigadrian",
    database: "volunteer_database",
    host: "localhost",
    port: 5432 
})

module.exports= pool
class DbProyectoRepositorio
{
    constructor()
    {
        this.cursor = null;
    } 

    async get_proyecto(data)
    {
        const proyectos = await pool.query("SELECT * FROM proyecto_data")
        return proyectos        
    }
    async crear_proyecto_ii(data)
    {
        const {nombre_proyecto}= data
        const new_proyeto = await pool.query("INSERT INTO proyecto_data (nombre_proyecto) VALUES ($1) RETURNING *",
        [nombre_proyecto])
    }

    async update_proyecto(id,data)
    {
        console.log(id)
        const {nombre_proyecto}=data
        const proyecto_a_actualizar = await pool.query("UPDATE proyecto_data SET nombre_proyecto=$1 WHERE proyecto_id == $8",
        [nombre_proyecto,id])
        return proyecto_a_actualizar
    }
}

module.exports = DbProyectoRepositorio