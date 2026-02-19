
export interface JwtPayloadWithUserId {
  userId: number;   
  iat?: number;
  exp?: number;
}