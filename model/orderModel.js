module.exports.OrderModel = class {
  constructor(parameters) {
    this.id = parameters.Id;
    this.title = parameters.Title;
    this.quantity = parameters.Quantity;
    this.message = parameters.Message;
    this.city = parameters.City;
  }
};
