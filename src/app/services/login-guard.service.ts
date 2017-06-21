import { Injectable } from "@angular/core";
import { Router, CanActivateChild } from "@angular/router";

import { LoginService } from "./login.service";

@Injectable()
export class LoginGuard implements CanActivateChild {
	constructor(
		private router:Router,
		private loginService:LoginService
	) { }

	canActivateChild() {
		return this.loginService.getLoggedInUser().map(
			loggedInUser => {
				console.log("Login Guard checking loggedInUser: ", loggedInUser);

				if (loggedInUser) return true;

				this.router.navigate([""], {
					fragment: "login-needed"
				});

				return false;
			}
		);
	}
}
