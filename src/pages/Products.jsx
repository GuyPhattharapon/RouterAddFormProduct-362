import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addProduct, removeProduct } from "../features/productSlice";

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = () => {
    if (newProduct.id && newProduct.name && newProduct.price) {
      dispatch(
        addProduct({
          id: parseInt(newProduct.id),
          name: newProduct.name,
          price: newProduct.price,
          description: newProduct.description,
        })
      );
      setNewProduct({
        id: "",
        name: "",
        price: "",
        description: "",
      });
    } else {
      alert("Please fill out all fields!");
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Product List</h2>
      <ul className="mb-10 space-y-4">
        {productList.map((product, index) => (
          <li
            key={product.id}
            className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
          >
            <div className="flex items-center">
              <span className="text-lg font-semibold text-gray-700">{index + 1}.</span>
              <Link
                to={`/product/${product.id}`}
                className="ml-2 text-lg text-blue-600 hover:underline"
              >
                {product.name} - {product.price}
              </Link>
            </div>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <div className="bg-white p-8 shadow-md rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="id"
            placeholder="ID"
            value={newProduct.id}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newProduct.name}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6">
          <textarea
            name="description"
            placeholder="คำอธิบาย"
            value={newProduct.description}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <input
            type="text"
            name="price"
            placeholder="ราคา"
            value={newProduct.price}
            onChange={handleInputChange}
            className="p-4 border border-gray-300 rounded-md w-full focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-6 py-3 rounded-md mt-6 w-full hover:bg-blue-600"
        >
          Add Product
        </button>
      </div>
    </div>
  );
}

export default Products;
