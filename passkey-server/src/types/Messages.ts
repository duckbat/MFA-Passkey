type MessageResponse = {
  message: string;
}

type ErrorResponse = MessageResponse & {
  stack?: string;
}

export {MessageResponse, ErrorResponse};
