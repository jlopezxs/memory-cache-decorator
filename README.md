## memory-cache-decorator

> :package: Memory cache decorator

## Requirements and Use

```bash
npm install memory-cache-decorator --save
```

### Use
```javascript
import cache from 'memory-cache-decorator';

class Foo {
  constructor() {}

  @cache({ ttl: 2000 })
  getRandomNumber() {
    return Math.random();
  }
}

const bar = new Foo();
bar.getRandomNumber(); //Returns 0.8625773520208384
bar.getRandomNumber(); //Returns 0.8625773520208384

setTimeout(()=> bar.getRandomNumber(), 2000) //Returns 0.7496571644076617
```

## Licence

Jordi Lopez and [contributors](https://github.com/blanxii/memory-cache-decorator/graphs/contributors)
