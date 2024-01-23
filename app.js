const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/', (req, res)=>{
    res.send(`<h1>Street Fighter</h1>
    <nav><a href="/usuarios">Listado de Usuarios</a></nav>
    <ul>
    ${usuarios.map((usuario) =>`<li>ID: ${usuario.id} | Nombre: ${usuario.nombre} | 
    Edad: ${usuario.edad} | Procedencia: ${usuario.lugarProcedencia}</li> `
        )
        .join('')}
    </ul>
    <form action="/usuarios" method="post">
        <label for="nombre">Nombre:</label><input type="text" id="nombre" name="nombre" required>
        </br>
        <label for="edad">Edad:</label><input type="text" id="edad" name="edad" required>
        </br>
        <label for="lugarProcedencia">Lugar Procedencia:</label><input type="text" id="lugarProcedencia" name="lugarProcedencia" required>
        </br>
        <button type="submit">Agregar usuario</button>
    </form>
    
    `);
});

app.get('/usuarios', (req, res)=>{
    res.send(usuarios)
})

app.post('/usuarios', (req, res)=>{
    const newUser ={
        id: usuarios.length + 1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    };
    usuarios.push(newUser);
    res.redirect('/');
})

app.get('/usuarios/:nombre', (req, res)=>{
    const usuario = usuarios.find(usuario => usuario.nombre == req.params.nombre);
    if (usuario){
        res.send(usuario)
    }
})
/*
app.put('/usuarios/:nombre', (req, res)=>{
    const idUser = usuarios.findIndex(usuario => usuario.nombre == req.params.nombre);
    usuarios[idUser] = {
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
})

app.delete('/usuarios/:nombre', (req, res)=>{
    const idUser = usuarios.findIndex(usuario => usuario.nombre == req.params.nombre);
    
})

*/


app.listen(3000, ()=>{
    console.log('Node en puerto http://localhost:3000')
})