import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { ApplicationSettings } from "./application-settings.service";
import { LoginService } from "./login.service";

import { IRoom } from "./../interfaces/IRoom";

import "rxjs/add/operator/toPromise";

@Injectable()
export class RoomService {
	constructor(
		private http: Http,
		private applicationSettings: ApplicationSettings,
		private loginService: LoginService
	) { }

	getRoomById(id):Promise<IRoom> {
		return this.http.get(this.applicationSettings.getFirebaseRestUrl(`rooms/${id}`))
			.toPromise()
			.then(response => response.json())
			.then(room => {
				room.id = id;

				return room;
			});
	}

	fetchRoomsFromDB():Promise<IRoom[]> {
		return this.http.get(this.applicationSettings.getFirebaseRestUrl("rooms"))
			.toPromise()
			.then(response => response.json())
			.then(response => {
				const rooms:IRoom[] = [];

				for (let roomKey in response) {
					// affix the Firebase key to ID property
					response[roomKey].id = roomKey;
					// add to our array
					rooms.push(response[roomKey]);
				}

				return rooms;
			});
	}

	resetRoomsToDB():Promise<IRoom[]> {
		const url = this.applicationSettings.getFirebaseRestUrl("rooms");

		return this.http.delete(url).toPromise()
			.then(() => {
				return this.http.put(url, {
					halo: {
						id: "halo",
						name: "Halo",
						picture: "https://drive.google.com/open?id=0B5Iz7ToBVrwURmhBdFJpcXZDSVE"
					},
					sonic: {
						id: "sonic",
						name: "Sonic",
						picture: 'https://drive.google.com/open?id=0B5Iz7ToBVrwUN1ZkalNxc2M0RUk'
					},
					zelda: {
						id: "zelda",
						name: "Zelda",
						picture: 'https://drive.google.com/open?id=0B5Iz7ToBVrwUeHl5NVRvQVZtbG8'
					},
					starfox: {
						id: "starfox",
						name: "Star Fox",
						picture: 'https://drive.google.com/open?id=0B5Iz7ToBVrwUVzFQbmlZbHc4bHc'
					},
					simcity: {
						id: "simcity",
						name: "Sim City",
						picture: 'https://drive.google.com/open?id=0B5Iz7ToBVrwUMjdEeWUyWENkd3c'
					}
				});
			})
			.then(this.fetchRoomsFromDB);
	}

	writeRoomReservation(id, reservation) {
		return this.getRoomById(id)
			.then(room => {
				// we get room so some validation could be performed here before we post, though note this doesn't eliminate race conditions
				return this.http.post(this.getRoomReservationsUrl(id, reservation.startTime), reservation);
			});
	}

	deleteRoomReservation(id, reservation) {
		if (reservation.email.toLowerCase() !== this.loginService.getLoggedInUser().email.toLowerCase()) {
			alert("You may not delete this reservation because you don't own it; shame on you!");

			return;
		}

		const url = this.getRoomReservationsUrl(id, reservation.startTime, reservation.id);

		return this.http.delete(url);
	}

	getRoomReservationsUrl(id, date = null, reservation_id = ""):string {
		return this.applicationSettings.getFirebaseRestUrl(`rooms/${id}/reservations/${this.getRoomDateKey(date)}/${reservation_id}`);
	}

	getRoomDateKey(date = null):string {
		let dateKey = date
			? new Date(date).toDateString()
			: new Date().toDateString();

		dateKey = dateKey.replace(/ /g, "");

		return dateKey;
	}
}
