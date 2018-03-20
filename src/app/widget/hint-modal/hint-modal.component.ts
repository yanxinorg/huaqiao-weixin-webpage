import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-hint-modal',
    templateUrl: './hint-modal.component.html',
    styleUrls: ['./hint-modal.component.css']
})
export class HintModalComponent implements OnInit {
    @Input() title: string;
    @Input() content: string;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }

}
