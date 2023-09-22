import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { DailyTour } from '../model/daily-tour';

@Injectable({ providedIn: 'root' })
export class UgsService {
  constructor(private http: HttpClient) {}

  saveDailyTour(dailyTour: DailyTour): Promise<DailyTour> {
    var apiPath = 'http://localhost:4200/rest/dailytours/save';
    return lastValueFrom(this.http.post<DailyTour>(apiPath, dailyTour));
  }
}
