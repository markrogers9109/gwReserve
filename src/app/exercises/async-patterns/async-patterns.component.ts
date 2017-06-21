import { Component } from "@angular/core";

import { Observable } from "rxjs";

@Component({
	selector: "gw-async-patterns",
	templateUrl: "./async-patterns.component.html",
	styleUrls: ["./async-patterns.component.css"]
})
export class AsyncPatternsComponent {
	private readonly _sendMessage = "Sending user request for profile to server...";
	private readonly _getMessage = "Getting user profile...";
	private readonly _updateMessage = "Sending updated user profile...";

	public messagesArray:string[];

	constructor() {
		this._clearMessages();
	}

	// private worker functions (pretend these are doing actual things in our application)

	private _clearMessages() {
		this.messagesArray = [];
	}

	private _putMessageAsync(message, callback) {
		setTimeout(() => {
			this.messagesArray.push(message);
			if(callback) callback();
		}, 1500);
	}

	private _putMessageAsyncPromise(message) {
		return new Promise(resolve => {
			setTimeout(() => {
				this.messagesArray.push(message);
				resolve();
			}, 1500);
		});
	}

	private _putMessageArrayObservable(messages:string[]) {
		return new Observable(observer => {
			for (let i = 0; i < messages.length; i++) {
				const message = messages[i];

				setTimeout(() => {
					this.messagesArray.push(message);
					observer.next(message + " pushed!");

					if (i === messages.length - 1) observer.complete();
				}, 1500 * (i + 1));
			}
		});
	}

	/////

	private _sendProfileRequest(callback) {
		return this._putMessageAsync(this._sendMessage, callback);
	}

	private _getProfileData(callback) {
		return this._putMessageAsync(this._getMessage, callback);
	}

	private _updateProfile(callback) {
		return this._putMessageAsync(this._updateMessage, callback);
	}

	private _sendProfileRequestWithPromise() {
		return this._putMessageAsyncPromise(this._sendMessage);
	}

	private _getProfileDataWithPromise() {
		return this._putMessageAsyncPromise(this._getMessage);
	}

	private _updateProfileWithPromise() {
		return this._putMessageAsyncPromise(this._updateMessage);
	}

	/////

	doWorkWithCallback() {
		this._clearMessages();

		this._putMessageAsync(this._sendMessage, () => {
			this._putMessageAsync(this._getMessage, () => {
				this._putMessageAsync(this._updateMessage, null)
			})
		});
	}

	doWorkWithNamedCallback() {
		this._clearMessages();

		this._sendProfileRequest(
			() => this._getProfileData(
				() => this._updateProfile(null)
			)
		);
	}

	doWorkWithPromise() {
		this._clearMessages();

		return this._sendProfileRequestWithPromise()
			.then(this._getProfileDataWithPromise.bind(this))
			// throw this error to see how observables below which incorporate this promise will act
			// .then(() => { throw new Error("This ran into trouble"); })
			.then(this._updateProfile.bind(this));
	}

	doWorkWithObservable() {
		this._clearMessages();

		let observable = Observable.defer(() => Observable.fromPromise(this.doWorkWithPromise()));

		// observable = observable.retry(2);
		observable = observable.retryWhen(retryStrategy());

		observable.subscribe({
			error: error => console.log("Observable", error)
		});

		function retryStrategy() {
			return function(errors: Observable<Error>) {
				return errors
					.scan((acc, value, i) => i, 0)
					.takeWhile(acc => acc < 2)
					.delay(5000);
			};
		}
	}

	doWorkWithMoreObservable() {
		this._clearMessages();

		const workList = [
			this._sendProfileRequest,
			this._getProfileData,
			this._updateProfile
		];

		Observable.zip(
  			Observable.from(workList),
			Observable.timer(0, 1500),
			workItem => {
				workItem = workItem.bind(this);
				workItem(null);
			}
		).subscribe();
	}

	doWorkWithCustomObservable() {
		this._clearMessages();

		this._putMessageArrayObservable([
			this._sendMessage,
			this._getMessage,
			this._updateMessage
		])
		.map(message => "MAP RESULT: " + message)
		.subscribe({
			next: message => console.log(message),
			complete: () => console.log("Observable work complete")
		});
	}
}
