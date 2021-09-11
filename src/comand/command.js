class Calculator {
	history = [];
	value = 0;

	execCommand(command) {
		this.history.push(command);
		this.value = command.execute(this.value);
	}

	undo() {
		const command = this.history.pop();
		if (command) {
			this.value = command.undo(this.value);
		}
	}

	getValue() {
		return this.value;
	}
}

class AddCommand {
	constructor(value) {
		this.valueToAdd = value;
	}
	execute(num) {
		return num + this.valueToAdd;
	}
	undo(num) {
		return num - this.valueToAdd;
	}
}

class MultiplyCommand {
	constructor(value) {
		this.valueToMultiply = value;
	}
	execute(num) {
		return this.valueToMultiply * num;
	}
	undo(num) {
		return num / this.valueToMultiply;
	}
}

const calculator = new Calculator();

calculator.execCommand(new AddCommand(10));
console.log(calculator.getValue()); //10
calculator.execCommand(new MultiplyCommand(2));
console.log(calculator.getValue()); //20
calculator.undo();
console.log(calculator.getValue()); //10
calculator.undo();
console.log(calculator.getValue()); //0
