/* 

Complexidade de Negócio
Domain
  - Entity
    - customer.ts (business rules)

Complexidade Acidental
Infra - Mundo Externo
  - Entity / Model
    - customer.ts (get, set) ORM or DB

*/

class Customer {

  private _id: string;
  private _name: string;
  private _address: Address | undefined;
  private _active: boolean = false;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate()
  }

  validate() {
    if (this._name.length === 0) {
      throw new Error('Name is required')
    }
    if (this._id.length === 0) {
      throw new Error('Id is required')
    }
  }
  
  changeName(name: string) {
    if (name.split(' ').length <= 1) {
      throw new Error('Invalid name, names must contain at least first and last name.')
    }
    this._name = name;
  }

  activate() {
    if (this._name.length === 0) {
      throw new Error('Name is required to activate a customer')
    }
    if (this._id.length === 0) {
      throw new Error('Id is required to activate a customer')
    }
    if ( this._address !== undefined) {
      throw new Error('Address is required to activate a customer')
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  set Address(address: Address) {
    this._address = address;
  }
}