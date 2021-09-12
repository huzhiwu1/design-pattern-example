interface ChatRoomMediator {
	message(sender: Person, message: string): void;
}

class Person {
	private name: string;
	private room!: ChatRoomMediator;
	private chatLog: string[];
	constructor(name: string) {
		this.name = name;
		this.chatLog = [];
	}
	setRoom(room: ChatRoomMediator) {
		this.room = room;
	}

	say(message: string) {
		this.room.message(this, message);
	}

	receiver(who: Person, message: string) {
		const s = `${this.name}'s chat session ${who.name}: ${message}`;
		console.log(s);
		this.chatLog.push(s);
	}
}

class ChatRoom implements ChatRoomMediator {
	private persons: Person[];
	constructor() {
		this.persons = [];
	}

	addMember(person: Person) {
		this.persons.push(person);
		person.setRoom(this);
	}

	message(sender: Person, message: string): void {
		for (let persion of this.persons) {
			if (persion !== sender) {
				persion.receiver(sender, message);
			}
		}
	}
}

function client() {
	const memberA = new Person('A');
	const memberB = new Person('B');
	const memberC = new Person('C');
	const chatRoom = new ChatRoom();
	chatRoom.addMember(memberA);
	chatRoom.addMember(memberB);
	chatRoom.addMember(memberC);

	memberA.say('hello, I am A');
	memberB.say('hello, I am B');
	memberC.say('hello, I am C');
}

client();

export {};
