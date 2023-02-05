import { Component } from '@angular/core';
import { AccountService } from './account/services/account.service';
import { BasketService } from './basket/services/basket.service';
import { IUser } from './shared/models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ECommerice-spa';

  constructor(private basketService: BasketService,
    private accService: AccountService) {
  }

  ngOnInit() {
    this.loadBasketData();
    this.loadCurrentUser();
  }

  loadBasketData() {
    const basket = localStorage.getItem('basket');
    if (basket) {
      this.basketService.getBasket();
  }
}

  loadCurrentUser() {
    const token = localStorage.getItem('token');
    this.accService.loadCurrenyUser(token).subscribe(() => {
      //console.log("loaded user");
    }, err => {
      console.log(err);
    });
  }
}

