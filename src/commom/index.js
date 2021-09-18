export function throttle(fn, delay, ...argu) {
	let flag = false;
	return function () {
		if (flag) {
			setTimeout(() => {
				fn(argu);
				flag = true;
			}, delay);
		}
		flag = false;
	}
}