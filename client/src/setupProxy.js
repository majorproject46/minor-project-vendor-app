const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(proxy("/auth/userSignIn", { target: "http://localhost:5000/" }));
    app.use(proxy("/auth/createUser", { target: "http://localhost:5000/" }));
    app.use(proxy("/auth/currentUser", { target: "http://localhost:5000/" }));
    app.use(proxy("/auth/logout", { target: "http://localhost:5000/" }));
    app.use(
        proxy("/products/addProduct", { target: "http://localhost:5000/" })
    );
    app.use(
        proxy("/products/getProducts", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/products/getProduct", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/products/deleteProduct", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/products/getApartments", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/products/getApartmentDetails", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/products/joinApartment", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/orders/getOrders", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/orders/getLinkedApartments", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("orders/getOrdersByApartment", {
            target: "http://localhost:5000/"
        })
    );
    app.use(
        proxy("/orders/getOrderDetails", {
            target: "http://localhost:5000/"
        })
    );
};
