import { InjectionToken } from "@angular/core";
import { environment } from "../../../environments/environment";

export const API_URL = new InjectionToken<string>('api-base-url');

export const API_PROVIDER = {
  provide: API_URL,
  useValue: environment.api
};
