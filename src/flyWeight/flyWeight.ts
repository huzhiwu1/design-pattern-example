enum BulletSize {
	'Large' = 'Large',
	'small' = 'small',
}
enum BulletColor {
	'Red' = 'Red',
	'Yellow' = 'Yellow',
}
class BulletSharedData {
	private size: BulletSize;
	private color: BulletColor;
	constructor(size: BulletSize, color: BulletColor) {
		this.size = size;
		this.color = color;
	}
	getSize() {
		return this.size;
	}
	getColor() {
		return this.color;
	}
}

class BulletSharedDataFactory {
	static cache: Map<string, BulletSharedData> = new Map();

	static getBulletSharedData(size: BulletSize, color: BulletColor) {
		const key = `${size}_${color}`;
		if (this.cache.has(key)) {
			return this.cache.get(key);
		}
		const data = new BulletSharedData(size, color);
		this.cache.set(key, data);
		return data;
	}
}

class Bullet {
	constructor(
		private localtionX: number,
		private localtionY: number,
		private sharedData: BulletSharedData
	) {}

	getData() {
		console.log(`子弹的大小是${this.sharedData.getSize()},子弹的颜色是${this.sharedData.getColor()},
        子弹的位置是：x:${this.localtionX},y:${this.localtionY}
        `);
	}
}

class Bullet2 {
	constructor(
		private localtionX: number,
		private localtionY: number,
		private color: BulletColor,
		private size: BulletSize
	) {}

	getData() {
		console.log(`子弹的大小是${this.size},子弹的颜色是${this.color},
        子弹的位置是：x:${this.localtionX},y:${this.localtionY}
        `);
	}
}

function client() {
	const initialMemory = process.memoryUsage().heapTotal;
	const arr = [];
	for (let j = 0; j <= 1000; j++) {
		for (let i = 0; i <= 1000; i++) {
			const data = BulletSharedDataFactory.getBulletSharedData(
				i % 2 === 0 ? BulletSize.Large : BulletSize.small,
				j % 2 === 0 ? BulletColor.Red : BulletColor.Yellow
			);

			const bullet = new Bullet(i, j, data!);
			arr.push(bullet);
			// const bullet = new Bullet2(
			// 	i,
			// 	j,
			// 	j % 2 === 0 ? BulletColor.Red : BulletColor.Yellow,
			// 	i % 2 === 0 ? BulletSize.Large : BulletSize.small
			// );
			// arr.push(bullet);
		}
	}
	const finalMemory = process.memoryUsage().heapTotal;
	console.log(`使用内存:${finalMemory - initialMemory}`);
}

client();

export {};
