class Address {
  
  private street: string = "";
  private number: number = 0;
  private zip: string = "";
  private city: string = "";

  constructor(id: string, street: string, number: number, zip: string, city: string) {
    this.street = street
    this.number = number
    this.zip = zip
    this.city = city
   
    this.validate()
  }

  validate() {
    if (this.street.length === 0) {
      throw new Error("Street is required")
    }
    if (this.number === 0) {
      throw new Error("Number is required")
    }
    if (this.zip.length === 0) {
      throw new Error("Zip is required")
    }
    if (this.city.length === 0) {
      throw new Error("City is required")
    }
  }

  toString() {
    return `${this.street}, ${this.number}, ${this.city}, ${this.zip}`
  }
}