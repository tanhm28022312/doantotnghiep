import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private accountService: HttpClient) { }
  getAllAccount()
  {
    return this.accountService.get("http://localhost:3000/api/accounts");
  }
  registerAccount(acc:any)
  {
    return this.accountService.post("http://localhost:3000/api/accounts",acc);
  }
  editProfile(userId:any,user:any)
  {
    return this.accountService.put("http://localhost:3000/api/accounts/"+userId,user);
  }
  getAccountById(userId:any)
  {
    return this.accountService.get("http://localhost:3000/api/accounts/"+userId);
  }
  getAllContact(){
    return this.accountService.get("http://localhost:3000/api/contacts");
  }
  getAllOrder(){
    return this.accountService.get('http://localhost:3000/api/orders');
  }
  deleteUser(useId:any)
  {
    return this.accountService.delete("http://localhost:3000/api/accounts/"+useId);
  }
}
