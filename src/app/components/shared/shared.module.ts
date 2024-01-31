import { CommonModule, DatePipe } from "@angular/common";
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from "@angular/core";
import { MAT_DATE_LOCALE } from "@angular/material/core";
import { MatDialogRef } from "@angular/material/dialog";

import { MatButtonModule } from "@angular/material/button";
import { IconDirective } from "src/app/directives/icon.directive";
import { InputFileDirective } from "src/app/directives/input-file.directive";
import { InputNumberDirective } from "src/app/directives/input-number.directive";
import { CurvesCardComponent } from "./curves-card/curves-card.component";
import { LoadingComponent } from "./loading/loading.component";
import { PageLoadingComponent } from "./page-loading/page-loading.component";
import { PaginationComponent } from "./pagination/pagination.component";
import { TablePageLoadingComponent } from "./table-page-loading/table-page-loading.component";
import { FormattedDatePipe } from "src/app/pipes/formatted-date.pipe";
import { AvatarComponent } from "./avatar/avatar.component";
import { InitialLettersDirective } from "src/app/directives/initial-letters.directive";

@NgModule({
  imports: [CommonModule, MatButtonModule],
  declarations: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    InputNumberDirective,
    TablePageLoadingComponent,
    CurvesCardComponent,
    FormattedDatePipe,
    InitialLettersDirective,
    AvatarComponent,
  ],
  exports: [
    LoadingComponent,
    PageLoadingComponent,
    PaginationComponent,
    IconDirective,
    InputFileDirective,
    InputNumberDirective,

    MatButtonModule,
    TablePageLoadingComponent,
    CurvesCardComponent,
    FormattedDatePipe,
    InitialLettersDirective,
    AvatarComponent,
  ],
  providers: [
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: "pt-BR" },
    { provide: LOCALE_ID, useValue: "pt" },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: "BRL",
    },
    {
      provide: MatDialogRef,
      useValue: {},
    },
  ],
})
export class SharedModule {}
