class ApiError extends Error {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;

  constructor(message : string, statusCode : number = 500, code = "API_ERROR") {
    super(message);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthError extends ApiError {
  constructor(
    message = "Please authenticate yourself first",
    statusCode = 401,
    code = "AUTH_ERROR",
  ) {
    super(message, statusCode, code);
  }
}

export class RedisError extends ApiError {
  constructor(
    message = "Redis service unavailable",
    statusCode = 503,
    code = "REDIS_ERROR",
  ) {
    super(message, statusCode, code);
  }
}

export default ApiError;
