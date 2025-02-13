import Products from "../models/Product";
import User from "../models/User";
// Importation des types nécessaires depuis Express
import { Request, Response, NextFunction } from "express";

interface ProductRequestBody {
  name: string;
  price: number;
  userId: number;
}
interface UserProps extends Request {
  role?: string;
  userId?: string | number;
}
interface ProductParams {
  id: string;
}
/**
 * Contrôleur pour afficher la page d'accueil.
 * @param req - Objet de requête HTTP.
 * @param res - Objet de réponse HTTP.
 * @param next - Fonction pour passer au middleware suivant (gestion des erreurs).
 */

export const getProducts = async (
  req: UserProps,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // code
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        include: [
          {
            model: User,
          },
        ],
      });
    } else {
      response = await Products.findAll({
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error: any) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
    res.status(500).json({ msg: error.message });
  }
};
export const getProductById = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // code
  } catch (error) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
export const createProduct = async (
  req: Request<{}, {}, ProductRequestBody>, // Typage du body
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // code
  } catch (error) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
export const updateProduct = async (
  req: Request<ProductParams, {}, ProductRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // code
  } catch (error) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
export const deleteProducts = async (
  req: Request<ProductParams>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // code
  } catch (error) {
    // Transmission de l'erreur au middleware global
    next(error instanceof Error ? error : new Error(String(error)));
  }
};
