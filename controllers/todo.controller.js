const todoModel = require('../modal/todo.model');




const createTodo = async (req, res) => {
    const { title, text } = req.body;
    if (!title || !text) {
        return res.status(400).json({ err: "title or text required" })
    }
    try {
        const newTodo = await new todoModel({ title: title, text: text });
        const resp = await newTodo.save();
        return res.status(200).json({ message: "todo created", data: resp });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}


const getSingletodo = async (req, res) => {
    try {
        const resp = await todoModel.findById(req.params.id);
        return res.status(200).json({ message: "todo", data: resp });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}



const getAllTodo = async (req, res) => {
    console.log('iji');
    try {
        const resp = await todoModel.find({});
        return res.status(200).json({ message: "todo list", data: resp });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}



const deleteTodoById = async (req, res) => {
    try {
        const resp = await todoModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "todo deleted", data: resp });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}



const updateTodo = async (req, res) => {
    try {
        const resp = await todoModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        return res.status(200).json({ message: "toto updated", data: resp });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}


module.exports = {
    createTodo,
    getSingletodo,
    getAllTodo,
    updateTodo,
    deleteTodoById
}





