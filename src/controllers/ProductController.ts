import Products from "../models/Product";
// Importation des types nécessaires depuis Express
import { Request, Response, NextFunction } from "express";
interface ProductRequestBody {
  name: string;
  price: number;
  userId: number;
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
  req: Request,
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
