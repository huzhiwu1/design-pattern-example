abstract class Modal {
	implementor: Platform;
	constructor(platform: Platform) {
		this.implementor = platform;
	}
	abstract show(): void;
	abstract close(): void;
}

abstract class Platform {
	abstract show(): void;
	abstract close(): void;
}

class SuccessModal extends Modal {
	show(): void {
		this.implementor.show();
		console.log('打开 sucess modal');
	}
	close(): void {
		this.implementor.close();
		console.log('关闭 sucess modal');
	}
}
class ErrorModal extends Modal {
	show(): void {
		this.implementor.show();
		console.log('打开 error modal');
	}
	close(): void {
		this.implementor.close();
		console.log('关闭 error modal');
	}
}
class InfoModal extends Modal {
	show(): void {
		this.implementor.show();
		console.log('打开 info modal');
	}
	close(): void {
		this.implementor.close();
		console.log('关闭 info modal');
	}
}

class WebPlatform extends Platform {
	show(): void {
		console.log('在 Web 端中打开');
	}
	close(): void {
		console.log('在 Web 端中关闭');
	}
}

class MobilePlatform extends Platform {
	show(): void {
		console.log('在 Mobile 端中打开');
	}
	close(): void {
		console.log('在 Mobile 端中关闭');
	}
}
class IpadPlatform extends Platform {
	show(): void {
		console.log('在 Ipad 端中打开');
	}
	close(): void {
		console.log('在 Ipad 端中关闭');
	}
}

function client() {
	const webPlatform = new WebPlatform();
	const WebSuccessModal = new SuccessModal(webPlatform);
	WebSuccessModal.show(); //在 Web 端中打开  打开 sucess modal
	WebSuccessModal.close(); //在 Web 端中关闭 关闭 sucess modal
}

client();
// class SuccessModal extends Modal {
// 	show(): void {
// 		console.log('打开success modal');
// 	}
// 	close(): void {
// 		console.log('关闭success modal');
// 	}
// }

// class ErrorModal extends Modal {
// 	show(): void {
// 		console.log('打开error modal');
// 	}
// 	close(): void {
// 		console.log('关闭error modal');
// 	}
// }

// class InfoModal extends Modal {
// 	show(): void {
// 		console.log('打开info modal');
// 	}
// 	close(): void {
// 		console.log('关闭info modal');
// 	}
// }

// class WebSuccessModal extends SuccessModal {
// 	show() {
// 		console.log('web 端');
// 		super.show();
// 	}
// }
// class MobileSuccessModal extends SuccessModal {
// 	show() {
// 		console.log('Mobile 端');
// 		super.show();
// 	}
// }
// class IpadSuccessModal extends SuccessModal {
// 	show() {
// 		console.log('Ipad 端');
// 		super.show();
// 	}
// }
