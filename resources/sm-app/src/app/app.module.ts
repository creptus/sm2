import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';

import {DateEnRuPipe} from './pipes/date.en.ru.pipe';

import {AppComponent} from './app.component';

import {NotFoundComponent} from './not-found.component';
import {AquariumComponent} from './aquarium/aquarium.component';

import {AquariumService, BedroomService} from './services/services';
import {BedroomComponent} from './bedroom/bedroom.component';
import {CorridorComponent} from './corridor/corridor.component';
import {LampDirective} from './directive/lamp.directive';
import {FlashDirective} from './directive/flash.directive';

import {MyHttpLogInterceptor} from './services/http.interceptor';
import {EventService} from './services/event.service';

// определение маршрутов
const appRoutes: Routes = [
  {path: '', component: AquariumComponent},

  {path: 'aquarium', component: AquariumComponent},
  {path: 'bedroom', component: BedroomComponent},
  {path: 'corridor', component: CorridorComponent},


  {path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations: [
    DateEnRuPipe,

    AppComponent,
    AquariumComponent,
    BedroomComponent,
    CorridorComponent,
    LampDirective, FlashDirective,
    NotFoundComponent


  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes,
      {
        useHash: true
      }
    )
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: MyHttpLogInterceptor, multi: true},
    EventService,
    AquariumService, BedroomService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
