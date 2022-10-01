import { Address } from './address'
import { Customer } from './customer'

describe('Customer', () => {
  test('Should throw error when id is empty', () => {
    expect(() => {
      new Customer("", "John")
    }).toThrowError("Id is required")
  })

  test('Should throw error when id name empty', () => {
    expect(() => {
      new Customer("123", "")
    }).toThrowError("Name is required")
  })

  test('Should change name', () => {
    const customer = new Customer("123", "John")
    customer.changeName("Jake Peralta")
    expect(customer.name).toBe("Jake Peralta")
  })

  test("Should customer to dont be activate as default", () => {
    const customer = new Customer("1", "Customer 1")
    expect(customer.isActive()).toBeFalsy()
  })

  test("Should activate customer", () => {
    const customer = new Customer("1", "Customer 1")
    customer.Address = new Address("Rua 1", 1, "cep1", "cidade")
    customer.activate()
    expect(customer.isActive()).toBeTruthy()
  })

  test("Should activate customer return error if have no address", () => {
    const customer = new Customer("1", "Customer 1")
    expect(() => {
      customer.activate()
    }).toThrowError("Address is required to activate a customer")
  })
})