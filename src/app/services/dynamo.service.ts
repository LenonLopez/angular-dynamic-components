import { Injectable } from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//interfaces
import { Square } from '../models/square.interface';

//API
const API = '../../assets/squares.json'
@Injectable()
export class DynamoService {

  constructor(private http:Http) { }

getSquares(): Observable<Square[]>{

return  this.http
        .get(API)
        .map((response: Response)=>response.json())
        .catch((error: any)=> Observable.throw(error.json()));
}

/*updateSquare(square:Square): Observable<Square>{
    let headers = new Headers({
        'Content-Type': 'application/json',
        'X-Debug': 'true'
    });
    let options = new RequestOptions({
        
        headers:headers

    });
        return  this.http
                .put(`${API}/${passenger.id}`, passenger, options)
                .map((response: Response)=>response.json())
                .catch((error: any)=> Observable.throw(error.json()));

}*/
}
