const _service = require('./service/proyectoServicio')
const _service1 = require('./service/form')
const express = require('express')
const app = express()
const port = 3000
const service = new _service()
const service1 =new _service1()

app.use(express.json());

app.post('/create_proyecto', async (req, res) => { //Crear
  try {
    const nuevoProyecto = await service.crear_proyecto(req.body)
    let datos_para_enviar = JSON.stringify(nuevoProyecto.rows[0])
    res.send(`{"message":"", "data": ${datos_para_enviar}}`);
  } catch (err) {
    console.error(err.message);
    res.send(req.body);
  }
});
app.put('/actualizar_proyecto/:id',async (req, res)=>{ //Actualizar
    try {
      let {id} = req.params
      const proyectoActualizado = await service.update_proyecto(id, req.body)
      console.log(proyectoActualizado)
      res.send(`{"message":"Actualizacion Realizada", "data":true}`);
    } catch (error) {
      console.error(error.message);
      res.send(`{"message":"Los cambios no fueron guardados", "data":false}`);
    }
});
app.get('/obtener_proyectos', async (req, res) => { //Obtener
  try {
    const nuevoProyecto = await service.get_volunteer_data(req);
    let datos_para_enviar = JSON.stringify(nuevoProyecto.rows[0])
    res.send(`{"message":"", "data": ${datos_para_enviar}}`);
  } catch (err) {
    console.error(err.message);
    res.send(`{ "message": "No existe proyectos"", "data": ""}`);
  }
})


app.post('/extended_form', async (req, res) => {
  try {
    const newVolunteer = await service1.register_changes(req.body)
    let data_to_send = JSON.stringify(newVolunteer.rows[0])
    res.send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res.send('{ "message": "Check the info that you sending", "data": ""}');
  }
});
app.put('/extended_form/:id',async (req, res)=>{
    try {
      let {id} = req.params
      const changedVolunteer = await service1.do_changes(id, req.body)
      console.log(changedVolunteer)
      res.send(`{"message":"Succesfully Updated!", "data":true}`);
    } catch (error) {
      console.error(error.message);
      res.send(`{"message":"Changes are not commited", "data":false}`);
    }
});
app.get('/extended_form/:id', async (req, res) => {
  try {
    const newVolunteer = await service1.get_volunteer_data(req);
    let data_to_send = JSON.stringify(newVolunteer.rows[0])
    res.send(`{"message":"", "data": ${data_to_send}}`);
  } catch (err) {
    console.error(err.message);
    res.send(`{ "message": "The volunteer with id ${req.params[0]}"", "data": ""}`);
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
