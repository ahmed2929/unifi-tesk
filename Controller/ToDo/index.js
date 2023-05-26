const {
  successResMsg,
  errorResMsg
} = require("../../Utils/Request/index");
const {getUser} =require("../../Services/User/index")
const {AddToDo,UpdateToDoById,DeleteToDoById,GetToDoById,GetToDos} =require("../../DB/Functions/Todo/index")
  exports.CreateToDo = async (req, res) => {
 
    try {
      const {
        Owner,
        Description,
        Title,
      }=req.body  

      const user = await getUser(Owner)
      if(!user){
        return errorResMsg(res, 400, req.t("User_not_found"));
      }
      const todo = await AddToDo({
        Owner,
        Description,
        Title,
      })
      if(!todo){
        return errorResMsg(res, 400, "ToDo_not_created");
      }
      // return successful response
      return successResMsg(res, 200, {message:"ToDo_Created",data:todo});
      
    } catch (err) {
      // return error response
      console.log(err)
      return errorResMsg(res, 500, err);
    }
  };
  
  exports.EditToDo = async (req, res) => {
 
    try {
      const {
        todoId,
        Description,
        Title,
      }=req.body  

      const UpdatedTodo = await UpdateToDoById(todoId,{
        Description,
        Title,
      })
      if(!UpdatedTodo){
        return errorResMsg(res, 400, "ToDo_Can_not_be_edited");
      }
      // return successful response
      return successResMsg(res, 200, {message:"ToDo_edited",data:UpdatedTodo});
      
    } catch (err) {
      // return error response
      console.log(err)
      return errorResMsg(res, 500, err);
    }
  };

  exports.DeleteToDo = async (req, res) => {
 
    try {
      const {
        todoId,
      }=req.body  

      const DeletedToDo = await DeleteToDoById(todoId)
      if(!DeletedToDo){
        return errorResMsg(res, 400, "ToDo_Can_not_be_deleted");
      }
      // return successful response
      return successResMsg(res, 200, {message:"ToDo_deleted"});
      
    } catch (err) {
      // return error response
      console.log(err)
      return errorResMsg(res, 500, err);
    }
  };

  exports.GetToDo = async (req, res) => {
 
    try {
      const {
        id,
      }=req.query  
      if(id){
        const todo = await GetToDoById(id)
        if(!todo){
          return errorResMsg(res, 400, "ToDo_not_found");
        }
        // return successful response
        return successResMsg(res, 200, {data:todo});
      }else{
        // pagination logic needs to be implemented
        const ToDos = await GetToDos()
        if(!ToDos){
          return errorResMsg(res, 400, "ToDos_not_found");
        }
        // return successful response
        return successResMsg(res, 200, {data:ToDos});
      }
      
    } catch (err) {
      // return error response
      console.log(err)
      return errorResMsg(res, 500, err);
    }
  };

  