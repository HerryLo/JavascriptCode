'use strict';

var immediate = require('immediate');

function INTERNAL() {}

function isFunction(func) {
    return typeof func === 'function';
}

function isObject(obj) {
    return typeof obj === 'object';
}

function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;

module.exports = Promise;

function _Promise(resolver) {
    if (!isFunction(resolver)) {
        throw new Error('resolver must be a function');
    }
    this.state = PENDING;
    this.value = 0;
    this.queue = [];
    if (resolver !== INTERNAL) {
        safelyResolveThen(this, resolver);
    }
}

function safelyResolveThen(self, then) {
    let call = false;
    try{
        then(( value )=> {
            if(call){ return }
            called = true;
            doResolve(self, value);
        }, ( error )=> {
            if(call){ return }
            called = true;
            doReject(self, error);
        })
    }catch(e){
        if(call){ return }
        called = true;
        doReject(self, e);
    }
}

function doResolve(self, value) {
    try{
        let then = getThen(value);
        if(then){
            safelyResolveThen(then, value)
        }else{
            self.state = FULFILLED
            self.value = value
            self.queue.forEach((callBack)=> {
                callBack.callFulfilled(value)
            })
        }
        return self
    }catch(e){
        doReject(self, e);
    }
    
}

function doReject(self, error) {
    self.state = REJECTED
    self.value = error
    self.queue.forEach((callBack)=> {
        callBack.callFulfilled(error)
    })

    return self
}

function getThen(obj) {
    let obj = obj && obj.then;
    if (obj && (isObject(obj) || isFunction(obj)) && isFunction(then)) {
        return function appyThen() {
          then.apply(obj, arguments);
        };
    }
}

_Promise.prototype.then = (onFulfilled, onRejectedx) => {
    if (!isFunction(onFulfilled) && this.state === FULFILLED ||
    !isFunction(onRejected) && this.state === REJECTED) {
    return this;
    }
    let promise = new this.constructor(INTERNAL);
    if (this.state !== PENDING) {
        var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
        unwrap(promise, resolver, this.value);
    } else {
        this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
    }
    return promise;
}
