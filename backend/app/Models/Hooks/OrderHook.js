// eslint-disable-next-line no-multi-assign
const OrderHook = (exports = module.exports = {});

OrderHook.updateValues = async model => {
  model.$sideLoaded.subtotal = await model.items().getSum('subtotal');
  model.$sideLoaded.qty_items = await model.items().getSum('quantity');
  model.$sideLoaded.discount = await model.discounts().getSum('discount');
  model.total = model.$sideLoaded.subtotal - model.$sideLoaded.discount;
};

OrderHook.updateCollectionValues = async models => {
  // eslint-disable-next-line no-restricted-syntax
  for (let model of models) {
    // eslint-disable-next-line no-await-in-loop
    model = await OrderHook.updateValues(model);
  }
};
