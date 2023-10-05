class ProductDTO {
  constructor (product) {
    this.name = product.name;
    this.description = product.description;
    this.code = product.code.replace(/\s/g, '').toLowerCase();
    this.price = product.price;
    this.status = true;
    this.stock = product.stock;
    this.category = product.category.toLowerCase();
    this.owner = product.owner || 'adminDan@gmail.com';
  };
};

export default ProductDTO;