import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class MovieSearchService {
    private searchSubject = new BehaviorSubject<string>('');
    search$ = this.searchSubject.asObservable();

    searchMovie(text: string) {
        this.searchSubject.next(text);
    }
}