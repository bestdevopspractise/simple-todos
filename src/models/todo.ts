import mongoose from "mongoose"

// define todo interface
interface Todo {
    item: string,
    status?: string,
    author: string
};

//extend mongoose document to include attributes of Todo interface

interface TodoDoc extends mongoose.Document {
    item: string,
    status: string,
    author: string
}

// extend mongoose model to add build method 
interface TodoModel extends mongoose.Model<TodoDoc>{
    build(Attr: Todo):TodoDoc
}


const todoSchema = new mongoose.Schema<TodoDoc>({
    item: {type: String, required: true},
    status: {type: String, enum: ['done', 'cancelled', 'in-progress'], default: 'in-progress'},
    author: {type: String, required: true}
})

todoSchema.statics.build = (attr:Todo) =>{
    return new Todo(attr);
};

const Todo = mongoose.model<TodoDoc, TodoModel>('Todo', todoSchema);

export default Todo;