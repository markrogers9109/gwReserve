export interface IUser {
	displayName: string;
	photoURL: string;
	email: string;
	// permit against excess property checking
	[propName: string]: any;
}
