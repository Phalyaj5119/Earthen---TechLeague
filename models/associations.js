// Customer and Order (One-to-Many)
Customer.hasMany(Order);
Order.belongsTo(Customer);

// Product and OrderItem (One-to-Many)
Product.hasMany(OrderItem);
OrderItem.belongsTo(Product);

// Order and OrderItem (One-to-Many)
Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

// Product and Category (Many-to-Many)
Product.belongsToMany(Category, { through: ProductCategory });
Category.belongsToMany(Product, { through: ProductCategory });

// Customer and ProductReview (One-to-Many)
Customer.hasMany(ProductReview);
ProductReview.belongsTo(Customer);

// Product and ProductReview (One-to-Many)
Product.hasMany(ProductReview);
ProductReview.belongsTo(Product);

// Role and Permission (Many-to-Many)
Role.belongsToMany(Permission, { through: RolePermission });
Permission.belongsToMany(Role, { through: RolePermission });
// Role and Permission (Many-to-Many)