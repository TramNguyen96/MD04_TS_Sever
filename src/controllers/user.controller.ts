import UserModel from '../models/user.model'
import { Request, Response } from 'express';

export default {
  getUsers: (req: Request, res: Response) => {
    const users = UserModel.getUsers(); // Sử dụng hàm từ model để lấy danh sách người dùng
    res.json(users);
  },
};