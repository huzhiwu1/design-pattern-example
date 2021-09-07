interface Subject {
	registryObserver: (o: Observer) => void;
	removeObserver: (o: Observer) => void;
	notifyObservers: () => void;
	getTemperature: () => number;
	getHumidity: () => string;
}

interface Observer {
	update: () => void;
}

class WeatherStation implements Subject {
	private temperature: number = 0;
	private humidity: string = '0%';
	private observers: Set<Observer> = new Set();

	setHumidity = (e: string) => {
		this.humidity = e;
		this.notifyObservers();
	};

	getHumidity = () => {
		return this.humidity;
	};

	setTemperature = (e: number) => {
		this.temperature = e;
		this.notifyObservers();
	};

	getTemperature = () => {
		return this.temperature;
	};

	removeObserver = (o: Observer) => {
		this.observers.delete(o);
	};
	registryObserver = (o: Observer) => {
		this.observers.add(o);
	};

	notifyObservers = () => {
		for (let observer of this.observers) {
			observer.update();
		}
	};
}

class TemperatureDisplay implements Observer {
	private subject: Subject;
	constructor(subject: Subject) {
		this.subject = subject;
		this.subject.registryObserver(this);
	}
	display() {
		console.log(`现在的温度是:${this.subject.getTemperature()}`);
		console.log(`现在的湿度是:${this.subject.getHumidity()}`);
	}
	update = () => {
		this.display();
	};
}

class Fan implements Observer {
	private subject: Subject;

	constructor(subject: Subject) {
		this.subject = subject;
		this.subject.registryObserver(this);
	}

	run = () => {
		console.log('开启风扇');
	};

	off = () => {
		console.log('关闭风扇');
	};

	update = () => {
		const temperature = this.subject.getTemperature();
		if (temperature > 25) {
			this.run();
		} else {
			this.off();
		}
	};
}

const ws = new WeatherStation();

const temperatureDisplay = new TemperatureDisplay(ws);

const fan = new Fan(ws);

ws.setTemperature(30);

ws.setTemperature(20);

ws.setHumidity('30%');
