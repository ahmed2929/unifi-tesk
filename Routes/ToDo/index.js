const express = require("express");
const router = express.Router();
const ToDoController = require("../../Controller/ToDo/index");
const validation = require("../../Validation/ToDo/index");

router.post(
    "/",
    validation.CreateToDo(),
    validation.validate,
    ToDoController.CreateToDo
);


router.put(
    "/",
    validation.EditToDo(),
    validation.validate,
    ToDoController.EditToDo
);

router.delete(
    "/",
    validation.DeleteToDo(),
    validation.validate,
    ToDoController.DeleteToDo
);
router.get(
    "/",
    ToDoController.GetToDo
);


module.exports = router;







  