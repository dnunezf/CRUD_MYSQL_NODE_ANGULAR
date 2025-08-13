import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

import { UsuariosComponent } from './app/components/usuarios/usuarios';

bootstrapApplication(UsuariosComponent, appConfig)
  .catch((err) => console.error(err));
