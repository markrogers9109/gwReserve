import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { LoginService } from "./../services/login.service";

import { IUser } from "./../interfaces/IUser";

@Component({
	selector: "gw-login",
	templateUrl: "./login.component.html",
	styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
	public loggedInUser:IUser;

	constructor(
		private router:Router,
		private loginService:LoginService
	) { }

	ngOnInit() {
		this.setLoggedInUser();
	}

	login() {
		this.loginService.login();
		this.setLoggedInUser();
		this.refreshRoute();
	}

	logout() {
		this.loginService.logout();
		this.setLoggedInUser();
		this.refreshRoute();
	}

	private setLoggedInUser() {
		this.loggedInUser = this.loginService.getLoggedInUser();
	}

	private refreshRoute() {
		const navigateToUrlCommand = [ this.router.url.startsWith("/room/") ? "" : this.router.url ];
		this.router.navigate(navigateToUrlCommand);
	}
}
