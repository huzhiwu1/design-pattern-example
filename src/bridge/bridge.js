class VectorRenderer {
	renderCircle(radius) {
		console.log(`绘制半径为${radius}的圆形矢量图`);
	}
}

class RasterRender {
	renderCircle(radius) {
		console.log(`绘制半径为${radius}的圆形位图`);
	}
}

class Shape {
	constructor(renderer) {
		this.renderer = renderer;
	}
}

class Circle extends Shape {
	constructor(renderer, radius) {
		super(renderer);
		this.radius = radius;
	}
	draw() {
		this.renderer.renderCircle(this.radius);
	}
	resize(factor) {
		this.radius *= factor;
	}
}

const raster = new RasterRender();
const vector = new VectorRenderer();
const circle = new Circle(vector, 5);

circle.draw();
circle.resize(7);
circle.draw();
