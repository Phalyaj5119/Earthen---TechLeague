// models/WishlistItem.js
module.exports = (sequelize, DataTypes) => {
  const WishlistItem = sequelize.define('WishlistItem', {});

  WishlistItem.associate = (models) => {
    WishlistItem.belongsTo(models.User, { foreignKey: 'userId' });
    WishlistItem.belongsTo(models.Product, { foreignKey: 'productId' });
  };

  // 🧬 GraphQL type definition
  WishlistItem.graphql = {
    typeDef: `
      type WishlistItem {
        id: ID!
        userId: ID!
        productId: ID!
        createdAt: String
        updatedAt: String
      }

      extend type Query {
        wishlistItems: [WishlistItem]
        wishlistItem(id: ID!): WishlistItem
      }
    `,
    resolvers: {
      Query: {
        wishlistItems: async (_, __, { db }) => {
          return await db.WishlistItem.findAll();
        },
        wishlistItem: async (_, { id }, { db }) => {
          return await db.WishlistItem.findByPk(id);
        }
      }
    }
  };

  return WishlistItem;
};
