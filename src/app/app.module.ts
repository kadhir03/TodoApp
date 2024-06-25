import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

// Módulo de enrutamiento
import { AppRoutingModule } from './app-routing.module';

// Componentes principales
import { AppComponent } from './app.component';

// Componentes de páginas
import { HomeComponent } from './pages/home/home.component';

// Módulo de FontAwesome para iconos
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Módulos de traducción
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Función de fábrica para cargar los archivos de traducción
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// Inicializador de la aplicación
export function appInitializerFactory(translate: TranslateService) {
  return () => {
    translate.setDefaultLang('es');
    return translate.use('es').toPromise();
  };
}

@NgModule({
  declarations: [
    AppComponent, // Componente principal de la aplicación
    HomeComponent // Componente de la página de inicio
  ],
  imports: [
    BrowserModule, // Módulo para aplicaciones que se ejecutan en el navegador
    FormsModule, // Módulo para formularios basados en plantillas
    ReactiveFormsModule, // Módulo para formularios reactivos
    HttpClientModule, // Módulo para realizar solicitudes HTTP
    AppRoutingModule, // Módulo de enrutamiento
    FontAwesomeModule, // Módulo para usar iconos de FontAwesome
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }) // Módulo para la internacionalización (i18n) y traducciones
  ],
  providers: [
    {
      provide: APP_INITIALIZER, // Proveedor para inicializar la aplicación con configuraciones específicas
      useFactory: appInitializerFactory, // Función de fábrica para inicializar la aplicación con el servicio de traducción
      deps: [TranslateService], // Dependencias necesarias para la inicialización
      multi: true // Permite que múltiples inicializadores se ejecuten simultáneamente
    }
  ],
  bootstrap: [AppComponent] // Componente raíz que Angular crea e inserta en la página web
})
export class AppModule { }
