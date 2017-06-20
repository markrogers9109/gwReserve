import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
	selector: "gw-welcome",
	templateUrl: "./welcome.component.html",
	styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
	public isLoginNeeded:boolean;

	constructor(
		private activatedRoute:ActivatedRoute
	) { }

	ngOnInit() {
		this.activatedRoute.fragment.subscribe(fragmentPiece => this.isLoginNeeded = fragmentPiece === "login-needed");
	}
}
