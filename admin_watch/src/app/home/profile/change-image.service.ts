import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangeImageService {

constructor() { }
private changeImg = new BehaviorSubject(false);
public currentChange = this.changeImg.asObservable();

change(check: boolean){
  this.changeImg.next(check);
}
}

