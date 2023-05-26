const {
    body,
    validationResult,
} = require('express-validator');

exports.CreateToDo = () => {
    return [
        body("title").notEmpty().withMessage("title_is_required"),
        body("owner").notEmpty().withMessage("Owner_id_is_required").isMongoId().withMessage("invalid_user_id")

    ]
}

exports.EditToDo = () => {
    return [
        body("todoId").notEmpty().withMessage("todoId_is_required").isMongoId().withMessage("invalid_todoId_id")

    ]
}

exports.DeleteToDo = () => {
    return [
        body("todoId").notEmpty().withMessage("todoId_is_required").isMongoId().withMessage("invalid_todoId_id")

    ]
}






exports.validate = (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({
            [err.param]: req.t(err.msg)
        }))
        return res.status(422).json({
            errors: extractedErrors,
        })
  
    } catch {
        res.status(500).json({
            error: "unexpected error",
            status: "error"
        })
    }
}