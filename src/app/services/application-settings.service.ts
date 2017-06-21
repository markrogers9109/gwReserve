import { Injectable } from "@angular/core";

@Injectable()
export class ApplicationSettings {
	constructor() {}

	getFirebaseRestUrl(suffix) {
		const prefix = "https://gwreserve-e9e36.firebaseio.com/";
		const ext = ".json";

		return prefix + suffix + ext;
	}

	getImagePath(file) {
		return "assets/images/" + file;
	}
}
