import {HttpClient} from "@angular/common/http";
import {Inject} from "@angular/core";
import {Observable} from "rxjs";
import {DailyTour} from "../model/daily-tour";

export class UgsService {
  constructor(
    private http: HttpClient,
    private apiPath: string,
  ) {}

  saveDailyTour(dailyTour: DailyTour): Observable<DailyTour> {
    var apiPath = 'http://localhost:4200/rest/dailytours/save';
    return this.http.post<DailyTour>(apiPath, dailyTour);
  }
}
