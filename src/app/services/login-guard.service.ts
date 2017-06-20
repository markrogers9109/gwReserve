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
		if (this.loginService.getLoggedInUser()) return true;

		this.router.navigate([""], {
			fragment: "login-needed"
		});

		return false;
	}
}
