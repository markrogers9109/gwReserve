import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { HttpModule } from "@angular/http";

import { RoomsModule } from "./rooms/rooms.module";

import { AppRoutingModule, routedComponents } from "./app.routing.module";

import { AppComponent } from "./app.component";
import { AsyncPatternsComponent } from './exercises/async-patterns/async-patterns.component';
import { LoginComponent } from "./login/login.component";
import { NavigationComponent } from "./navigation/navigation.component";

import { ApplicationSettings } from "./services/application-settings.service";
import { LoginService } from "./services/login.service";
import { NavigationService } from "./services/navigation.service";
import { RoomService } from "./services/room.service";

@NgModule({
	imports: [
		// vendor modules
		BrowserModule,
		CommonModule,
		HttpModule,

		// our modules
		RoomsModule,
		AppRoutingModule
	],
	declarations: [
		AppComponent,
		AsyncPatternsComponent,
		LoginComponent,
		NavigationComponent,
		routedComponents
	],
	providers: [
		ApplicationSettings,
		LoginService,
		NavigationService,
		RoomService
	],
	bootstrap: [ AppComponent ]
})
export class AppModule { }
