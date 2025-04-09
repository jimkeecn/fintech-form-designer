import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

//https://github.com/ngx-formly/ngx-formly/blob/main/src/core/src/lib/models/fieldconfig.ts

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'fintech-form-buidler';

  form = new FormGroup({});
  model = { email: '' };
  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'tw-flex tw-flex-row tw-gap-4',
      fieldGroup: [
        {
          className: 'tw-w-1/2',
          key: 'username',
          type: 'input',
          props: { label: 'Username' },
        },
        {
          className: 'tw-w-1/2',
          key: 'password',
          type: 'input',
          props: {
            label: 'Password',
            type: 'password',
          },
        },
      ],
    },
  ];

  onSubmit(model: any) {
    console.log(this.form, model);
  }
}
