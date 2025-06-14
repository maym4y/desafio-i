const Task = require('../models/task');


exports.createTask = async (req, res) => {
    console.log("criando task...")
    try {
        const { name, isDone } = req.body;
        const task = new Task({ name, isDone });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().populate('name', 'isDone');
        res.status(200).json(tasks);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, isDone } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(id, { name, isDone }, { new: true });
        if (!updatedTask) return res.status(404).json({ message: 'Tarefa não encontrada' });

        res.status(200).json(updatedTask);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) return res.status(404).json({ message: 'Tarefa não encontrado' });

        res.status(200).json({ message: 'Tarefa excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};