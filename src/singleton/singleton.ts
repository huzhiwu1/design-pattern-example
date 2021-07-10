/**
 * 方式一
 * 懒汉模式
 */
class Singleton1 {
	name = '胡志武';
	private static instance: Singleton1;
	static getInstance() {
		if (!this.instance) {
			this.instance = new Singleton1();
		}
		return this.instance;
	}
}
const one1 = Singleton1.getInstance();
const two1 = Singleton1.getInstance();
console.log(one1 === two1); //true

/**
 * 方式二
 * 饿汉模式
 */
class Singleton2 {
	name = '胡志武';
	private static instance: Singleton2 = new Singleton2();
	static getInstance() {
		if (!this.instance) {
			this.instance = new Singleton2();
		}
		return this.instance;
	}
}

const one2 = Singleton2.getInstance();
const two2 = Singleton2.getInstance();
console.log(one2 === two2); // true

/**
 * 方式三
 * 单例工厂
 */

function createSingleton<T extends (...args: any) => any>(func: T): T {
	let instance: ReturnType<T>;
	return function (this: any, ...args: Parameters<T>): ReturnType<T> {
		if (!instance) {
			instance = func.apply(this, args);
		}
		return instance;
	} as T;
}

function createBook() {
	return {
		bookname: '设计模式' + Math.random() * 1000,
	};
}
const createSingleBook = createSingleton(createBook);
const book1 = createSingleBook();
const book2 = createSingleBook();
console.log(book1 === book2); //true
console.log(book1); //true

function createCar(e: { carName: string; factoryName: string }) {
	return {
		name: e.carName,
		factory: e.factoryName,
	};
}

const createSingleCar = createSingleton(createCar);
const car1 = createSingleCar({ carName: '宝马', factoryName: 'xx制造' });
const car2 = createSingleCar({ carName: '奔驰', factoryName: 'xx制造' });
console.log(car1 === car2); //true
export default {};
