"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
function validateDto(dtoClass) {
    return (req, res, next) => {
        const dtoInstance = (0, class_transformer_1.plainToInstance)(dtoClass, req.body);
        (0, class_validator_1.validate)(dtoInstance).then((errors) => {
            if (errors.length > 0) {
                const errorMessages = errors.map(error => Object.values(error.constraints || '')).flat();
                return res.status(400).json({ errors: errorMessages });
            }
            else {
                req.body = dtoInstance;
                next();
            }
        });
    };
}
exports.validateDto = validateDto;
