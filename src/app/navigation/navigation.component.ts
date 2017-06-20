import { Component, OnInit } from '@angular/core';

import { INavigationItem } from "./../interfaces/INavigationItem";

import { NavigationService } from "./../services/navigation.service";
import { RoomService } from "./../services/room.service";


@Component({
	selector: 'gw-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	constructor(
		public navigationService: NavigationService,
		public roomService: RoomService
	) { }

	ngOnInit() {
		// construct welcome link
		const welcomeItem:INavigationItem = {
			title   : "Welcome",
			url     : "welcome",
			color   : "blue",
			orderBy : 1
		};

		// add welcome link
		this.navigationService.addNavigationItem(welcomeItem);

		// construct exercise link
		const exerciseItem:INavigationItem = {
			title   : "Exercises",
			url     : "exercises",
			color   : "blue",
			orderBy : 30
		};

		// add exercise link
		this.navigationService.addNavigationItem(exerciseItem);

		// fetch rooms
		this.roomService.fetchRoomsFromDB().then(rooms => {
			for (let room of rooms) {
				const roomItem = {
					title            : room.name,
					url              : `/room/${room.id}`,
					color            : "green",
					orderBy          : 2,
					reservationCount : room.reservations ? room.reservations.length : 0
				};

				// add rooms
				this.navigationService.addNavigationItem(roomItem);
			}
		});
	}
}
