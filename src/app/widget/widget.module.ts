// import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';

import {VerificationCodeComponent} from './verification-code/verification-code.component';
import {HintModalComponent} from './hint-modal/hint-modal.component';

@NgModule({
    imports: [
        // CommonModule,
        FormsModule,
        NgbModule.forRoot()
    ],
    entryComponents: [
        HintModalComponent
    ],
    declarations: [
        VerificationCodeComponent,
        HintModalComponent
    ],
    exports: [
        VerificationCodeComponent,
        HintModalComponent
    ]
})
export class WidgetModule {
}
