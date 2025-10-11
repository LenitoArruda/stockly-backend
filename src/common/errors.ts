export class NotFoundError extends Error {
    constructor(entity: string, key: string, attribute: string = "id") {
        super(`Entity ${entity} with ${attribute} ${key} not found`);
    }
}

export class AlreadyExistsError extends Error {
    constructor(entity: string, key: string, attribute: string = "name") {
        super(`Entity ${entity} with ${attribute} ${key} already exists`);
    }
}