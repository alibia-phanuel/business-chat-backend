import { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import User from "../models/User";
import argon2 from "argon2";
/**
 * Interface du corps de requête pour les utilisateurs.
 */
interface UserBody {
  name: string;
  email: string;
  password: string;
  role: string;
  confPassword: string; // Ajout de la propriété manquante
}

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error: any) {
    next(error instanceof Error ? error : new Error(String(error)));
    res.status(500).json({ msg: error.message });
  }
};
export const createUser = async (
  req: Request<{}, {}, UserBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, email, password, confPassword, role } = req.body;

    if (!password || !confPassword) {
      res.status(400).json({ msg: "Le mot de passe est requis" });
      return;
    }

    if (password !== confPassword) {
      res.status(400).json({
        msg: "Le mot de passe et la confirmation ne correspondent pas",
      });
      return;
    }

    const hashPassword = await argon2.hash(password);

    await User.create({
      uuid: uuidv4(), // Génère un UUID unique
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(201).json({ msg: "Utilisateur créé avec succès" });
  } catch (error: any) {
    next(error instanceof Error ? error : new Error(String(error)));
    res.status(400).json({ msg: error.message });
  }
};
export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<UserBody>>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) res.status(404).json({ msg: "Utilisateur non trouvé" });
    const { name, email, password, confPassword, role } = req.body;
    let hashPassword;
    if (password === "" || password === null) {
      hashPassword = user?.password;
    } else {
      hashPassword = await argon2.hash(password ?? "");
    }
    if (password !== confPassword)
      res.status(400).json({
        msg: "Le mot de passe et la confirmation du mot de passe ne peuvent pas être utilisés",
      });

    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user?.id,
        },
      }
    );
    res.status(200).json({ msg: "Utilisateur mis à jour" });
  } catch (error: any) {
    next(error instanceof Error ? error : new Error(String(error)));
    res.status(400).json({ msg: error.message });
  }
};
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!user) res.status(404).json({ msg: "User tidak ditemukan" });
    await User.destroy({
      where: {
        id: user?.id,
      },
    });
    res.status(200).json({ msg: "Utilisateur supprimé" });
  } catch (error: any) {
    next(error instanceof Error ? error : new Error(String(error)));
    res.status(400).json({ msg: error.message });
  }
};
