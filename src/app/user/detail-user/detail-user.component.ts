import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-detail-user',
    templateUrl: './detail-user.component.html',
    styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {
    userHeadImage = '../assets/icons/report/head-image.png';
    name = '';
    gender = 0;
    // age = 'XX岁';
    // session: string;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: { userInfoResolver: any }) => {
                const userInfo = data.userInfoResolver[0];
                if (typeof userInfo !== 'undefined' && userInfo !== null) {
                    this.name = userInfo.nickname;
                    this.gender = userInfo.sex;
                    this.userHeadImage = userInfo.headimgurl;
                }
            });
    }

}
