interface ResponseStatus {
    code: string
    message: string
    status: string
}


interface BaseResponse {
    responseStatus: ResponseStatus
}


interface User {
    image: string;
    latestMessage: Message;
    id: Number
    username: string
    firstname: string
    lastname: string
    email: string
    contactNumber: string
    profileStatus: string
    password: string
}

interface ConnectionsResponse extends BaseResponse {
    token: string
    connections: User[]
}

interface LoginResponse extends BaseResponse {
    token: string
    userProfile: User
}

interface RegisterUserResponse extends BaseResponse {
    user: User
}

interface Message {
    from: Number
    to: Number
    message: string
    timestamp: Number
}

export type {User, Message, LoginResponse, RegisterUserResponse, ConnectionsResponse}
