import cache from '../src/index';

describe('cache()', () => {
  it('should it returns the same result', () => {
      class Foo {
        constructor({ multiplier }) {
          this._multiplier = multiplier;
        }

        @cache()
        getRandomNumber() {
          return Math.random();
        }

        @cache({ ttl: 2000 })
        multiplyPerRandomNumber(num) {
          const multiplier = this._multiplier;
          return this.getRandomNumber() * multiplier;
        }
      }

      const bar = new Foo({ multiplier: 2 });
      const expectedResultForGetRandomNumber = bar.getRandomNumber();
      const expectedResultForGetMultiplyPerRandomNumber = bar.multiplyPerRandomNumber();
      expect(bar.getRandomNumber()).toBe(expectedResultForGetRandomNumber);
      expect(bar.multiplyPerRandomNumber()).toBe(expectedResultForGetMultiplyPerRandomNumber);
  });

  it('should it returns not the same result with diferent arguments', () => {
      class Foo {
        constructor() {}

        @cache()
        getRandomNumber() {
          return Math.random();
        }
      }

      const bar = new Foo();
      const expectedResult = bar.getRandomNumber(1);
      expect(bar.getRandomNumber(2)).not.toBe(expectedResult);
  });

  it('should it returns the same result if the function returns a Promise', () => {
      class Foo {
        constructor() {}

        @cache()
        getRandomNumber() {
          return Promise.resolve(Math.random());
        }
      }

      const bar = new Foo();
      const expectedResult = bar.getRandomNumber(1);
      expect(bar.getRandomNumber(1)).toBe(expectedResult);
  });

  it('should it returns the same if pass a ttl', () => {
      class Foo {
        constructor() {}

        @cache({ ttl: 500 })
        getRandomNumber() {
          return Promise.resolve(Math.random());
        }
      }

      const bar = new Foo();
      const expectedResult = bar.getRandomNumber(1);
      expect(bar.getRandomNumber(1)).toBe(expectedResult);
  });

  it('should it returns not the same after the ttl', (done) => {
      class Foo {
        constructor() {}

        @cache({ ttl: 100 })
        getRandomNumber() {
          return Math.random();
        }
      }

      const bar = new Foo();
      const expectedResult = bar.getRandomNumber(1);
      setTimeout(() => {
        expect(bar.getRandomNumber(1)).not.toBe(expectedResult);
        done();
      }, 1000);
  });
});
