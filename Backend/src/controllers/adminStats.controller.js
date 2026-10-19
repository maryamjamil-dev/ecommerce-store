const User = require("../model/user.model");
const Product = require("../model/product.model");
const Category = require("../model/category.model");
const Order = require("../model/order.model");

// GET /api/admin/stats
exports.getAdminStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalProducts,
      totalCategories,
      totalOrders,
      pendingOrders,
      processingOrders,
      deliveredOrders,
      cancelledOrders,
      recentOrders,
      salesResult,
    ] = await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Category.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: "pending" }),
      Order.countDocuments({ status: "processing" }),
      Order.countDocuments({ status: "delivered" }),
      Order.countDocuments({ status: "cancelled" }),

      Order.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("-__v")
        .lean(),

      Order.aggregate([
        { $match: { status: "delivered" } },
        {
          $group: {
            _id: null,
            totalSales: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);

    const totalSales = salesResult[0]?.totalSales || 0;

    return res.status(200).json({
      success: true,
      message: "Admin dashboard statistics fetched successfully",
      data: {
        overview: {
          totalUsers,
          totalProducts,
          totalCategories,
          totalOrders,
          totalSales,
        },
        orders: {
          pending: pendingOrders,
          processing: processingOrders,
          delivered: deliveredOrders,
          cancelled: cancelledOrders,
        },
        recentOrders,
      },
    });
  } catch (error) {
    console.error("Admin Stats Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch admin dashboard statistics",
    });
  }
};
