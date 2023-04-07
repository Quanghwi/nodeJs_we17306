import Joi from "joi";
import dotenv from "dotenv";
import { Product } from "../models/product.js";

dotenv.config();
const { API_DB } = process.env;
console.log(API_DB);

const productSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string(),
});

// const API_URI = "http://localhost:3000/users";

export const getAll = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    // const { data: products } = await axios.get(`${API_URI}/products`);
    const products = await Product.find();
    if (products.length === 0) {
      return res.json({
        message: "Không có sản phẩm nào",
      });
    }
    return res.json(products);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

export const get = async (req, res) => {
  try {

    const product = await Product.findById(req.params.id);
    const idPrd = product._id.toString()
    console.log(idPrd);
    if (!idPrd) {
      return res.json({
        message: "Không có sản phẩm nào"
      })
    }
    return res.json(product)
  } catch (error) {
    return res.status(500).json({
      message: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { error } = productSchema.validate(req.body)
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const product = await Product.create(req.body);
    if (!product) {
      return res.json({
        message: "Thêm sản phẩm không thành công",
      })
    }
    return res.json({
      message: "Thêm sản phẩm thành công",
      data: product
    })
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async function (req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const product = await Product.findByIdAndDelete(id);
    return res.json({
      message: "Xóa sản phẩm thành công",
      product,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};




