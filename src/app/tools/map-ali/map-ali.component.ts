import {Component, OnInit} from '@angular/core';

declare var AMap: any;

const longitude = 119.153890;
const latitude = 25.473070;
const zoom = 17;

@Component({
    selector: 'app-map-ali',
    templateUrl: './map-ali.component.html',
    styleUrls: ['./map-ali.component.css']
})
export class MapAliComponent implements OnInit {
    private map: any;
    private marker: any;
    private infoWindow: any;

    public mapViewHeight;
    public name = '莆田华侨医院';
    public address = '地址：莆田市涵江区江口镇石庭西路869号';
    public emergency = '急诊：(0594)3795120';
    public consult = '咨询：(0594)6725120';

    constructor() {
    }

    ngOnInit() {
        this.mapViewHeight = window.innerHeight.toString() + 'px';
        const center = new AMap.LngLat(longitude, latitude);
        this.map = new AMap.Map('ali-map', {
            zoom: zoom,
            center: center
        });
        /**
         *  Marker点标记
         */
        this.marker = new AMap.Marker({
            position: center,       // marker所在的位置
            map: this.map                // 创建时直接赋予map属性
        });
        /**
         *  实例化信息窗体
         */
        this.infoWindow = new AMap.InfoWindow({
            isCustom: true,         // 使用自定义窗体
            content: window.document.getElementById('info'),
            offset: new AMap.Pixel(0, -80)
        });
        this.infoWindow.open(this.map, center);
    }

    /**
     *   打开信息窗体
     */
    openInfoWindow() {
        this.infoWindow.open(this.map, this.marker.getPosition());
    }

    /**
     *   关闭信息窗体
     */
    closeInfoWindow() {
        this.map.clearInfoWindow();
    }

}
