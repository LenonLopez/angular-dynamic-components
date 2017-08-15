import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
declare var AWS:any;
declare var AWS_DYNAMO_CONFIG: any;
AWS.config.update(AWS_DYNAMO_CONFIG);
//interfaces
import { Square } from '../models/square.interface';

//API
const API = '../../assets/squares.json'
@Injectable()
export class DynamoService {
    private dynamodb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
  constructor(private http:HttpClient) { }


getSquares(table: string):Observable<any>{
  
    const params = {
        TableName: 'square'
       };

    let request =  this.dynamodb.scan(params);
    request.on('success', function(response){

        console.log(response.data);

    }); 

    return Observable.from(request.promise())
}


}
