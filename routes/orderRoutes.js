const { isLoggedIn } = require("../middlewares/authMiddlewares");
const Vendor = require("../models/vendor");
const Order = require("../models/order");
const Apartment = require("../models/apartment");
const User = require("../models/user");

module.exports = app => {
    app.post("/orders/getOrders", isLoggedIn, async (req, res) => {
        try {
            const { userId } = req;
            const vendor = await Vendor.findById(userId, {
                password: 0,
                products: 0,
                apartments: 0
            }).populate("orders");
            console.log(vendor);
            const orders = vendor.orders;
            console.log(orders);
            res.send({ orders });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });
    app.post("/orders/getOrderDetails", isLoggedIn, async (req, res) => {
        try {
            const { userId } = req;
            const { orderId } = req.body;
            const order = await Order.findById(orderId)
                .populate("orderDetails.productId")
                .populate("userId");
            console.log(order);
            res.send({ order: order._doc });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post("/orders/getApartmentOrders", isLoggedIn, async (req, res) => {
        try {
            const { apartmentId } = req.body;
            const { userId } = req;
            const orders = await Order.find({ vendorId: userId, apartmentId })
                .populate("orderDetails.productId")
                .populate("userId");
            re.send({ orders: orders._doc });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post("/orders/getLinkedApartments", isLoggedIn, async (req, res) => {
        try {
            const { userId } = req;
            const vendor = await Vendor.findById(userId).populate("apartments");
            const apartments = vendor.apartments;
            res.send({ apartments });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post("/orders/getOrdersByApartment", isLoggedIn, async (req, res) => {
        try {
            const { userId } = req;
            const { apartmentId } = req.body;
            const orders = await Order.find({
                vendorId: userId,
                apartmentId
            }).populate("userId");
            res.send({ orders });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post("/orders/getOrderDetails", isLoggedIn, async (req, res) => {
        try {
            const { orderId } = req.body;
            const order = await Order.findById(orderId)
                .populate("orderDetails.productId")
                .populate("vendorId");
            res.send({ order: order._doc });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });
};
