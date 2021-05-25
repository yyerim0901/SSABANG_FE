<template>
    <v-container>
        <v-layout>
            <v-flex>
                <v-sheet id="map" style="width:500px;height:400px;"></v-sheet>
                <v-btn @click="loadData">주변 공원</v-btn>
                <v-btn @click="currentLocation">내 위치 확인하기</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=2008bf66e08970787dd3cb4ad3a596ff"></script>
<script>
import {mapGetters} from "vuex";

export default {
    data() {
        return {
            lat:'',
            long:'',
            parklist:'',
        }
    },
    created() {
        this.$store.dispatch("getParkList")
    },
    computed: {
        ...mapGetters(["getParkList"]),
        parklist(){
            console.log('data change');
        }
    },
    methods:{
        currentLocation(){
            navigator.geolocation.getCurrentPosition(function(pos){
                var lat = pos.coords.latitude;
                var long = pos.coords.longitude;
                alert("현재 위치는 : "+lat+", "+long)
                this.lat = lat;
                this.long = long;
                console.log(this.lat+",  "+this.long)
            })
        },
        initMap(){
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
                mapOption = { 
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 5 // 지도의 확대 레벨 
                }; 

            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다

            // HTML5의 geolocation으로 사용할 수 있는지 확인합니다 
            if (navigator.geolocation) {
                
                // GeoLocation을 이용해서 접속 위치를 얻어옵니다
                navigator.geolocation.getCurrentPosition(function(position) {
                    
                    var lat = position.coords.latitude, // 위도
                        lon = position.coords.longitude; // 경도
                    
                    //우선은 현재위치말고 서울 위치로 잡아서 하기!!!!!!!!!!!!!!!!!!!!!!!!!!
                    var locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
                        message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용입니다
                    
                    // 마커와 인포윈도우를 표시합니다
                    displayMarker(locPosition,message);
                        
                });
                
            } else { // HTML5의 GeoLocation을 사용할 수 없을때 마커 표시 위치와 인포윈도우 내용을 설정합니다
                
                var locPosition = new kakao.maps.LatLng(33.450701, 126.570667),    
                    message = 'geolocation을 사용할수 없어요..'
                    
                displayMarker(locPosition, message);
            }

            // 지도에 마커와 인포윈도우를 표시하는 함수입니다
            function displayMarker(locPosition, message) {

                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({  
                    map: map, 
                    position: locPosition
                }); 
                
                var iwContent = message, // 인포윈도우에 표시할 내용
                    iwRemoveable = true;

                // 인포윈도우를 생성합니다
                var infowindow = new kakao.maps.InfoWindow({
                    content : iwContent,
                    removable : iwRemoveable
                });
                
                // 인포윈도우를 마커위에 표시합니다 
                infowindow.open(map, marker);
                
                // 지도 중심좌표를 접속위치로 변경합니다
                map.setCenter(locPosition);      
            }    
        },
        loadData(){
            this.$store.dispatch("getParkList");
            this.parklist = this.parkList
            console.log(this.$store.state.parkList)
            console.log("store에 parkList : "+this.parkList)
            console.log("여기 parklist : "+this.parklist)
            // this.parkLocation()
        },
        parkLocation(){
            var mapContainer = document.getElementById('map'), // 지도를 표시할 div  
                mapOption = { 
                    center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                    level: 3 // 지도의 확대 레벨
                };

            var map = new kakao.maps.Map(mapContainer, mapOption); // 지도를 생성합니다
            
            // 마커를 표시할 위치와 title 객체 배열입니다 
            var positions = this.parklist;
            console.log(positions)

            // 마커 이미지의 이미지 주소입니다
            var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
                
            for (var i = 0; i < positions.length; i ++) {
                
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(24, 35); 
                
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                
                // 마커를 생성합니다
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(positions.lat, positions.lng), // 마커를 표시할 위치
                    title : data.parkname, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : markerImage // 마커 이미지 
                });
            }
        }
    },
    created() {
        if(window.kakao && window.kakao.maps){
            this.initMap();
        }else {
            const script = document.createElement("script");
      /* global kakao */
            script.onload = () => kakao.maps.load(this.initMap);

            script.src =
                "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=2008bf66e08970787dd3cb4ad3a596ff&libraries=services,clusterer,drawing";
            document.head.appendChild(script);
        }
    },
    mounted() {
        
    },
}
</script>

<style>

</style>