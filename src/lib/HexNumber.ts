export class HexNumber {

    number : string

	constructor(number : string) {
		this.number = number
	}

	get() {
		return this.number
	}

	get10() {
		return parseInt(this.number, 16)
	}

	increment() {
		let incValue = (parseInt(this.number, 16) + 1).toString(16)
		this.number = incValue
		return incValue
	}

	decrement() {
		let decValue = (parseInt(this.number, 16) - 1).toString(16)
		this.number = decValue
		return decValue
	}
}
