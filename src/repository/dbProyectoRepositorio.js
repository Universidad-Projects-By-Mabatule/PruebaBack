const { text } = require('express');
const {Pool}= require('pg');


const config = {
    user: 'postgres',
    host: 'localhost',
    password:'admin',
    database:'library'
};
const pool= new Pool (config);

module.exports= pool
class DbHandler{

    get_proyecto = async() => {
        const proyectos = await pool.query("SELECT * FROM public.proyectos");
        //console.log(proyectos.rows);
        
        return proyectos 
    };
    crear_proyecto_ii = async(_id, _nro_Participante, _nombre) => {
            
        const text= 'INSERT INTO public.proyectos(id, nro_participantes, nombre_proyecto) VALUES ($1, $2, $3)'
        const values = [_id,_nro_Participante,_nombre];
        const proyecto = await pool.query(text,values);
        //console.log(proyectos);
        
        return proyecto        
    };
    actualizarParticipantesDelProyecto = async(id) => {
            
        const text= 'UPDATE public.proyectos a SET nro_participantes=nro_participantes+1 WHERE id = $1'
        const values = [id];
        const participants = await pool.query(text,values);
        //console.log(participants);
        
        return participants        
    };
}
module.exports = DbHandler


//module.exports = DbProyectoRepositorio