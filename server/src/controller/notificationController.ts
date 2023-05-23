import { Request, Response, NextFunction } from "express"
import Notification from "../models/notification";

// fetch user-specific wishes
const getUserNotifications = async (req: Request, res: Response) => {
    try {
        const userid = req.params.userid;
    
        const notifications = await Notification.find({ customer: userid }).sort({ createdAt: -1 });
    
        res.json(notifications);
      } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'Server error' });
      }
};

export default { getUserNotifications }