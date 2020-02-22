const { validationResult } = require("express-validator");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("format not supported"), false);
    }
};

const upload = multer({
    dest: "uploads/",
    fileFilter,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
});

const Product = require("../models/product");
const Vendor = require("../models/vendor");
const {
    addProductValidator,
    getProductValidator,
    deleteProductValidator
} = require("../validators/productValidators");
const { isLoggedIn } = require("../middlewares/authMiddlewares");

module.exports = app => {
    app.post(
        "/products/addProduct",
        isLoggedIn,
        upload.single("image"),
        addProductValidator,
        async (req, res) => {
            console.log(req.file);
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400);
                res.send({ errorMessage: "Invalid Input", errors });
            }
            try {
                console.log(req.file);
                const imageResponse = await uploadImage(req.file.path);
                fs.unlink(req.file.path, err => {
                    if (err) {
                        console.log(err);
                    }
                    console.log("file deleted");
                });
                console.log("response ", imageResponse);
                const {
                    name,
                    description,
                    price,
                    productId,
                    category
                } = req.body;
                const { userId } = req;
                const product = new Product({
                    name,
                    description,
                    price,
                    productId,
                    owner: userId,
                    productImage: imageResponse.secure_url,
                    category
                });
                const result = await product.save();
                console.log("new product", result);
                const vendor = await Vendor.findOne({ _id: userId }).populate();
                if (vendor.products === null) {
                    vendor.products = new Array();
                }
                vendor.products.push(result);
                const newVendor = await vendor.save();
                // console.log(newVendor);
                res.send({ ...result._doc, newVendor });
            } catch (error) {
                console.log(error);
                res.status(500);
                res.send({ message: error });
            }
        }
    );

    app.get("/products/getProducts", isLoggedIn, async (req, res) => {
        try {
            const { userId } = req;
            const vendor = await Vendor.findOne(
                { _id: userId },
                {
                    products: [
                        {
                            _id: 1,
                            name: 1,
                            price: 1,
                            productImage: 1
                        }
                    ],
                    _id: 1
                }
            ).populate("products");
            res.status(200);
            const products = vendor.products;
            res.send({ products });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post("/products/getProduct", getProductValidator, async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400);
                return res.send({ errorMessage: "Invalid Input", errors });
            }
            const id = req.body.id;
            const product = await Product.findOne({ _id: id });
            if (product === null) {
                return res
                    .status(400)
                    .send({ errorMessage: "Product Not found" });
            }
            console.log(product);
            res.send({ product });
        } catch (error) {
            console.log(error);
            res.status(500);
            res.send({ errorMessage: error });
        }
    });

    app.post(
        "/products/deleteProduct",
        isLoggedIn,
        deleteProductValidator,
        async (req, res) => {
            try {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400);
                    return res.send({ errorMessage: "Invalid Input", errors });
                }
                const { id } = req.body;
                const { userId } = req;
                const owner = await Vendor.findOne({ _id: userId });
                const productIds = owner.products;
                console.log(productIds);
                const newProductIds = productIds.filter(productId => {
                    return productId.toString() !== id;
                });
                owner.products = newProductIds;
                const result = await owner.save();
                const result2 = await Product.deleteOne({ _id: id });
                res.send({ vendor: result, result2 });
            } catch (error) {
                console.log(error);
                res.status(500);
                res.send({ errorMessage: error });
            }
        }
    );

    const uploadImage = async path => {
        cloudinary.config({
            cloud_name: "serviceapp1",
            api_key: "975867283281423",
            api_secret: "4ey9PRpwvaFfEaNSEYH4SGVID48"
        });

        const result = await cloudinary.uploader.upload(path, {
            folder: "products"
        });
        return result;
    };
};
