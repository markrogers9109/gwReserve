import { Injectable } from "@angular/core";
import { INavigationItem } from "./../interfaces/INavigationItem";

@Injectable()
export class NavigationService {
	private navigationItems = [];

	public getNavigation():INavigationItem[] {
		return this.navigationItems.sort((a, b) => a.orderBy - b.orderBy);
	}

	public addNavigationItem(item:INavigationItem):void {
		this.navigationItems.push(item);
	}
}
