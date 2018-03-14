import {Component, OnInit} from '@angular/core';
import {
    ControlAnchor, GeolocationControlOptions, MapOptions, MapTypeControlOptions, MapTypeControlType, MarkerOptions,
    NavigationControlOptions, NavigationControlType,
    OverviewMapControlOptions,
    Point, ScaleControlOptions
} from 'angular2-baidu-map';

const name = '莆田华侨医院';
const address = '地址：莆田市涵江区江口镇石庭西路6号';
const phone = '电话：(0594)3795120';
const longitude = 119.160142;
const latitude = 25.480114;
const zoom = 17;

@Component({
    selector: 'app-map-baidu',
    templateUrl: './map-baidu.component.html',
    styleUrls: ['./map-baidu.component.css']
})
export class MapBaiduComponent implements OnInit {
    public opts: MapOptions;
    public controlOpts: NavigationControlOptions;
    // public overviewMapOpts: OverviewMapControlOptions;
    public geoLocationOpts: GeolocationControlOptions;
    public scaleOpts: ScaleControlOptions;
    public mapTypeOpts: MapTypeControlOptions;
    public markers: Array<{ point: Point; options?: MarkerOptions }>;
    public mapViewHeight;

    constructor() {
    }

    ngOnInit() {
        this.opts = {
            centerAndZoom: {
                lng: longitude,
                lat: latitude,
                zoom: zoom
            }
        };

        this.markers = [
            {
                // options: {
                //     icon: {
                //         imageUrl: 'assets/icons/report/head-image.png',
                //         size: {
                //             height: 50,
                //             width: 50
                //         }
                //     }
                // },
                point: {
                    lng: longitude,
                    lat: latitude,
                }
            }
        ];

        /**
         * 此类表示地图的平移缩放控件，可以对地图进行上下左右四个方向的平移和缩放操作。
         * anchor    ControlAnchor    控件的停靠位置
         * offset    Size    控件的水平偏移值
         * type    NavigationControlType    平移缩放控件的类型
         * showZoomInfo    Boolean    是否显示级别提示信息
         * enableGeolocation    Boolean    控件是否集成定位功能，默认为false
         */
        this.controlOpts = {
            anchor: ControlAnchor.BMAP_ANCHOR_TOP_LEFT,
            type: NavigationControlType.BMAP_NAVIGATION_CONTROL_LARGE
        };

        /**
         * 此类表示缩略地图控件。
         * isOpen    Boolean    缩略地图添加到地图后的开合状态，默认为关闭
         */
        // this.overviewMapOpts = {
        //     anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT,
        //     isOpen: true
        // };

        /**
         * 此类表示比例尺控件。
         */
        this.scaleOpts = {
            anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_LEFT
        };

        /**
         * 此类是负责切换地图类型的控件，此类继承Control所有功能。
         * mapTypes    Array<MapType>    控件展示的地图类型，默认为普通图、卫星图、卫星加路网混合图和三维图。
         * 通过此属性可配置控件展示的地图类型
         */
        this.mapTypeOpts = {
            type: MapTypeControlType.BMAP_MAPTYPE_CONTROL_HORIZONTAL
        };

        /**
         * 此类是负责进行地图定位的控件，使用html5浏览器定位功能，此类继承Control所有功能。
         */
        this.geoLocationOpts = {
            anchor: ControlAnchor.BMAP_ANCHOR_BOTTOM_RIGHT
        };

        this.mapViewHeight = window.innerHeight.toString() + 'px';
    }

    /**
     * 打开信息窗口
     * @param e
     * @param marker
     * @param map
     */
    public showWindow({e, marker, map}: any): void {
        const title = `<p style="font-weight: bold; color: #973444">${ name }</p>`;
        /**
         * 在PC、移动设备浏览器上打开打开该链接显示地图上的点
         *  location    lat<纬度>,lng<经度>    必选
         *  title    标注点显示标题    必选
         *  content    标注点显示内容    必选
         *  output    表示输出类型，web上必须指定为html才能展现地图产品结果。    必选
         * @type {string}
         */
        const content = `${ address }<br />${ phone }<br /><hr>
        <a class="btn btn-outline-primary btn-sm" href="http://api.map.baidu.com/marker?
        location=${ latitude },${ longitude }&title=${ name }&content=${ address }&output=html" target="_blank" >打开百度地图</a>`;
        map.openInfoWindow(
            new window.BMap.InfoWindow(
                content,
                {
                    offset: new window.BMap.Size(0, -30),
                    title: title
                }),
            marker.getPosition()
        );
    }
}
