const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getShippingAddress = async (userId) => fetch(`${baseUrl}/shippingAddress/${userId}`).then((response) => {
  if (response.ok) {
    return response.json();
  }

  throw response;
});

const saveShippingAddress = async (address) => fetch(`${baseUrl}/shippingAddress`, {
  body: JSON.stringify(address),
  headers: { 'Content-Type': 'application/json' },
  method: 'POST',
});

export {
  getShippingAddress,
  saveShippingAddress,
};
