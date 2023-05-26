const ToDo =require("../../Schema/ToDo")

const AddToDo =async (todo)=>{
    try {
        const newTodo = await ToDo.create({
            Title:todo.Title,
            Description:todo.Description,
            Owner:todo.Owner
         })

         if(newTodo){
            return newTodo
         }else{
            return false
         }
        
    } catch (error) {
        console.log(error)
        return false
        
    }



}

const UpdateToDoById =async (todoId,todo)=>{
    try {
        const todoData = await ToDo.findById(todoId)
        if(todoData){
            todoData.Title=todo.Title||todoData.Title,
            todoData.Description=todo.Description||todoData.Description,
            await todoData.save()
            return todoData
         }else{
            return false
         }

        
    } catch (error) {
        console.log(error)
        return false
        
    }

}

const DeleteToDoById =async (todoId)=>{
    try {
        const todo = await ToDo.findById(todoId)
        if(todo){
            await todo.remove()
            return true
         }else{
            return false
         }

        
    } catch (error) {
        console.log(error)
        return false
        
    }

}

const GetToDoById =async (todoId)=>{
    try {
        const todo = await ToDo.findById(todoId).populate("Owner")
        if(todo){
            return todo
         }else{
            return false
         }

        
    } catch (error) {
        console.log(error)
        return false
        
    }

}

const GetToDos =async ()=>{
    try {
        // pagination logic needs to be implemented
        const ToDos = await ToDo.find().populate("Owner")
        if(ToDos){
            return ToDos
         }else{
            return []
         }

        
    } catch (error) {
        console.log(error)
        return false
        
    }

}
module.exports={
    AddToDo,
    UpdateToDoById,
    DeleteToDoById,
    GetToDoById,
    GetToDos
}