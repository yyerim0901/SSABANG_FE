<template>
  <v-app>
    <v-container style="margin:0px; padding:0px;">
      <v-layout>
        <v-flex>
          <v-sheet style="padding:0px;">
                <v-alert
                  v-model="alert"
                  color="cyan"
                  border="left"
                  elevation="2"
                  colored-border
                  type="success"
                  v-if="getHousedealState == 2 && markerdatas"
                >
                <strong>
                  {{ datasize }} 개의 매물이 있습니다!
                </strong>
                </v-alert>
                <v-alert
                border="left"
                colored-border
                type="error"
                elevation="2"
                v-if="!markerdatas"
              >
              <strong>
                발견 한 매물이 없습니다. 다시 검색 해 주세요.
              </strong>
              </v-alert>

              <v-col v-if="getHousedealState == 2 && markerdatas" cols="12">
                <v-chip
                  class="ma-2"
                  color="blue"
                  text-color="white"
                  @click="listOn = true"
                >
                  집
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="amber accent-2"
                  text-color="white"
                  @click="getParkInfo"
                >
                  공원
                </v-chip>
                <v-chip
                  class="ma-2"
                  color="red lighten-1"
                  text-color="white"
                  @click="getHospital"
                >
                  병원
                </v-chip>
              </v-col>

                <div id="map_wrap">
                <v-flex class="d-inline-flex" border="1px" id="map" style="width: 100%; height: 600px"></v-flex>
                <v-flex v-show="listOn" v-if="getHousedealState == 2 && markerdatas" id="menu_wrap">
                    <ul id="placesList"/>
                    <div id="pagination"></div>
                </v-flex>
                </div>
          </v-sheet>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      map : '',
      alert:'',
      markerdatas: [],
      datasize: "",
      listOn:true,
    };
  },
  created() {
    // this.$store.dispatch("getParkList")
    // this.$store.dispatch("getHospitalList")
  },
  mounted() {
    this.markerdatas = this.getHousedealList;
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);

      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=2008bf66e08970787dd3cb4ad3a596ff&libraries=services,clusterer,drawing";
      document.head.appendChild(script);
    }
  },
  computed: {
    ...mapGetters(["getHousedealList", "getHousedealState", "parkList", "hospitalList"]),
  },
  methods: {
    initMap() {
      this.listOn = true;
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 7,
      };

      var map = new kakao.maps.Map(container, options);
      map.setMinLevel(2);
      this.map = map;
      //데이터가 없으면 바로 메소드 종료
      if (this.markerdatas.length == 0) {
        return;
      }

      var listEl = document.getElementById("placesList"),
        fragment = document.createDocumentFragment();


      var markers = [],
        itemEls = [],
        paginationEls = [];

      var idx = -1;
      // this.markerdatas.forEach((data) => {
      this.getHousedealList.forEach((data) => {
        if (data.lat != 0 && data.lng != 0 && data.apt_load_NM) {
          idx = idx + 1;

          var marker = this.makeMarker(data);

          var infowindow = this.makeInfo(data);
          var infowindow2 = this.makeDetailInfo(data);

          //마커 이벤트 등록
          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.open(map, marker);
          });

          kakao.maps.event.addListener(marker, "click", function () {
            map.panTo(marker.getPosition());
          });

          kakao.maps.event.addListener(marker, "rightclick", function () {
            infowindow.close();
            infowindow2.open(map, marker);
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });

          markers.push(marker);

          var itemEl = getListItem(marker, data, idx);

          //리스트 이벤트 등록
          itemEl.onclick = function () {
            infowindow.open(map, marker);
            map.setLevel(3);
            map.panTo(marker.getPosition());
          };

          itemEl.onmouseout = function () {
            infowindow.close();
          };
          itemEls.push(itemEl);

          if (idx < 15) {
            fragment.appendChild(itemEl);
          }
        }
      });
      listEl.appendChild(fragment);
      this.datasize = markers.length;
      displayPagination();

      var clusterer = new kakao.maps.MarkerClusterer({
        map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
        girdSize: 35,
        averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
        minLevel: 2, // 클러스터 할 최소 지도 레벨
      });

      map.setLevel(8);

      clusterer.addMarkers(markers);

      // 마커 클러스터러에 클릭이벤트를 등록합니다
      kakao.maps.event.addListener(clusterer, "clusterclick", (cluster) => {
        var level = map.getLevel() - 1;
        //지도를 클릭된 클러스터의 마커의 위치를 기준으로 확대합니다
        map.setLevel(level, { anchor: cluster.getCenter() });
      });
      var bounds = new kakao.maps.LatLngBounds();

      markers.forEach((data) => {
        bounds.extend(data.getPosition());
      });
      map.setBounds(bounds);

      function getListItem(place, data, idx) {
        var el = document.createElement("li");
        var itemStr =
          '<span style="display:inline-block;" class="markerbg marker_' +
          ((idx % 15) + 1) +
          '"></span>' +
          '<div class="infoto"><span class="apt_name">' +
          place.getTitle() +
          "</span>";
        if (data.call_number.length == 8) {
          itemStr +=
            '  <span class="tel">010-' +
            data.call_number.slice(0, 4) +
            "-" +
            data.call_number.slice(4, 9) +
            "</span>";
        } else {
          itemStr +=
            '  <span class="tel">070-' +
            data.call_number.slice(0, 4) +
            "-" +
            data.call_number.slice(4, 9) +
            "</span>";
        }
        itemStr += '  <span class="load">' + data.apt_load_NM + "</span>";

        itemStr += "</div>";
        el.innerHTML = itemStr;
        el.className = "item";
        return el;
      }

      var totalpage =
        parseInt(markers.length / 15) + (markers.length % 15 > 0 ? 1 : 0);
      var currpage = 0;
      function displayPagination() {
        var paginationEl = document.getElementById("pagination");

        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }
        for (
          let p = 1;
          p <=
          parseInt(markers.length / 15) + (markers.length % 15 > 0 ? 1 : 0);
          p++
        ) {
          var el = document.createElement("a");
          el.href = "#";
          el.innerHTML = p;

          paginationEls.push(el);
        }
      }

      function setPagination() {
        var fragment = document.createDocumentFragment();
        var before = paginationEls[currpage - 1];
        var after = paginationEls[currpage + 1];

        if (0 < currpage) {
          var beforepage = before.innerHTML;
          before.onclick = () => {
            currpage -= 1;
            setCurrentpage(beforepage);
            setPagination();
          };
          fragment.appendChild(before);
        }
        if (currpage < totalpage - 1) {
          var afterpage = after.innerHTML;
          after.onclick = () => {
            currpage += 1;
            setCurrentpage(afterpage);
            setPagination();
          };
          fragment.appendChild(after);
        }

        var paginationEl = document.getElementById("pagination");
        while (paginationEl.hasChildNodes()) {
          paginationEl.removeChild(paginationEl.lastChild);
        }
        paginationEl.appendChild(fragment);
      }
      setPagination();

      function setCurrentpage(page) {
        while (listEl.hasChildNodes()) {
          listEl.removeChild(listEl.lastChild);
        }
        var fragment = document.createDocumentFragment();
        for (let l = (page - 1) * 15; l < page * 15; l++) {
          if (l >= itemEls.length) break;
          fragment.appendChild(itemEls[l]);
        }
        listEl.appendChild(fragment);
      }
    },
    makeMarker(data){ //데이터를 전달받아 마커를 만든다
      var imageSrc =
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoo0g1wW8kjYDG8wkl7fPg64LXcdvR_g0pbA&usqp=CAU", // 마커이미지의 주소입니다
          imageSize = new kakao.maps.Size(29, 34), // 마커이미지의 크기입니다
          imageOption = { offset: new kakao.maps.Point(15, 69) }; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(
        imageSrc,
        imageSize,
        imageOption
      );

      return new kakao.maps.Marker({
        title: data.apt_NM,
        position: new kakao.maps.LatLng(data.lat, data.lng),
        data: data,
        image: markerImage,
      });
    },
    makeInfo(data){
      var iwContent =
            '<div id="detail_info" style="padding:5px; text-align:center;">';
          iwContent += '<span class="apt_name">' + data.apt_NM + "</span><br>"; // 아파트 이름
          iwContent += '<span class="load">' + data.apt_load_NM + "</span><br>"; // 아파트 풀 주소

          //전화번호
          if (data.call_number.length == 8) {
            iwContent +=
              '  <span class="tel">010-' +
              data.call_number.slice(0, 4) +
              "-" +
              data.call_number.slice(4, 9) +
              "</span>";
          } else {
            iwContent +=
              '  <span class="tel">070-' +
              data.call_number.slice(0, 4) +
              "-" +
              data.call_number.slice(4, 9) +
              "</span>";
          }

          iwContent += "<br><span class='want_detail'>더 많은 정보를 보시려면 우클릭하세요</span></div>";

          return new kakao.maps.InfoWindow({
            content: iwContent,
          });
    },
    makeDetailInfo(data){
      var iwContent2 = '<div id="detail_info" style="padding:5px; text-align:center; width:350px;">';

      var rand = Math.floor(Math.random() * 4);
      if(rand==0){
        iwContent2 += '<img width="300" height="200" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjycF-c8xN4m5Yi6LjQfMTvkhEbj6qB0Eu9Q&usqp=CAU">';
      }else if(rand==1){
        iwContent2 += '<img width="300" height="200" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-j7glN4-G_cNDVkUp06QLCIwwAKojh6nOYw&usqp=CAU">';
      }else if(rand==2){
        iwContent2 += '<img width="300" height="200" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQE-QLEBzQwOq4jffKluRNiGjIjrJODmCKwCg&usqp=CAU">';
      }else{
        iwContent2 += '<img width="300" height="200" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSblTmx_YB-OGKEcJ9A2UYTPLlJvxLZ45eD7g&usqp=CAU">';
      }
          
      rand = Math.floor(Math.random() * 100 + 50);
      iwContent2 += '<br><span class="apt_name">' + data.apt_NM + "</span> | <span class='apt_amt'>" + rand/10 + "억</span><br>"; // 아파트 이름
      iwContent2 += '<span class="load">' + data.apt_load_NM + "</span><br>"; // 아파트 풀 주소

      //전화번호
      if (data.call_number.length == 8) {
        iwContent2 +=
          '  <span class="tel">010-' +
          data.call_number.slice(0, 4) +
          "-" +
          data.call_number.slice(4, 9) +
          "</span>";
      } else {
        iwContent2 +=
          '  <span class="tel">070-' +
          data.call_number.slice(0, 4) +
          "-" +
          data.call_number.slice(4, 9) +
          "</span>";
      }

      //주차자리
      if (data.parking_size) {
        iwContent2 +=
          '<span class="parking_size"> | 주차 자리 : ' +
          data.parking_size +
          "</span>";
      }
      if (data.build_company) {
        iwContent2 +=
          '<br><span class="parking_size"> 건설사 : ' +
          data.build_company +
          "</span>";
      }

      return new kakao.maps.InfoWindow({
        content: iwContent2,
        removable : true
      });
    },
    getHospital(){
      this.listOn = false;
      this.$store.dispatch("getHospitalList").then(()=>{
        this.hLocation();
      })
    },
    hLocation(){
            this.hospitalList.forEach((data) => {

                if(data.hx != 0 && data.hy != 0){
                    var hlat
                    var hlng
    
                    var geocoder = new kakao.maps.services.Geocoder(),
                        tmX = data.hx,
                        tmY = data.hy;
    
                    var callback = ((result, status) => {
                      if (status === kakao.maps.services.Status.OK) {
                          hlat = result[0].y;
                          hlng = result[0].x;
    
                          this.makeHospitalMarker(new kakao.maps.LatLng(hlat, hlng), data.hname);
                      }
                    });
    
                    geocoder.transCoord(tmX, tmY, callback, {
                      input_coord: kakao.maps.services.Coords.TM,
                      output_coord: kakao.maps.services.Coords.WGS84
                    });
                }
            });
    },
    makeHospitalMarker(position, title){
      var imageSrc = "https://pics.freeicons.io/uploads/icons/png/12147700431606252958-512.png"; 

      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 24); 
      
      // 마커 이미지를 생성합니다    
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 

      // 마커를 생성합니다
      new kakao.maps.Marker({
          map : this.map,
          position: position, // 마커를 표시할 위치
          title : title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
          image : markerImage // 마커 이미지 
      });
    },
    getParkInfo(){
        this.listOn = false;
        this.$store.dispatch("getParkList").then(()=>{
            this.parkLocation()
            })   
    },
    parkLocation(){
            var map = this.map;

            // 마커를 표시할 위치와 title 객체 배열입니다 
            var positions = this.parkList;

            // 마커 이미지의 이미지 주소입니다
            var imageSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi86pKpPAhlPA2EMqwfEeazNCGHclGBVDwOw&usqp=CAU"; 
                
            for (var i = 0; i < positions.length; i ++) {
                
                // 마커 이미지의 이미지 크기 입니다
                var imageSize = new kakao.maps.Size(34, 35); 
                
                //데이터 뒤에 붙는 애들 제거
                var cutlng = positions[i].lng.substring(0,positions[i].lng.length-1);
                // 마커 이미지를 생성합니다    
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
                
                // 마커를 생성합니다
                new kakao.maps.Marker({
                    map : map,
                    position: new kakao.maps.LatLng(cutlng, positions[i].lat), // 마커를 표시할 위치
                    title : positions[i].parkname, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
                    image : markerImage // 마커 이미지 
                });
            }
        }
  },
};
</script>

<style>
#detail_info {
  width: 200px;
}
#detail_info .apt_name {
  font-size: 15px;
  font-weight: bold;
}
#detail_info .tel {
  color: #009900;
  font-size: 8px;
}
#detail_info .load {
  color: grey;
  font-size: 12px;
}
#detail_info .parking_size {
  font-size: 10px;
}
#detail_info .want_detail{
  font-size: 12px;
  color:orange;
  font-weight:bold;
}
#detail_info .apt_amt{
  font-weight : bold;
  color:sandybrown;
}

.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 600px;
}
.info {
  background-color: white;
  border-color: white;
}

#menu_wrap {
  position: absolute;
  top: 155px;
  left: 0px;
  bottom: 0;
  width: 300px;
  height: 580px;
  margin: 0px 0px 0px 10px;
  padding: 7px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.9);
  z-index: 1;
  font-size: 15px;
  border-radius: 10px;
}
#menu_wrap ul {
  list-style:none;
  padding: 0px;
}
#placesList li {
  list-style: none;
  padding: 0px;
}
#placesList .item {
  position: relative;
  border-bottom: 1px solid #888;
  overflow: hidden;
  cursor: pointer;
  min-height: 65px;
}
#placesList .item span {
  display: block;
  margin-top: 4px;
}
#placesList .item h5,
#placesList .item .infoto {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

#pagination {
  margin: 10px auto;
  text-align: center;
}
#pagination a {
  display: inline-block;
  margin-right: 10px;
}
#pagination .on {
  font-weight: bold;
  cursor: default;
  color: #777;
}

#placesList .infoto .apt_name {
  font-size: 15px;
  font-weight: bold;
}
#placesList .infoto .tel {
  color: #009900;
  font-size: 8px;
}
#placesList .infoto .load {
  color: grey;
  font-size: 12px;
}

#placesList .item .markerbg {
  float:left;
  width: 36px;
  height: 37px;
  margin: 10px 0 0 10px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png)
    no-repeat;
}
#placesList .item .marker_1 {
  background-position: 0 -10px;
}
#placesList .item .marker_2 {
  background-position: 0 -56px;
}
#placesList .item .marker_3 {
  background-position: 0 -102px;
}
#placesList .item .marker_4 {
  background-position: 0 -148px;
}
#placesList .item .marker_5 {
  background-position: 0 -194px;
}
#placesList .item .marker_6 {
  background-position: 0 -240px;
}
#placesList .item .marker_7 {
  background-position: 0 -286px;
}
#placesList .item .marker_8 {
  background-position: 0 -332px;
}
#placesList .item .marker_9 {
  background-position: 0 -378px;
}
#placesList .item .marker_10 {
  background-position: 0 -423px;
}
#placesList .item .marker_11 {
  background-position: 0 -470px;
}
#placesList .item .marker_12 {
  background-position: 0 -516px;
}
#placesList .item .marker_13 {
  background-position: 0 -562px;
}
#placesList .item .marker_14 {
  background-position: 0 -608px;
}
#placesList .item .marker_15 {
  background-position: 0 -654px;
}
</style>
