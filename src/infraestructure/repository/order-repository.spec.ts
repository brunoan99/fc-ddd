import { Sequelize } from "sequelize-typescript";
import { Address } from "../../domain/entity/address";
import { Customer } from "../../domain/entity/customer";
import { Order } from "../../domain/entity/order";
import { OrderItem } from "../../domain/entity/order_item";
import { Product } from "../../domain/entity/product";
import { CustomerModel } from "../db/sequelize/model/customer";
import { OrderModel } from "../db/sequelize/model/order";
import { OrderItemModel } from "../db/sequelize/model/order-item";
import { ProductModel } from "../db/sequelize/model/product";
import { CustomerRepository } from "./customer-repository";
import { OrderRepository } from "./order-repository";
import { ProductRepository } from "./product-repository";

const createNewCustomer = async (id: string) => {
  const customer = new Customer(id, `Customer ${id}`);
  const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
  customer.changeAddress(address);
  await CustomerModel.create({
    id: customer.id,
    name: customer.name,
    street: customer.address.street,
    number: customer.address.number,
    zipcode: customer.address.zip,
    city: customer.address.city,
    active: customer.isActive(),
    rewardPoints: customer.rewardPoints,
  });
  return customer
}

const createNewOrderItem = async (id: string, price: number, quantity: number): Promise<OrderItem> => {
  const product = new Product(`ABC${id}`, `Product ${id}`, price);
  await ProductModel.create({
    id: product.id,
    name: product.name,
    price: product.price,
  })
  const orderItem = new OrderItem(
    id,
    product.id,
    product.name,
    product.price,
    quantity
  );
  return orderItem
}

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  test("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const ordemItem = new OrderItem(
      "1",
      product.id,
      product.name,
      product.price,
      2
    );

    const order = new Order("123", "123", [ordemItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: ordemItem.id,
          name: ordemItem.name,
          price: ordemItem.price,
          quantity: ordemItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  test('Should findAll method return a empty list if no order was before provided to repository', async () => {
    const sut = new OrderRepository()
    const orderModels = await sut.findAll()
    expect(orderModels).toEqual([])
  })
});