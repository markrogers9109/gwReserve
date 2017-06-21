import { Component, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

import { CanComponentDeactivate } from "./../../services/dirty-form-guard.service";
import { RoomService } from "./../../services/room.service";

import { IRoom } from "./../../interfaces/IRoom";
import { IReservation } from "./../../interfaces/IReservation";

@Component({
	selector: "gw-room-form",
	templateUrl: "./room-form.component.html",
	styleUrls: ["./room-form.component.css"]
})
export class RoomFormComponent implements OnInit, CanComponentDeactivate {
	public id: number;
	public room: IRoom;
	public reservation: IReservation[];

	@ViewChild("myForm")
	public myForm: NgForm;

	public form = {};

	public reasons = [
		"Séance",
		"Scrum meeting",
		"Scrum beating",
		"Performance review",
		"Client meetup",
		"Interview"
	];

	constructor(
		private route: ActivatedRoute,
		private roomService: RoomService
	) { }

	ngOnInit() {
		this.route.parent.params
			.map(params => params["id"])
			.subscribe(id => {
				this.id = id;
				this.roomService.getRoomById(id).then(room => {
					this.room = room;
				});
			});
	}

	ngAfterViewInit() {
		// now we have access to myForm
		console.log(this.myForm);
	}

	getErrors() {
		const errorList = [];

		const controls = this.myForm.controls;

		for(let controlKey in controls) {
			let currentControlErrors = controls[controlKey].errors;

			for(let errorKey in currentControlErrors) {
				errorList.push(`${controlKey} error: ${errorKey}`);
			}
		}

		return errorList;
	}

	canDeactivate() {
		return this.myForm.dirty ? confirm("You appear to have unsaved work.  Continue?") : true;
	}

	reservationSubmission() { }
}
