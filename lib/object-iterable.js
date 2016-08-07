
(module => {
    'use strict';

    var XIterable = require('x-iterable-base/template')
    var jtry = require('just-try')

    var {getOwnPropertyNames} = Object
    var {iterator} = Symbol

    function ObjectIterable(object) {
        return {
            [iterator]: () =>
                getOwnPropertyNames(object)
                    .map(name => new ObjectIterator(name, jtry(() => object[name])))
                        [iterator](),
            __proto__: this
        }
    }

    class ObjectIterator extends Array {

        get name() {
            return this[0]
        }

        get value() {
            return this[1]
        }

    }

    module.exports = class extends XIterable(ObjectIterable) {}

})(module);
