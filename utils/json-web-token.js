import jwt from 'jsonwebtoken';

const createToken = ({ secret, expires, id }) =>
  jwt.sign({ data: id }, secret, { expiresIn: expires });

export default createToken;
