export class NotFoundError extends Error {
    constructor(entity: string, key: string, attribute: string = "id") {
        super(`${entity} with ${attribute} ${key} not found`);
    }
}

export class AlreadyExistsError extends Error {
    constructor(entity: string, key: string, attribute: string = "name") {
        super(`${entity} with ${attribute} ${key} already exists`);
    }
}