import expressJwt from 'express-jwt';
import dotenv from 'dotenv';

dotenv.config();

const jwtMiddleware = expressJwt({
  secret: process.env.JWT_SECRET || 'secret',
  algorithms: ['HS256']
}).unless({
  path: ['/login', '/register']
});

export default jwtMiddleware;
