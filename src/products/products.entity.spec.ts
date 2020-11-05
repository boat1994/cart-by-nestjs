import { Product } from './products.entity';

describe('Product', () => {
  it('should be defined', () => {
    expect(new Product()).toBeDefined();
  });
});
