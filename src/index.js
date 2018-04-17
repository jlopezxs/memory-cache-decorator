import md5 from 'md5-hex';

const DEFAULT_TTL = 1000;
const CACHE = {};

/**
 * @method memoryCache
 * @param  {Number} options.ttl
 * @return {Object}
 */
export default function memoryCache({ ttl = DEFAULT_TTL } = {}) {
  return (target, name, descriptor) => {
    const oldFunction = descriptor.value;

    return Object.assign(descriptor, {
      value: function value(...args) {
        const cacheKey = `${target.constructor.name}_${name}_${md5(JSON.stringify(args))}`;
        const now = +new Date();
        if (CACHE[cacheKey] === undefined) {
          const functionResult = oldFunction.apply(this, args);

          CACHE[cacheKey] = {
            created: now,
            value: functionResult
          };
          return functionResult;
        }
        if ((now - CACHE[cacheKey].created) > ttl) delete CACHE[cacheKey];
        return CACHE[cacheKey] ? CACHE[cacheKey].value : oldFunction.apply(this, args);
      }
    });
  };
}
