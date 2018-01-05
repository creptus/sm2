import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {Routes, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';


import {AppComponent} from './app.component';

import {NotFoundComponent} from './not-found.component';
import {AquariumComponent} from './aquarium/aquarium.component';

import {AquariumService} from './services/services';
import {BedroomComponent} from './bedroom/bedroom.component';
import {CorridorComponent} from './corridor/corridor.component';

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
    AppComponent,
    AquariumComponent,
    BedroomComponent,
    CorridorComponent,
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
  providers: [AquariumService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
