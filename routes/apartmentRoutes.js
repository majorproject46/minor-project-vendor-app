const { isLoggedIn } = require("../middlewares/authMiddlewares");
const Vendor = require("../models/vendor");
const Apartment = require("../models/apartment");

module.exports = app => {
    app.post("/products/joinApartment", isLoggedIn, async (req, res) => {
        try {
            const { apartmentId } = req.body;
            const { userId } = req;
            const vendor = await Vendor.findById(userId);
            const apartment = await Apartment.findById(apartmentId);
            if (vendor.apartments === null) {
                vendor.apartments = new Array();
            }
            vendor.apartments.push(apartmentId);
            if (apartment.vendors === null) {
                apartment.vendors = new Array();
            }
            apartment.vendors.push(userId);
            const response = await vendor.save();
            const response2 = await apartment.save();
            console.log(response, response2);
            res.send({ ...response._doc, password: null });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.get("/products/getApartments", isLoggedIn, async (req, res) => {
        try {
            const apartments = await Apartment.find(
                {},
                { name: 1, apartmentImage: 1, city: 1 }
            );
            res.send({ apartments });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post("/products/getApartmentDetails", isLoggedIn, async (req, res) => {
        try {
            const apartment = await Apartment.findById(req.body.id);
            res.send({ apartmentDetails: apartment });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });
};
