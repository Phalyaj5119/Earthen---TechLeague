// models/WalletTransaction.js
module.exports = (sequelize, DataTypes) => {
  const WalletTransaction = sequelize.define("WalletTransaction", {
    type: {
      type: DataTypes.ENUM('CREDIT', 'DEBIT'),
      allowNull: false
    },
    amount: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING
    }
  });

  WalletTransaction.associate = (models) => {
    WalletTransaction.belongsTo(models.User, { foreignKey: 'userId' });
  };

  // 🧬 GraphQL type definition
  WalletTransaction.graphql = {
    typeDef: `
      type WalletTransaction {
        id: ID!
        type: String!
        amount: Float!
        description: String
        createdAt: String
        updatedAt: String
        userId: ID!
      }

      extend type Query {
        walletTransactions: [WalletTransaction]
        walletTransaction(id: ID!): WalletTransaction
      }
    `,
    resolvers: {
      Query: {
        walletTransactions: async (_, __, { db }) => {
          return await db.WalletTransaction.findAll();
        },
        walletTransaction: async (_, { id }, { db }) => {
          return await db.WalletTransaction.findByPk(id);
        }
      }
    }
  };

  return WalletTransaction;
};
