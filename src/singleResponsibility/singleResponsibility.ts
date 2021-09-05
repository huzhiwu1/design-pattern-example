const fs = require('fs');
/**
 * 报纸类
 *
 */
class Journal {
	static count = 0;
	entries: Record<number, string>;
	constructor() {
		this.entries = {};
	}

	addEntry(text: string) {
		const count = ++Journal.count;
		const entry = `${count}: ${text}`;
		this.entries[count] = entry;
	}

	removeEntry(index: number) {
		delete this.entries[index];
	}

	toString() {
		return Object.values(this.entries).join('\n');
	}

	/**
	 * 当需要将报纸的信息保存到文件中，
	 * 并且需要读取文件时，
	 * 我们可能会将这部分功能写在报纸类中
	 * 但在单一责任原则下，报纸类不应该承担读写文件的能力，
	 * 所以我们将这部分能力抽离出去
	 */
	// save(filename) {
	// 	fs.writeFileSync(filename, this.toString());
	// }

	// load(filename) {
	// 	return fs.readFileSync(filename);
	// }
}

class PersistenceManager {
	saveToFile(filename: string, journal: Journal) {
		return fs.writeFileSync(filename, journal.toString());
	}
	loadFromFile(filename) {
		return fs.writeFileSync(filename);
	}
}
const j = new Journal();
j.addEntry('today is a beautilful day');
j.addEntry('good lucky');

const p = new PersistenceManager();
const filename = '/Users/huzhiwu/Desktop/journal.txt';
p.saveToFile(filename, j);

console.log(j.toString());
