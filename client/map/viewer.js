// import Cesium from 'cesium/Cesium';
// import {DrawHelper} from 'map/drawHelper';
// eslint-disable-line import/no-unresolved
//  import ViewerCesiumNavigationMixin from 'cesiumNav/viewerCesiumNavigationMixin';
import {LAYERS} from 'map/layer-names';
import {COORDINATE_SYTEM} from 'map/coordinate-system';
import {getImageryurl} from 'map/config';

/**
 * The identifiers of the Cesium viewers in the application.
 * @type  {Object.<string>}
 */
export const viewerIdentifiers = {
  intelRequest: 'INTEL_REQUEST',
  liveView: 'LIVE_VIEW',
  location: 'LOCATION',
  collectionPlan: 'COLLECTION_PLAN',
};


/**
 * The map of viewer identifiers to their corresponding viewer instance.
 * @type  {Map.<string, Object>}
 */
export const viewers = new Map();

var map     = null;
var drawing = null;
var mediaManager = null;
var videoPlayer = null;
var klvModel    = null;

/**
 * Returns the viewer instance representing the provided viewer identifier.
 * @param   {string}  viewerId  The identifier of the viewer.
 * @param   {string}  elementId The identifier of the viewer's parent element.
 * @returns {Object}
 */
export function createViewer(viewerId, elementId, liveViewToolBar) {
    if (viewers.has(viewerId)) return;
    addElements(elementId);

    initDragListener();
    initListener();
}

export function destroyViewer(viewerId) {
    if (!viewers.has(viewerId)) {
        return;
    }

    viewers.get(viewerId).destroy();
    viewers.delete(viewerId);
}

function initListener() {
    $('#toggle').click(function(e) {
        $('#box').toggleClass('min');
    });

    $('#expand').click(function(e) {
        $('#box').toggleClass('expand');
    });

    $('#close').click(function(e) {
        $('#box').remove();
    });

    $(window).resize(function() {
        var windowsHeight = $(window).height();

        if (windowsHeight < 750){
            $('body').addClass('small-height');
        } else {
            $('body').removeClass('small-height');
        }
    }).resize();

    // Initialize SelectMenu
    $(".misson_select").selectmenu({
        change: function(event, ui) {
            // alert(ui.item.value);
        }
    });

    $(".font_select").selectmenu({
        change: function(event, ui) {
            drawing.font = parseInt(ui.item.value);
        }
    });

    $(".fill_line_select").selectmenu({
        change: function(event, ui) {
            drawing.fillLine = parseInt(ui.item.value);
        }
    });

    $(".font_size_select").selectmenu({
        change: function(event, ui) {
            drawing.fontSize = parseInt(ui.item.value);
        }
    });

    $(".out_line").selectmenu({
        change: function(event, ui) {
            drawing.outLine = parseInt(ui.item.value);
        }
    });

    $(".drawing_category").selectmenu({
        change: function(event, ui) {
            // alert(ui.item.value);
        }
    });

    var colorpicker = $('.colorpicker');
    colorpicker.colorpickerplus();
    colorpicker.on('changeColor', function(e,color){
        console.log();
        if(color==null) {
            //when select transparent color
            $('.color-fill-icon', $(this)).addClass('colorpicker-color');
        } else {
            $('.color-fill-icon', $(this)).removeClass('colorpicker-color');
            $('.color-fill-icon', $(this)).css('background-color', color);

            var name    = $('.color-fill-icon', $(this))[0].className;
            if (name == "color-fill-icon dropdown-color-fill-icon fill-color")
            {
                drawing.fillColor = color;
            }
            else if (name == "color-fill-icon dropdown-color-fill-icon outline-color")
            {
                drawing.outColor = color;
            }
            else if (name == "color-fill-icon dropdown-color-fill-icon font-color")
            {
                drawing.fontColor = color;
                mediaManager.fontColor = color;
            }
        }
    });

    // Styled Checkbox
    $('.checklist-block label:not(.radio)').unbind("click").click(function () {
        if ($(this).is('.active')) {
            $(this).removeClass('active').find('input').prop('checked', false).change();
        } else {
            $(this).addClass('active').find('input').prop('checked', true).change();
        }
    });

    // Platforms Popup
    $('.sidebar-left-block ul li').click(function(ev){
        ev.preventDefault();

        $('.sidebar-left-block ul li').removeClass('active');
        $(this).addClass('active');

        $('.platforms-popup-block').animate({left: -263}, 300);

        $(this).closest('body').find('.platforms-popup-block').animate({left: 50}, 300);
    });

    $('.platforms-popup-block .btn-close').click(function(){
        $('.sidebar-left-block ul li').removeClass('active');
        $('.platforms-popup-block').animate({left: -263}, 300);
    });

    // Styled Scroll
    $('.scroll-pane').jScrollPane({
        autoReinitialise: true,
        mouseWheelSpeed: 5
    });

    // Video Player Position
    $(window).resize(function() {
        var playerBlock = $('.video-player-wrapper');
        var playerWidth = $(playerBlock).width();
        var playerHeight = $(playerBlock).height();

        if ($(playerBlock).is('.open')){
            $(playerBlock).css({
                'margin-left': -playerWidth / 2 - 118,
                'margin-top': -playerHeight / 2
            });
        } else {
            $(playerBlock).css({
                'margin-left': -playerWidth / 2,
                'margin-top': -playerHeight / 2
            });
        }
    }).resize();

    // Video Info Popup
    var activePopup = '';
    $('.video-popup-buttons a').click(function(ev){
        ev.preventDefault();

        $(this).closest('.video-player-wrapper').removeClass('full-screen');

        if ($(this).closest('.video-player-wrapper').is('.open') && activePopup == $(this).data('popup')) {
            $('.video-info-popup .btn-close').click();
            return;
        }

        activePopup = $(this).data('popup');

        var panelWidth = 238;
        $(this).closest('.video-player-wrapper').addClass('open');

        $('.video-info-popup:not(' + activePopup + ')').animate({right: 17, opacity: 0}, 300);
        $('.video-info-popup' + activePopup).animate({right: -panelWidth, opacity: 1}, 300);
        $('.video-player-wrapper').animate({marginLeft: - $('.video-player-wrapper').width() / 2 - panelWidth / 2}, 300);
    });

    $('.video-info-popup .btn-close').click(function(){
        var playerWidth = $('.video-player-wrapper').width();

        activePopup = '';

        $(this).closest('.video-player-wrapper').removeClass('open');
        $('.video-info-popup').animate({right: 17, opacity: 0}, 300);

        $('.video-player-wrapper').animate({marginLeft: -playerWidth / 2}, 300);
    });

    // Video Player Track Time
    $('.play-track-block').mousemove(function(event) {
        var pos = $(this).offset();
        var pageX = event.pageX;
        var x = pageX - pos.left - 20;

        var timeBlockWidth = $('.time-video').width();

        $(this).find('.time-video').css({
            'display' : 'block',
            'left' : x - (timeBlockWidth/2) + 'px'
        });
    });

    $('.play-track-block').mouseout(function() {
        $(this).find('.time-video').hide();
    });

    // Video Rewind
    $('.bottom-panel-player .btn-rewind.backward').click(function(ev){
        ev.preventDefault();

        $('.rewind-popup.forward').fadeOut();
        $('.rewind-popup.backward').fadeIn();
    });

    $('.bottom-panel-player .btn-rewind.forward').click(function(ev){
        ev.preventDefault();

        $('.rewind-popup.backward').fadeOut();
        $('.rewind-popup.forward').fadeIn();
    });

    $('.rewind-popup').click(function(ev){
        ev.preventDefault();

        $(this).fadeOut();
    });

    // Video Player Full Screen
    $('.bottom-panel-player .btn-fullscreen').click(function(ev){
        ev.preventDefault();

        $(this).closest('.video-player-wrapper').toggleClass('full-screen');
    });

    // Remove a placeholder from the input field
    $('input,textarea').focus(function(){
        $(this).data('placeholder',$(this).attr('placeholder'))
        $(this).attr('placeholder','');
    });
    $('input,textarea').blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
    });

    // Maps Popup
    $('.sidebar-right-block .maps-link').click(function(ev){
        ev.preventDefault();

        $('.sidebar-right-block ul li').removeClass('active');
        $(this).addClass('active');

        $('.right-popup-block').animate({right: -285}, 300);
        $('.maps-popup-block').animate({right: 50}, 300);
    });

    $('.right-popup-block .btn-close').click(function(){
        $('.sidebar-right-block ul li').removeClass('active');
        $('.maps-popup-block').animate({right: -162}, 300);
    });

    // Fuse Popup
    $('.right-popup-block .sidebar-maps-menu a.fuse-link').click(function(ev){
        ev.preventDefault();

        $(this).toggleClass('active');
        $('.fuse-popup-menu').slideToggle();
    });

    // Drawing Popup
    $('.sidebar-right-block .drawing-link').click(function(ev){
        ev.preventDefault();

        $('.sidebar-right-block ul li').removeClass('active');
        $(this).addClass('active');

        $('.right-popup-block').animate({right: -285}, 300);
        $('.drawing-popup-block').animate({right: 50}, 300);
    });

    $('.right-popup-block .btn-close').click(function(){
        $('.sidebar-right-block ul li').removeClass('active');
        $('.drawing-popup-block').animate({right: -283}, 300);
    });

    // DropPOI Popup
    
    $('.droppoi-popup-block .btn-close').click(function(){
        $('.droppoi-popup-block').fadeOut();
    });
    $('.pin-block-wrapper .pin').click(function(){
        $('.droppoi-popup-block').fadeOut();
        $('.droppoi-pin-popup').fadeIn();
    });
    $('.droppoi-pin-popup .btn-close').click(function(){
        $('.droppoi-pin-popup').fadeOut();
    });

    $('.drop-multimedia-popup .btn-close').click(function(){
        $('.drop-multimedia-popup').fadeOut();
    });

    // DropPOI Popup Content Height
    var dropPoiPopupHeight = $('.droppoi-popup-block').height();
    $('.droppoi-popup-block .left-block').css({'min-height': dropPoiPopupHeight});

    // Slider Range
    $('.folder-title').click(function(ev){
        ev.preventDefault();

        $(this).toggleClass('open');
        $(this).parent().find('.folder-content').slideToggle('300');
    });

    $('.slider-range-min').slider({
        range: "min",
        value: 50,
        min: 1,
        max: 100,
        change: function( event, ui ) {
            $(this).parent().find('.amount').val(ui.value + "%");

            var name = $(this)[0].className;
            if (name.includes("fill_opacity"))
            {
                drawing.fillAlpha   = ui.value / 100.0;
            }
            else if (name.includes("outline_opacity"))
            {
                drawing.outAlpha   = ui.value / 100.0;
            }
            else if (name.includes("fuse_opacity"))
            {
                map.setSelectedOpacity(ui.value / 100.0);
            }
            
        },
        slide: function( event, ui ) {
            $(this).parent().find('.amount').val(ui.value + "%");

            var name = $(this)[0].className;
            if (name.includes("fill_opacity"))
            {
                drawing.fillAlpha   = ui.value / 100.0;
            }
            else if (name.includes("outline_opacity"))
            {
                drawing.outAlpha   = ui.value / 100.0;
            }
            else if (name.includes("fuse_opacity"))
            {
                map.setSelectedOpacity(ui.value / 100.0);
            }
        }
    });

    $('.slider-range-block .btn-plus').click(function (ev){
        ev.preventDefault();

        var currentValue = $(this).parent().find('.slider-range-min').slider('value') + 1;
        $(this).parent().find('.slider-range-min').slider('value', currentValue);
    });

    $('.slider-range-block .btn-minus').click(function (ev){
        ev.preventDefault();

        var currentValue = $(this).parent().find('.slider-range-min').slider('value') - 1;
        $(this).parent().find('.slider-range-min').slider('value', currentValue);
    });

    var orientation = $('.slider-range-min').slider("option", "orientation");
    $('.slider-range-vertical').slider( "option", "orientation", "vertical" );

    $(this).parent().find('.amount').val($('.slider-range-min').slider("value") + "%");

    // Search Popup
    $('.sidebar-right-block .search-link').click(function(ev){
        ev.preventDefault();

        $('.sidebar-right-block ul li').removeClass('active');
        $(this).addClass('active');

        $('.right-popup-block').animate({right: -285}, 300);
        $('.search-popup-block').animate({right: 50}, 300);
    });

    $('.right-popup-block .btn-close').click(function(){
        $('.sidebar-right-block ul li').removeClass('active');
        $('.search-popup-block').animate({right: -231}, 300);
    });

    $('.datepicker').datepicker();

    // TimePicker
    $('.timepicker').timepicki();

    // Template Folding
    $('.folding-title').click(function(ev){
        ev.preventDefault();

        $(this).toggleClass('open');
        $(this).parent().find('.folding-content').slideToggle('300');
    });

    // Minimized Template
    $(window).resize(function() {
        var templatePanelHeight = $('.template-panel-block').height();

        $('.template-panel-block .btn-control .btn-curtail').click(function(ev){
            ev.preventDefault();

            $(this).closest('.template-panel-block').addClass('minimized').animate({top: templatePanelHeight, bottom: 40}, 300);
        });
        //
        $('.template-panel-block .btn-control .btn-expand').click(function(ev){
            ev.preventDefault();

            $(this).closest('.template-panel-block').removeClass('minimized').animate({top: 40, bottom: 40}, 300);
        });

    }).resize();

    $('.template-panel-block .btn-control .btn-close').click(function(ev){
        ev.preventDefault();

        $(this).closest('.template-panel-block').fadeOut(300);
    });

    // Tools Folding
    $('.tools-folding-title').click(function(ev){
        ev.preventDefault();

        $(this).toggleClass('open');
        $(this).parent().find('.tools-folding-content').slideToggle('300');
    });
    
    initControls();
}

function initControls() {
    map     = new CesiumMap();
    map.init();

    klvModel = new KLVModel();
    klvModel.init(map.viewer);
    
    // videoPlayer     = new VideoPlayer();

    // videoPlayer.init();

    // videoPlayer.startPlayUrl('https://5833ea194a860.streamlock.net:443/tegme/mp4:19_543_surf-.mp4/playlist.m3u8', './sampledata/jackson.json',true);

    initFunctionEvent();
}


function initFunctionEvent()
{
    $('.columbus-link').click(function(ev){
        ev.preventDefault();

        if (map != undefined)
        {
            map.setColumbusView();
            if (map.getColumbus())
            {
                $('.columbus-link').addClass('active');
            }
            else
            {
                $('.columbus-link').removeClass('active');
            }
        }
    });
}

function initDragListener() {
    var dragresize = new DragResize('dragresize',
    { minWidth: 100, minHeight: 100, minLeft: 10, minTop: 20, maxLeft: 2000, maxTop: 2000 });

    // Optional settings/properties of the DragResize object are:87

    //  enabled: Toggle whether the object is active.
    //  handles[]: An array of drag handles to use (see the .JS file).
    //  minWidth, minHeight: Minimum size to which elements are resized (in pixels).
    //  minLeft, maxLeft, minTop, maxTop: Bounding box (in pixels).

    // Next, you must define two functions, isElement and isHandle. These are passed
    // a given DOM element, and must "return true" if the element in question is a
    // draggable element or draggable handle. Here, I'm checking for the CSS classname
    // of the elements, but you have have any combination of conditions you like:

    dragresize.isElement = function(elm){
        if (elm.className && elm.className.indexOf('drsElement') > -1) return true;
    };
    dragresize.isHandle = function(elm){
        if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
    };

    // You can define optional functions that are called as elements are dragged/resized.
    // Some are passed true if the source event was a resize, or false if it's a drag.
    // The focus/blur events are called as handles are added/removed from an object,
    // and the others are called as users drag, move and release the object's handles.
    // You might use these to examine the properties of the DragResize object to sync
    // other page elements, etc.

    dragresize.ondragfocus = function() { };
    dragresize.ondragstart = function(isResize) { };
    dragresize.ondragmove = function(isResize) { };
    dragresize.ondragend = function(isResize) { };
    dragresize.ondragblur = function() { };

    // Finally, you must apply() your DragResize object to a DOM node; all children of this
    // node will then be made draggable. Here, I'm applying to the entire document.
    dragresize.apply(document);
}

function addElements(elementId) {
    let parentElement = $('#' + elementId);
    let component = $(`
        <!-- Header -->
        <!--<header class="clearfix">
            <div class="left-block">
                <a href="#">User Name</a>
                <a href="#">Title</a>
                <a href="#">Logout</a>
            </div>
            <div class="middle-block">
                <div class="current-status-block green">Unclassified</div>
                <div class="status-indicators-block clearfix">
                    <div class="green">com:</div>
                    <div class="yellow">sys:</div>
                    <div class="red">sec:</div>
                </div>
            </div>
            <div class="right-block">
                <p class="local-time">Local: <span>18:30:23</span></p>
                <p class="zulu-time">Zulu: <span>08:30:23</span></p>
            </div>
        </header>
        -->
        <!-- #End Header -->

        <!-- Sidebar Left -->
        <div class="sidebar-left-block sidebar-block">
            <a href="#" class="logo">
                <img src="/vendor/drawing/images/logo.png" alt="logo">
            </a>

            <ul>
                <li class="home-link">
                    <a href="#"><span>Home</span></a>
                </li>
                <li class="missions-link">
                    <a href="#"><span>Missions</span></a>
                </li>
                <li class="platforms-link">
                    <a href="#"><span>Platforms</span></a>
                </li>
                <li class="systems-link">
                    <a href="#"><span>Sources</span></a>
                </li>
                <!--<li class="tracks-link">
                    <a href="#"><span>Tracks</span></a>
                </li>
                <li class="sigint-link">
                    <a href="#"><span>SIGINT</span></a>
                </li>-->
                <li class="humint-link">
                    <a href="#"><span>Personnel</span></a>
                </li>
                <!--
                <li class="image-link">
                    <a href="#"><span>Image Library</span></a>
                </li>
                <li class="video-link">
                    <a href="#"><span>Video Library</span></a>
                </li>
                <li class="reports-link">
                    <a href="#"><span>Intel Reports</span></a>
                </li>
                -->
            </ul>
        </div>
        <!-- #End Sidebar Left -->

        <div class="content-block break-out-map">
            <div id="box-break-out" class="drsElement break-out-wrapper" style="position: absolute;width: 460px;height: 380px;right: -14px;bottom: 10px;z-index:4;">
                <div class="drsMoveHandle topdrag"></div>
                <div class="top-panel-player clearfix">
                    <div class="left-block">
                        <p>[Break Out Map]</p>
                    </div>
                    <div class="right-block">
                        <span id ="close-break-out"><a href="#" class="btn-close"></a></span>
                    </div>
                </div>
                <canvas id="break-out-map-content" style="
                    width: 100%;
                    height: calc(100% - 48px);
                    margin-top: 48px;
                ">
                </canvas>
            </div>
        </div>
        
        <!-- Content -->
        <div class="content-block video-player">
            <div id="box" class="drsElement video-player-wrapper" style="left: 245px; top: 80px; z-index:4;">
                <div class="drsMoveHandle topdrag"></div>
                <div class="dragresize dragresize-tl" style="visibility: visible;"></div>
                <div class="dragresize dragresize-tm" style="visibility: visible;"></div>
                <div class="dragresize dragresize-tr" style="visibility: visible;"></div>
                <div class="dragresize dragresize-ml" style="visibility: visible;"></div>
                <div class="dragresize dragresize-mr" style="visibility: visible;"></div>
                <div class="dragresize dragresize-bl" style="visibility: visible;"></div>
                <div class="dragresize dragresize-bm" style="visibility: visible;"></div>
                <div class="dragresize dragresize-br" style="visibility: visible;"></div>
                <div  class="inner-box">
                    <!-- Top Panel Player -->
                <div class="top-panel-player clearfix">
                    <div class="left-block">
                        <p><span style="border-color: #02B050"></span>[Predatur Titanium]</p>
                    </div>
                    <div class="middle-block">
                        <p>Unclassified</p>
                    </div>
                    <div class="right-block">
                        <span id ="toggle"><a href="#" class="btn-curtail"></a></span>
                        <span id ="expand"><a href="#" class="btn-expand"></a></span>
                        <span id ="close"><a href="#" class="btn-close"></a></span>
                    </div>
                </div>
                <!-- #End Top Panel Player -->

                <!-- Video Player Content -->
                <div class="video-player-content">
                    <div class="drsMoveHandle center-drag"></div>
                    <video id="myVideo" controls="true" style="position:absolute;left:0px;top:0px;width:100%;height:100%;background:black;">
                        <p>Your browser does not support the video tag.</p>
                    </video>
                    <div class="videoBack" style="position:absolute;left:0px;top:0px;width:100%;height:100%;"></div>
                    <div class="loading" style="position:absolute;left:0px;top:0px;width:100%;height:100%;"></div>
                </div>
                <!-- #End Video Player Content -->

                <!-- Bottom Panel Player -->
                <div class="bottom-panel-player">
                    <!-- Play Track -->
                    <div class="play-track-block">
                        <div class="play-track-uploaded" style="width: 0%"></div>
                        <div class="play-track-viewed" style="width: 0%">
                            <span></span>
                        </div>
                        <div class="time-video">06:32:32</div>
                    </div>
                    <!-- #End Play Track -->

                    <div class="clearfix">
                        <div class="left-block">
                            <a href="#" class="btn-rewind backward"></a>
                            <a href="#" class="btn-play"></a>
                            <!--<a href="#" class="btn-play pause"></a>-->
                            <a href="#" class="btn-rewind forward"></a>

                            <div class="rewind-popup backward">
                                <p>Backward</p>
                                <a href="#" info='1x'>1x</a>
                                <a href="#" info='2x'>2x</a>
                                <a href="#" info='3x'>3x</a>
                                <a href="#" info='5x'>5x</a>
                                <a href="#" info='10x'>10x</a>
                            </div>
                            <div class="rewind-popup forward">
                                <p>Forward</p>
                                <a href="#" info='1x'>1x</a>
                                <a href="#" info='2x'>2x</a>
                                <a href="#" info='3x'>3x</a>
                                <a href="#" info='5x'>5x</a>
                                <a href="#" info='10x'>10x</a>
                            </div>
                        </div>
                        <div class="middle-block time">
                            <span class="current"></span> / 
                            <span class="duration"></span>
                        </div>
                        <div class="right-block clearfix">
                            <div class="left-block video-popup-buttons">
                                <a href="#" class="btn-tag" data-popup=".tag"></a>
                                <a href="#" class="btn-metadata" data-popup=".metadata"></a>
                            </div>
                            <div class="middle-block">
                                <a href="#" class="btn-rec"></a>
                                <a href="#" class="btn-capture"></a>
                            </div>
                            <div class="right-block">
                                <a href="#" class="btn-fullscreen"></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- #End Bottom Panel Player -->

                <!-- Video Info Popup -->
                <div class="video-info-popup metadata">
                    <h3>Unclassified</h3>
                    <div class="scroll-pane">
                        <div class="title-block">Platform Telemetry</div>
                        <p id="plat_lat"><span>Lat: </span>232.32342</p>
                        <p id="plat_lon"><span>Long: </span>093.42535</p>
                        <p id="plat_mgrs"><span>MGRS: </span>33403534345</p>
                        <p id="plat_alt"><span>Altitude: </span>9.324 M</p>
                        <p id="plat_speed"><span>Speed: </span>439 MPH</p>
                        <p id="plat_pitch"><span>Pitch: </span>-230.34</p>
                        <p id="plat_yaw"><span>Yaw: </span>132.248</p>
                        <p id="plat_roll"><span>Roll: </span>-12.002</p>
                        <p id="plat_bearing"><span>Bearing: </span>90.2302</p>

                        <div class="title-block">Target Grid</div>
                        <p id="target_lat"><span>Lat: </span>232.32342</p>
                        <p id="target_lon"><span>Long: </span>093.42535</p>
                        <p id="target_mgrs"><span>MGRS: </span>4343555534</p>
                        <p id="target_elevat"><span>Elevation: </span>21 M</p>
                        <p id="target_speed"><span>Speed: </span>32 MPH</p>
                    </div>

                    <div class="btn-close"></div>
                </div>
                <!-- #End Video Info Popup -->

                <!-- Video Info Popup -->
                <div class="video-info-popup tag">
                    <h3>Unclassified</h3>
                    <div class="scroll-pane">
                        <div class="title-block">Tag Entry</div>
                        <form>
                            <textarea placeholder="Enter the tag"></textarea>
                            <button class="btn-enter">Enter</button>
                        </form>

                        <div class="title-block">Video Tags</div>
                        <a href="#">Insurgent Safehouse</a>
                        <a href="#">3 PAX</a>
                        <a href="#">Long Guns</a>
                        <a href="#">IED Factory</a>
                    </div>

                    <div class="btn-close"></div>
                </div>
                <!-- #End Video Info Popup -->

                <!-- Angle Player -->
                <div class="angle-top-left"></div>
                <div class="angle-bottom-left"></div>
                <div class="angle-top-right"></div>
                <div class="angle-bottom-right"></div>
                <!-- #End Angle Player -->
                    <!--div class="drsMoveHandle bottom-drag"></div-->
                </div>
            </div>
        </div>
        <!-- #End Content -->
        
        <!-- Content -->
        <img id='screenoverlay' />
        <div class="content-block map-content-block">
            <!-- <img src="/vendor/drawing/images/content/map_image.png" alt="map"> -->
            <div id="previewContent" alt="map">
                <div id="cesiumContainer"></div>
            </div>

            <div id="text_create">
                <input type="text" id="text_create_value" placeholder="Text" required />
                <button type="button" id="cancel_button">Cancel</button>
                <button type="button" id="save_button">Save</button>
            </div>
        </div>
        <!-- #End Content -->

        <!-- Sidebar Right -->
        <div class="sidebar-right-block sidebar-block">
            <ul>
                <li class="maps-link">
                    <a href="#"><span>Maps</span></a>
                </li>
                <!--
                <li class="geo-admin">
                    <a target="_blank" href="http://localhost/geoserver/web"><span>GeoAdmin</span></a>
                </li>
                -->
                <li class="layers-link">
                    <a href="#"><span>Layers</span></a>
                </li>
                <li class="drawing-link">
                    <a href="#"><span>Drawing</span></a>
                </li>
                <li class="measure-link">
                    <a href="#"><span>Measure</span></a>
                </li>
                <!--
                <li class="tools-link">
                    <a href="#"><span>Tools</span></a>
                </li>
                -->
                <li class="search-link">
                    <a href="#"><span>Search</span></a>
                </li>
                <!--
                <li class="details-link">
                    <a href="#"><span>Details</span></a>
                </li>
                <li class="timeline-link">
                    <a href="#"><span>Timeline</span></a>
                </li>
                <li class="sysadmin-link">
                    <a href="#"><span>Sys Admin</span></a>
                </li>
                -->
            </ul>
        </div>
        <!-- #End Sidebar Right -->

        <!-- Footer -->
        <footer class="clearfix">
            <div class="left-block">
                <p class="lat"><span style="color: #1cc15d;">LAT: </span>-43.23234</p>
                <p class="lon"><span style="color: #727914;">LON: </span>-23.23342</p>
                <p class="elv"><span style="color: #f02011;">ELV: </span>2,232m</p>
                <p class="alt"><span style="color: #d66619;">ALT: </span>4,232m</p>
            </div>
            <!--<div class="middle-block">
                <div class="current-status-block green">Unclassified</div>
            </div>
            <div class="right-block">
                <a href="#" class="email-link"></a>
                <a href="#" class="messages-link"></a>
                <a href="#" class="alerts-link"></a>
                <a href="#" class="notifications-link"><span>2</span></a>
                <a href="#" class="audio-link"></a>
                <a href="#" class="break-out"></a>
            </div>-->
        </footer>
        <!-- #End Footer -->

        <!-- Platforms Popup -->
        <div class="platforms-popup-block popup-block scroll-pane">
            <div class="title-block">
                PLATFORMS
                <div class="btn-close"></div>
            </div>

            <!-- SelectMenu Block -->
            <div class="selectmenu-block">
                <select class="selectmenu misson_select">
                    <option>by Mission</option>
                    <option selected="selected">by Type</option>
                    <option>by Payload</option>
                    <option>by AO</option>
                </select>
            </div>
            <!-- #End SelectMenu Block -->

            <!-- Checklist Block -->
            <div class="checklist-block">
                <label class="checkbox active">
                    <i style="background: #FFAC00;"></i>Vehicles<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #16DCFF;"></i>Satellite<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #D100FF;"></i>Fighter<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox active">
                    <i style="background: #A78BFF;"></i>Ships<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #C65D92;"></i>Vehicles<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #C7FF00;"></i>Aircraft<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #0091FF;"></i>Ships<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #00FFE3;"></i>Submarines<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox active">
                    <i style="background: #FFFEBE;"></i>Rockets<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #FFFFFF;"></i>Aircraft<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #FFC598;"></i>Fighter<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #95BDD9;"></i>Ships<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #4A8C5C;"></i>Satellite<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #A77168;"></i>Aircraft<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #962D1B;"></i>Rockets<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
                <label class="checkbox">
                    <i style="background: #4C63AA;"></i>Submarines<input type="checkbox">
                    <span class="info-icon"></span>
                </label>
            </div>
            <!-- #End Checklist Block -->
        </div>
        <!-- #End Platforms Popup -->

        <!-- Maps Popup -->
        <div class="maps-popup-block right-popup-block scroll-pane">
            <div class="title-block">
                MAPS
                <div class="btn-control clearfix">
                    <div class="btn-curtail"></div>
                    <div class="btn-expand"></div>
                    <div class="btn-close"></div>
                </div>
            </div>
            <div class="sidebar-maps-menu clearfix">
                <a href="#" class="satellite-link">
                    <span>Satellite</span>
                </a>
                <a href="#" class="street-link">
                    <span>Street</span>
                </a>
                <a href="#" class="sea-link">
                    <span>Sea</span>
                </a>
                <a href="#" class="air-link">
                    <span>Air</span>
                </a>
                <a href="#" class="columbus-link">
                    <span>Columbus</span>
                </a>
                <a href="#" class="fuse-link">
                    <span>Fuse</span>
                </a>
            </div>
            <!-- Fuse Popup -->
            <div class="fuse-popup-menu sidebar-maps-block">
                <div class="title">Maps</div>
                <div class="select-map-block clearfix">
                    <a href="#" id="base_layer">Base</a>
                    <a href="#" id="top_layer">Top</a>
                </div>
                <div class="opacity-block">
                    <div class="title">Opacity</div>
                    <div class="slider-range-block">
                        <p><input type="text" class="amount" readonly value="50%"></p>
                        <div class="slider-range-min fuse_opacity" id="fuse_capacity"></div>
                        <div class="btn-plus fuse_opacity"></div>
                        <div class="btn-minus fuse_opacity"></div>
                    </div>
                </div>
            </div>
            <div class="export-block clearfix">
                <div class="export">Export Map <input type="file"></div>
                <div class="import">Import Map <input type="file"></div>
            </div>
        </div>
        <!-- #End Maps Popup -->

        <!-- Drawing Popup -->
        <div class="drawing-popup-block right-popup-block">
            <div class="scroll-pane">
                <div class="title-block">
                    DRAWING & ANNOTATION
                    <div class="btn-control clearfix">
                        <div class="btn-curtail"></div>
                        <div class="btn-expand"></div>
                        <div class="btn-close"></div>
                    </div>
                </div>
                <div class="drawing-options-menu">
                    <a href="#" class="new-link"></a>
                    <a href="#" class="open-link"></a>
                    <a href="#" class="edit-link"></a>
                    <a href="#" class="erase-link"></a>
                    <a href="#" class="save-link"></a>
                </div>

                <!-- Primary Tools Menu -->
                <div class="primary-tools-menu">
                    <div class="figures-block primary-list-block clearfix">
                        <div class="rectangle-link">
                            <a href="#">Rectangle</a>
                        </div>
                        <div class="polygon-link">
                            <a href="#">Polygon</a>
                        </div>
                        <div class="circle-link">
                            <a href="#">Circle</a>
                        </div>
                        <div class="line-link">
                            <a href="#">Line</a>
                        </div>
                        <div class="path-link">
                            <a href="#">Path</a>
                        </div>
                    </div>
                    <div class="3d-block primary-list-block clearfix">
                        <div class="height-link">
                            <a href="#">Height</a>
                        </div>
                        <div class="altitude-link">
                            <a href="#">Altitude</a>
                        </div>
                    </div>
                    <div class="tools-list-block primary-list-block clearfix">
                        <div class="kml-link import">
                            <input type="file" id="fileImport">
                        </div>
                        <div class="kml-link export">
                            <input type="file" id="fileExport">
                        </div>
                        <div class="text-link">
                            <a href="#">Text</a>
                        </div>
                        <div class="drop-poi-link">
                            <a href="#">Drop POI</a>
                        </div>
                        <div class="drop-multimedia-link">
                            <a href="#">Drop Multimedia</a>
                        </div>
                    </div>
                </div>
                <!-- #End Primary Tools Menu -->

                <!-- Tools Menu -->
                <div class="tools-menu">
                    <div class="clearfix">
                        <div class="tools-folding-title title-block">Text Properties</div>
                        <div class="tools-folding-content clearfix">
                            <div class="text-menu">
                                <p>Font</p>
                                <select class="selectmenu font_select">
                                    <option>Open Sans</option>
                                    <option selected="selected">Bander</option>
                                    <option>Tahoma</option>
                                </select>
                            </div>
                            <div class="font-menu">
                                <div class="clearfix">
                                    <div class="left-block">
                                        <p>Size</p>
                                        <select class="selectmenu font_size_select">
                                            <option>12</option>
                                            <option selected="selected">14</option>
                                            <option>16</option>
                                        </select>
                                    </div>
                                    <div class="right-block">
                                        <p>Color</p>
                                        <div class="colorpicker-block">
                                            <button type="button" class="btn-colorpicker colorpicker">
                                                <span class="color-fill-icon dropdown-color-fill-icon font-color" style="background-color:#000;"></span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="clearfix">
                        <div class="tools-folding-title title-block">Fills & Outlines</div>
                        <div class="tools-folding-content">
                            <div class="fill-menu">
                                <p class="title">Fill</p>
                                <div class="clearfix">
                                    <div class="left-block">
                                        <p>Color</p>
                                        <div class="colorpicker-block">
                                            <button type="button" class="btn-colorpicker colorpicker">
                                                <span class="color-fill-icon dropdown-color-fill-icon fill-color" style="background-color:#000;"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="right-block">
                                        <p>Line</p>
                                        <select class="selectmenu fill_line_select">
                                            <option selected="selected">1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div class="opacity-right-block">
                                        <p>Opacity</p>
                                        <div class="slider-range-block">
                                            <p><input type="text" class="amount" readonly value="50%"></p>
                                            <div class="slider-range-min fill_opacity"></div>
                                            <div class="btn-plus fill_opacity"></div>
                                            <div class="btn-minus fill_opacity"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="outline-menu">
                                <p class="title">Outline</p>
                                <div class="clearfix">
                                    <div class="left-block">
                                        <p>Color</p>
                                        <div class="colorpicker-block">
                                            <button type="button" class="btn-colorpicker colorpicker">
                                                <span class="color-fill-icon dropdown-color-fill-icon outline-color" style="background-color:#000;"></span>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="middle-block">
                                        <p>Pattern</p>
                                        <select class="selectmenu out_line">
                                            <option selected="selected">1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                    <div class="right-block">
                                        <p>Opacity</p>
                                        <div class="slider-range-block">
                                            <p><input type="text" class="amount" readonly value="50%"></p>
                                            <div class="slider-range-min outline_opacity"></div>
                                            <div class="btn-plus outline_opacity"></div>
                                            <div class="btn-minus outline_opacity"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="drawing-details-block">
                        <div class="tools-folding-title title">Details</div>
                        <div class="tools-folding-content">
                            <p>Add To</p>
                            <select class="selectmenu drawing_category">
                                <option selected="selected">New Category</option>
                                <option>Category</option>
                            </select>
                            <p class="label-title">Label</p>
                            <input type="text" placeholder="Enter your label">
                            <p>Description</p>
                            <textarea placeholder="Enter your text"></textarea>
                        </div>
                    </div>
                </div>
                <!-- #End Tools Menu -->
            </div>

            <div class="buttons-control buttons-block clearfix">
                <button class="btn-clear">Clear</button>
                <button class="btn-delete">Delete</button>
                <button class="btn-save">Save</button>
            </div>
        </div>
        <!-- #End Drawing Popup -->

        <!-- Drop POI Popup -->
        <div class="droppoi-popup-block popups-block clearfix">
            <!-- Left Block -->
            <div class="left-block">
                <div class="folders-wrapper-block">
                    <div class="folders-block">
                        <div class="folder-title">Tabs</div>
                        <div class="folder-content">
                            <div><span style="border-color: blue"></span>Blue</div>
                            <div><span style="border-color: green"></span>Green</div>
                            <div><span style="border-color: red"></span>Red</div>
                            <div><span style="border-color: white"></span>White</div>
                        </div>
                    </div>
                    <div class="folders-block">
                        <div class="folder-title">Miscellaneous</div>
                        <div class="folder-content">
                            <div><span style="border-color: blue"></span>Blue</div>
                        </div>
                    </div>
                    <div class="folders-block">
                        <div class="folder-title">Places</div>
                        <div class="folder-content">
                            <div><span style="border-color: yellow"></span>Yellow</div>
                            <div><span style="border-color: green"></span>Green</div>
                        </div>
                    </div>
                    <div class="folders-block">
                        <div class="folder-title">News</div>
                        <div class="folder-content">
                            <div><span style="border-color: white"></span>White</div>
                        </div>
                    </div>
                    <div class="folders-block">
                        <div class="folder-title">Vehicles</div>
                        <div class="folder-content">
                            <div><span style="border-color: purple"></span>Purple</div>
                            <div><span style="border-color: yellow"></span>Yellow</div>
                            <div><span style="border-color: black"></span>Black</div>
                            <div><span style="border-color: green"></span>Green</div>
                            <div><span style="border-color: red"></span>Red</div>
                        </div>
                    </div>
                    <div class="folders-block">
                        <div class="folder-title">Numeric Tabs</div>
                        <div class="folder-content">
                            <div><span style="border-color: black"></span>Black</div>
                        </div>
                    </div>
                </div>
                <div class="pin-size-block">
                    <div class="pin">1</div>

                    <div class="slider-range-block">
                        <p><input type="text" class="amount" readonly value="50%"></p>
                        <div class="slider-range-min"></div>
                        <div class="btn-plus pin_size"></div>
                        <div class="btn-minus pin_size" ></div>
                    </div>
                </div>
            </div>
            <!-- #End Left Block -->

            <!-- Right Block -->
            <div class="right-block">
                <div class="title-block">Drop POI</div>
                <div class="buttons-block">
                    <a href="#" class="btn-curtail"></a>
                    <a href="#" class="btn-expand"></a>
                    <a href="#" class="btn-close"></a>
                </div>

                <div class="pin-block-wrapper">
                    <div class="pin">1</div>
                    <div class="pin">2</div>
                    <div class="pin">3</div>
                    <div class="pin">4</div>
                    <div class="pin">5</div>
                    <div class="pin">6</div>
                    <div class="pin">7</div>
                    <div class="pin">8</div>
                    <div class="pin">9</div>
                    <div class="pin">10</div>
                    <div class="pin">11</div>
                    <div class="pin">11</div>
                    <div class="pin">12</div>
                    <div class="pin">13</div>
                    <div class="pin">14</div>
                    <div class="pin">15</div>
                    <div class="pin">16</div>
                    <div class="pin">17</div>
                    <div class="pin">18</div>
                    <div class="pin">19</div>
                    <div class="pin">20</div>
                </div>
            </div>
            <!-- #End Right Block -->
            <div class="angle-top-left-icon"></div>
            <div class="angle-bottom-right-icon"></div>
            <div class="angle-top-right-icon"></div>
            <div class="angle-bottom-left-icon"></div>
        </div>
        <!-- #End Drop POI Popup -->

        <!-- Drop POI Popup Pin -->
        <div class="droppoi-pin-popup popups-block min-popup-block">
            <div class="title-block">Drop POI</div>
            <p>Title</p>
            <input type="text" class="drop_pin_name" placeholder="Enter the name">
            <p>Description</p>
            <textarea class="drop_pin_description" placeholder="Enter text here"></textarea>
            <div class="clearfix">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-save">Save</button>
            </div>

            <a href="#" class="btn-close"></a>
            <div class="angle-top-left-icon"></div>
            <div class="angle-bottom-right-icon"></div>
            <div class="angle-top-right-icon"></div>
            <div class="angle-bottom-left-icon"></div>
        </div>
        <!-- #End Drop POI Popup Pin -->

        <!-- Drop Multimedia Popup -->
        <div class="drop-multimedia-popup popups-block min-popup-block">
            <div class="title-block">Drop Multimedia</div>
            <div class="add-file-block">
                Drag & drop files here or <a href="#">browse</a>
                <input id="multimedia_file" type="file">
            </div>
            <p>Title</p>
            <input type="text" class="drop_pin_multimedia_name" placeholder="Enter the name">
            <p>Description</p>
            <textarea class="drop_pin_multimedia_description" placeholder="Enter text here"></textarea>
            <div class="clearfix">
                <button class="btn-cancel">Cancel</button>
                <button class="btn-save">Save</button>
            </div>

            <a href="#" class="btn-close"></a>
            <div class="angle-top-left-icon"></div>
            <div class="angle-bottom-right-icon"></div>
            <div class="angle-top-right-icon"></div>
            <div class="angle-bottom-left-icon"></div>
        </div>
        <!-- #End Drop Multimedia Popup -->

        <!-- Search Popup -->
        <div class="search-popup-block right-popup-block">
            <div class="scroll-pane">
                <div class="title-block">
                    Search
                    <div class="btn-control clearfix">
                        <div class="btn-curtail"></div>
                        <div class="btn-expand"></div>
                        <div class="btn-close"></div>
                    </div>
                </div>
                <div class="search-menu-block">
                    <div class="geospatial-popup-block submenu-block clearfix">
                        <div class="rectangle-link">
                            <a href="#">Rectangle</a>
                        </div>
                        <div class="circle-link">
                            <a href="#">Circle</a>
                        </div>
                        <div class="polygon-link">
                            <a href="#">Polygon</a>
                        </div>
                        <div class="line-link">
                            <a href="#">line</a>
                        </div>
                    </div>

                    <div class="temporal-popup-block submenu-block">
                        <div class="clearfix">
                            <label for="from">Start date</label>
                            <label for="from">Start time</label>
                        </div>
                        <div class="clearfix">
                            <input type="text" class="datepicker" id="from" name="from" placeholder="Date">
                            <input type="text" placeholder="Time" class="input-time timepicker" name='timepicker'>
                        </div>
                        <div class="clearfix">
                            <label for="from">End date</label>
                            <label for="from">End time</label>
                        </div>
                        <div class="clearfix">
                            <input type="text" class="datepicker" id="to" name="to" placeholder="Date">
                            <input type="text" placeholder="Time" class="input-time timepicker" name='timepicker'>
                        </div>
                    </div>

                    <div class="fly-to-popup-block submenu-block">
                        <p class="title">Keyword/Phrase</p>
                        <textarea placeholder="Enter the text"></textarea>
                        <div class="clearfix">
                            <button class="btn-reset">Clear</button>
                            <button class="btn-search">Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="fly-to-link">
                <p>Fly To...</p>
                <div class="search">
                    <input id="search_address" type="text" placeholder="Search">
                    <button></button>
                </div>
            </div>
        </div>
        <!-- #End Search Popup -->

        <!-- Template Panel -->
        <div class="template-panel-block" style="left: 40%">
            <div class="panel-title">
                <h3>PANEL TEMPLATE</h3>
                <div class="btn-control clearfix">
                    <div class="btn-curtail"></div>
                    <div class="btn-expand"></div>
                    <div class="btn-close"></div>
                </div>
            </div>
            <div class="template-content-block">
                <!-- Template Folding Block -->
                <div class="folding-block">
                    <div class="folding-title">UAV’S</div>
                    <div class="folding-content">
                        <a href="#"><span style="background: red"></span>Predator Titanium</a>
                        <a href="#"><span style="background: orange"></span>Global Hawk</a>
                    </div>
                </div>
                <div class="folding-block">
                    <div class="folding-title">Fixed Wing Aircraft</div>
                    <div class="folding-content">
                        <a href="#"><span style="background: green"></span>Liberty MC-10</a>
                        <a href="#"><span style="background: yellow"></span>River Joint 12</a>
                    </div>
                </div>
                <div class="folding-block">
                    <div class="folding-title">Maritime Vessels</div>
                    <div class="folding-content">
                        <a href="#"><span style="background: blue"></span>Fast Boat 3</a>
                        <a href="#"><span style="background: purple"></span>SeaWing 23</a>
                    </div>
                </div>
                <div class="folding-block">
                    <div class="folding-title">Ground Forces</div>
                    <div class="folding-content">
                        <a href="#"><span style="background: #0000b2"></span>Seal Team 6</a>
                        <a href="#"><span style="background: white"></span>Bravo Team 2</a>
                    </div>
                </div>
                <!-- Template Folding Block -->
            </div>
        </div>
    `);
    parentElement.append(component);
}