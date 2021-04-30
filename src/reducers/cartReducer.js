import { produce } from 'immer';

const updateItemQuantity = (cart, {
  id,
  quantity,
  sku,
}, increment = false) => produce(cart, (draft) => {
  const itemIndex = cart.findIndex((item) => item.sku === sku);
  const itemInCart = itemIndex > -1; // eslint-disable-line no-magic-numbers
  if (itemInCart) {
    if (quantity === 0) {
      delete draft[itemIndex];
    } else {
      const currentQuantity = draft[itemIndex].quantity;
      draft[itemIndex].quantity = increment ? currentQuantity + quantity : quantity;
    }
  } else {
    draft.push({
      id,
      quantity: 1,
      sku,
    });
  }
});

const cartReducer = (cart, action) => {
  const { type } = action;
  switch (type) {
    case 'add': {
      return updateItemQuantity(cart, {
        ...action,
        quantity: 1,
      }, true);
    }

    case 'empty': {
      return [];
    }

    case 'update': {
      return updateItemQuantity(cart, action);
    }

    default: {
      const error = new Error(`Unhandled action: ${type}`);
      error.name = 'UnhandledReducerAction';
      throw error;
    }
  }
};

export default cartReducer;
