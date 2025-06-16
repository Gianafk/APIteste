import express from "express";

const app = express();
app.use(express.json());
const PORT = 3000;

let usuarios = [
    {id: 1, nome: 'Daniel'}
];

app.get('/', (req, res) => {
    res.send('Seja Bem vindo');
});

app.get('/usuarios', (req, res) =>{
    res.json(usuarios)
});

app.post('/usuarios', (req, res) =>{
    const novoUsuario = req.body;
    
    const existe = usuarios.some(u => u.id === novoUsuario.id);
    if (existe){
        return res.status(400).json({ erro: 'Usuário já existente'});
    }
    usuarios.push(novoUsuario);
    res.status(201).json(novoUsuario);
});

app.put('/usuarios/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1){
        usuarios[index] = {
        ...usuarios[index],
        ...req.body,
        id: usuarios[index].id
        }
        res.json(usuarios[index]);
    } else {
        res.status(404).json({ mensagem: 'Usuário não encontrado' });
    }
});

app.delete('/usuarios/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const index = usuarios.findIndex(u => u.id === id);
    if (index !== -1){
        const deletado = usuarios.splice(index, 1);
        res.json(deletado[0])
    } else {
        res.status(404).json({mensagem: 'Usuário não encontrado'});
    }
});

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na PORTA ${PORT}`);
});