import { onCLS, onFID, onLCP, onTTFB } from 'web-vitals'

const reportWebVitals = (onPerfEntry?: (entry: any) => void) => {
	if (onPerfEntry && onPerfEntry instanceof Function) {
		onCLS(onPerfEntry)
		onFID(onPerfEntry)
		onLCP(onPerfEntry)
		onTTFB(onPerfEntry)
	}
}

export default reportWebVitals
