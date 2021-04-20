const getItemsWithUpdatedQuantity = (items, sku, quantity, increment = false) => {
  if (quantity === 0) {
    return items.filter((item) => item.sku !== sku);
  }

  return items.map((item) => {
    if (item.sku === sku) {
      return {
        ...item,
        quantity: increment ? item.quantity + quantity : quantity,
      };
    }

    return item;
  });
};

const cartReducer = (cart, action) => {
  const {
    id,
    quantity,
    sku,
    type,
  } = action;

  switch (type) {
    case 'add': {
      const itemInCart = cart.find((item) => item.sku === sku);
      if (itemInCart) {
        return getItemsWithUpdatedQuantity(cart, sku, 1, true);
      }

      return [
        ...cart,
        {
          id,
          quantity: 1,
          sku,
        },
      ];
    }

    case 'empty': {
      return [];
    }

    case 'update': {
      return getItemsWithUpdatedQuantity(cart, sku, quantity);
    }

    default: {
      const error = new Error(`Unhandled action: ${type}`);
      error.name = 'UnhandledReducerAction';
      throw error;
    }
  }
};

export default cartReducer;
