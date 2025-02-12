// Importation des types et de Sequelize
import { DataTypes, Sequelize } from "sequelize";

// Importation de l'instance de connexion à la base de données
import sequelize from "../config/db";

// Importation du modèle Users pour gérer la relation avec les produits
import Users from "./User";

// Définition du modèle "Products"
const Products = sequelize.define(
  "product", // Nom du modèle (nom de la table en base)
  {
    // Champ UUID (identifiant unique pour chaque produit)
    uuid: {
      type: DataTypes.STRING, // Type STRING (UUID stocké en tant que texte)
      defaultValue: DataTypes.UUIDV4, // Génération automatique d'un UUID
      allowNull: false, // Champ obligatoire
      validate: {
        notEmpty: true, // Vérifie que la valeur n'est pas vide
      },
    },

    // Champ "name" (nom du produit)
    name: {
      type: DataTypes.STRING, // Type STRING
      allowNull: false, // Champ obligatoire
      validate: {
        notEmpty: true, // Vérifie que la valeur n'est pas vide
        len: [3, 100], // Le nom doit contenir entre 3 et 100 caractères
      },
    },

    // Champ "price" (prix du produit)
    price: {
      type: DataTypes.INTEGER, // Type INTEGER (nombre entier pour stocker le prix)
      allowNull: false, // Champ obligatoire
      validate: {
        notEmpty: true, // Vérifie que la valeur n'est pas vide
      },
    },

    // Clé étrangère "userId" (identifiant de l'utilisateur qui possède le produit)
    userId: {
      type: DataTypes.INTEGER, // Type INTEGER (correspond à l'ID d'un utilisateur)
      allowNull: false, // Champ obligatoire
      validate: {
        notEmpty: true, // Vérifie que la valeur n'est pas vide
      },
    },
  },
  {
    freezeTableName: true, // Empêche Sequelize de modifier le nom de la table (pas de mise au pluriel automatique)
  }
);

// Définition de la relation : Un utilisateur (Users) peut avoir plusieurs produits (Products)
Users.hasMany(Products); // Un utilisateur peut posséder plusieurs produits

// Définition de la relation : Un produit appartient à un utilisateur
Products.belongsTo(Users, { foreignKey: "userId" }); // Le champ userId fait référence à Users

// Exportation du modèle pour l'utiliser dans d'autres fichiers
export default Products;
