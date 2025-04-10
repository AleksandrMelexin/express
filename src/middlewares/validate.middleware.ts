import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

export function useValidateMiddleware(classToValidate: ClassConstructor<object>) {
    return ({ body }: Request, res: Response, next: NextFunction) => {
        const instance = plainToClass(classToValidate, body);
        validate(instance).then((errors) => {
        if (errors.length > 0) {
            const message = errors.pop()?.constraints;
            res.status(422).send({ err: message });
        } else {
            next();
        }
        });   
    }
}