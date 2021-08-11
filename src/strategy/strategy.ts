interface QuackBehavior {
	quack(): void;
}
interface FlyBehavior {
	fly(): void;
}

abstract class Duck {
	flyBehavior!: FlyBehavior;
	quackBehavior!: QuackBehavior;

	performFly() {
		this.flyBehavior.fly();
	}

	performQuck() {
		this.quackBehavior.quack();
	}

	swim() {
		console.log('游泳');
	}

	setFlyBehavior(fb: FlyBehavior) {
		this.flyBehavior = fb;
	}

	setQuackBehavior(qb: QuackBehavior) {
		this.quackBehavior = qb;
	}

	abstract display(): void;
}

class FlyWithWings implements FlyBehavior {
	fly() {
		console.log('我会飞');
	}
}

class FlyNoWay implements FlyBehavior {
	fly() {
		console.log('我不会飞');
	}
}

class Quack implements QuackBehavior {
	quack() {
		console.log('嘎嘎嘎嘎');
	}
}

class MuteQuack implements QuackBehavior {
	quack() {
		console.log('我不会叫');
	}
}

class MallardDuck extends Duck {
	constructor() {
		super();
		this.flyBehavior = new FlyWithWings();
		this.quackBehavior = new Quack();
	}

	display() {
		console.log('我头上绿油油');
	}
}

class RedHeadDuck extends Duck {
	constructor() {
		super();
		this.flyBehavior = new FlyNoWay();
		this.quackBehavior = new MuteQuack();
	}
	display() {
		console.log('我头顶红红的');
	}
}

const redDuck = new RedHeadDuck();
redDuck.display();
redDuck.performFly();
redDuck.setFlyBehavior(new FlyWithWings());
redDuck.performFly();

const greenDuck = new MallardDuck();
greenDuck.display();
greenDuck.performQuck();
greenDuck.setQuackBehavior(new MuteQuack());
greenDuck.performQuck();
