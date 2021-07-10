/**
 * 方式一
 */
function Singleton1() {
	if (typeof Singleton1.instance === 'object') {
		return Singleton1.instance;
	}
	this.name = '胡志武';
	Singleton1.instance = this;
}
const one1 = new Singleton1();
const two1 = new Singleton1();
console.log(one1 === two1); // true
/**
 * 方式一的弊端：
 * Singleton1.instance暴露在全局中，容易被污染
 * Singleton1.instance == null
 */

/**
 * 方式二
 */
function Singleton2() {
	let instance = this;
	this.name = '胡志武';
	Singleton2 = function () {
		return instance;
	};
}
const one2 = new Singleton2();
const two2 = new Singleton2();
console.log(one2 === two2); //true

/**
 * 方式二的弊端：
 * 无法使用原型链
 */
Singleton2.prototype.lastName = '胡';
console.log(one2.lastName, two2.lastName); // undefined undefined

/**
 * 方式三,圣杯模式
 */
const Singleton3 = (function () {
	let instance = undefined;
	return function () {
		if (typeof instance === 'object') {
			return instance;
		}
		instance = this;
		this.name = 'name';
	};
})();
const one3 = new Singleton3();
const two3 = new Singleton3();
console.log(one3 === two3); //true
Singleton3.prototype.lastName = '胡';
console.log(one3.lastName, two3.lastName); // 胡 胡

/**
 * 方式四，做一个单例工厂
 */
const createSingleton = function (func) {
	let instance;
	return function (...args) {
		if (typeof instance === 'object') {
			return instance;
		}
		instance = new func(...args);
		return instance;
	};
};

function createPerson(name, age) {
	this.name = name;
	this.age = age;
}

const createSingletonPerson = createSingleton(createPerson);

const one4 = createSingletonPerson('abc', 23);
const two4 = createSingletonPerson('cdd', 77);
console.log(one4 === two4); //true
