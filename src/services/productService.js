const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getProduct = async (id) => {
  const response = await fetch(`${baseUrl}products/${id}`);
  if (response.ok) {
    return response.json();
  }

  throw response;
};

const getProducts = async (category) => {
  const response = await fetch(`${baseUrl}products?category=${category}`);
  if (response.ok) {
    return response.json();
  }

  throw response;
};

export {
  getProduct,
  getProducts,
};
