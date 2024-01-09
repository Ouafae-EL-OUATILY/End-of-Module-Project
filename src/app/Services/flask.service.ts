import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FlaskService {

  constructor(private http:HttpClient) { }
  Grade(ans:any,qstNum:any){
    return this.http.post(`http://127.0.0.1:5000/predict`,
        {answer:ans,modelNum:qstNum+1})
  }


}
