import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { RoomsRoutingModule, routedComponents } from "./rooms.routing.module";

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		RoomsRoutingModule
	],
	declarations: routedComponents
})
export class RoomsModule { }