
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { PagerComponent } from './component/pager/pager.component'
import {CarouselModule} from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './component/order-totals/order-totals.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './component/text-input/text-input.component';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { StepperComponent } from './component/stepper/stepper.component';
import { RouterModule } from '@angular/router';
import { BasketSummaryComponent } from './component/basket-summary/basket-summary.component';



@NgModule({
  declarations: [
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,
    StepperComponent,
    BasketSummaryComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    CdkStepperModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    PaginationModule,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    BsDropdownModule,
    TextInputComponent,
    CdkStepperModule,
    StepperComponent,
    FormsModule,
    ReactiveFormsModule,
    BasketSummaryComponent
  ]
})
export class SharedModule { }
