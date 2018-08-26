import * as $ from 'jquery';
import { BrowserModule           } from '@angular/platform-browser';
import { NgModule                } from '@angular/core';
import { RouterModule            } from '@angular/router';
import { FormsModule,
         ReactiveFormsModule     } from '@angular/forms';
import { HttpClientModule,
         HttpClient              } from '@angular/common/http';
import { LocationStrategy,
         HashLocationStrategy    } from '@angular/common';
import { AppRoutes               } from './app.routing';
import { AppComponent            } from './app.component';

import { FlexLayoutModule        } from '@angular/flex-layout';
import { FullComponent           } from './layouts/full/full.component';
import { AppHeaderComponent      } from './layouts/full/header/header.component';
import { AppSidebarComponent     } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule      } from './demo-material-module';

import { SharedModule            } from './shared/shared.module';
import { SpinnerComponent        } from './shared/spinner.component';

import { LoginComponent          } from './login/login.component';

import { GlobalsServices         } from './services/globals.services';
import { ContatosServices        } from './services/contatos.services';
import { AccessGuard             } from './guards/accessGuard';

import { TokenInterceptor        } from './services/token.interceptor';
import { HTTP_INTERCEPTORS       } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    AppHeaderComponent,
    SpinnerComponent,
    AppSidebarComponent,
    LoginComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
  ],
  providers: [
    GlobalsServices,
    ContatosServices,
    AccessGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
