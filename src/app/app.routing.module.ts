import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExercisesComponent } from "./exercises/exercises.component";
import { WelcomeComponent } from "./welcome/welcome.component";

import { LoginGuard } from "./services/login-guard.service";
import { DirtyFormGuard } from "./services/dirty-form-guard.service";

// please note our Route interface provided by Angular team:
// export interface Route {
// 	path?: string;
// 	pathMatch?: string;
// 	matcher?: UrlMatcher;
// 	component?: Type<any>;
// 	redirectTo?: string;
// 	outlet?: string;
// 	canActivate?: any[];
// 	canActivateChild?: any[];
// 	canDeactivate?: any[];
// 	canLoad?: any[];
// 	data?: Data;
// 	resolve?: ResolveData;
// 	children?: Routes;
// 	loadChildren?: LoadChildren;
// 	runGuardsAndResolvers?: RunGuardsAndResolvers;
// }

const routes: Routes = [
	// let's add our "root" route
	{
		path: "",
		redirectTo: "welcome",
		pathMatch: "full"
	},

	// add specific routes
	{
		path: "welcome",
		component: WelcomeComponent
	},
	{
		path: "exercises",
		component: ExercisesComponent
	},

	// finally, add "catch-all" route, taking the place of "otherwise" from legacy Angular
	{
		path: "**",
		pathMatch: "full",
		redirectTo: "welcome"
	}
];

@NgModule({
	imports: [ RouterModule.forRoot(routes) ],
	exports: [ RouterModule ],
	providers: [ LoginGuard, DirtyFormGuard ]
})
export class AppRoutingModule { }

export const routedComponents = [
	ExercisesComponent,
	WelcomeComponent
];
