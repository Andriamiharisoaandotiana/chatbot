import { bootstrapApplication } from '@angular/platform-browser';
import { ExampleComponent } from './app/example/example.component';
import { ApiService } from './app/api.service';

bootstrapApplication(ExampleComponent, { providers: [ApiService] }).catch(
  (err) => console.error(err)
);
