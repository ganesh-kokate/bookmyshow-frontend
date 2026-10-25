interface MovieShow {
    movieId: number;
    movieTitle: string;
    showId: string;
    theaterName: string;
    screenName: string;
    startTime: string;
    endTime: string;
}

export interface MovieShowsDTO {
    theaterId: string;
    theaterName: string;
    theaterCity: string;
    shows: ShowDTO[];
}

export interface ShowDTO {
    showId: string;
    screenName: string;
    startTime: string;
    endTime: string;
}

export interface SeatRow {
    rowName: string;
    price: number;
    seats: Seat[];
}

export interface Seat {
    seatId: string;
    status: string;
    price: number;
}

export interface SeatApiResponse {
    showId: string;
    seats: Seat[];
}