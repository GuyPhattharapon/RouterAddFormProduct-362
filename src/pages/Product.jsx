import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
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
      dispatch(addProduct(newProduct));
      // Clear the input fields after adding the product
      setNewProduct({
        id: '',
        name: '',
        price: '',
        description: ''
      });
    }
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold">Product List</h2>
      <ul className="mb-4">
        {productList.map(product => (
          <li key={product.id} className="mb-2">
            <Link to={`/product/${product.id}`} className="text-blue-500">
              {product.name} - {product.price}
            </Link>
            <button
              onClick={() => handleRemoveProduct(product.id)}
              className="ml-4 bg-red-500 text-white px-2 py-1 rounded">
              Remove
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-bold">Add New Product</h2>
      <div className="space-y-2">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={newProduct.id}
          onChange={handleInputChange}
          className="block w-full border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newProduct.name}
          onChange={handleInputChange}
          className="block w-full border px-2 py-1 rounded"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={newProduct.price}
          onChange={handleInputChange}
          className="block w-full border px-2 py-1 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newProduct.description}
          onChange={handleInputChange}
          className="block w-full border px-2 py-1 rounded"
        ></textarea>
        <button
          onClick={handleAddProduct}
          className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </div>
    </div>
  );
}

export default Products;
