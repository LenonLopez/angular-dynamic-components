import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SquareComponent } from './square/square.component';
import { MoveDirective } from './directives/move.directive';
import { DynamoService } from './services/dynamo.service';

@NgModule({
  declarations: [
    AppComponent,
    SquareComponent,
    MoveDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DynamoService],
  entryComponents:[SquareComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
