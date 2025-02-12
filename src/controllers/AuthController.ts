import User from "../models/User";
import "express-session";
declare module "express-session" {
  interface SessionData {
    userId?: string; // ou number selon ton modèle utilisateur
  }
}
import { Request, Response, NextFunction } from "express";
import argon2 from "argon2";
export const Login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
      return res.status(400).json({ msg: "Mot de passe erroné" });
    }
    req.session.userId = user.uuid;
    const uuid = user?.uuid;
    const name = user?.name;
    const email = user?.email;
    const role = user?.role;
    res.status(200).json({ uuid, name, email, role });
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};

export const Me = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.session.userId) {
      res.status(401).json({ msg: "Veuillez vous connecter à votre compte !" });
    }
    const user = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.session.userId,
      },
    });
    if (!user) res.status(404).json({ msg: "Utilisateur non trouvé" });
    res.status(200).json(user);
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
export const logOut = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.session.destroy((err) => {
      if (err)
        return res.status(400).json({ msg: "Impossible de se déconnecter" });
      res.status(200).json({ msg: "Vous êtes déconnecté" });
    });
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
