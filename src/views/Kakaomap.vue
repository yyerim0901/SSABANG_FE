<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex>
          <v-sheet style="padding:30px;">
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
              <template>
                <v-container id="map_wrap">
                  <v-layout border="3px">
                    <v-flex class="d-inline-flex" border="1px" id="map" style="width: 100%; height: 600px">얜뭐고</v-flex>
                  </v-layout>
                <v-flex v-if="getHousedealState == 2 && markerdatas" id="menu_wrap">
                    <ul id="placesList"/>
                    <div id="pagination"></div>
                </v-flex>
                </v-container>
              </template>
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
      markerdatas: [],
      isFound: false,
      datasize: "",
    };
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
    ...mapGetters(["getHousedealList", "getHousedealState"]),
  },
  methods: {
    initMap() {
      var container = document.getElementById("map");
      var options = {
        center: new kakao.maps.LatLng(37.5642135, 127.0016985),
        level: 7,
      };

      var map = new kakao.maps.Map(container, options);
      map.setMinLevel(2);

      var listEl = document.getElementById("placesList"),
        // menuEl = document.getElementById('menu_wrap'),
        fragment = document.createDocumentFragment();

      //데이터가 없으면 바로 메소드 종료
      if (this.markerdatas.length == 0) {
        return;
      }

      var markers = [],
        itemEls = [],
        paginationEls = [];

      var idx = -1;
      this.markerdatas.forEach((data) => {
        if (data.lat != 0 && data.lng != 0 && data.apt_load_NM) {
          idx = idx + 1;
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

          var marker = new kakao.maps.Marker({
            title: data.apt_NM,
            position: new kakao.maps.LatLng(data.lat, data.lng),
            data: data,
            image: markerImage,
          });
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

          //주차자리
          if (data.parking_size) {
            iwContent +=
              '<span class="parking_size"> | 주차 자리 : ' +
              data.parking_size +
              "</span>";
          }
          if (data.build_company) {
            iwContent +=
              '<br><span class="parking_size"> 건설사 : ' +
              data.build_company +
              "</span>";
          }
          iwContent += "</div>";

          var infowindow = new kakao.maps.InfoWindow({
            content: iwContent,
          });

          kakao.maps.event.addListener(marker, "mouseover", function () {
            infowindow.open(map, marker);
          });

          kakao.maps.event.addListener(marker, "click", function () {
            map.panTo(marker.getPosition());
          });
          kakao.maps.event.addListener(marker, "doubleclick", function () {
            //dialog띄우기
          });

          kakao.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close();
          });
          markers.push(marker);

          var itemEl = getListItem(marker, data, idx);

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
        girdSize: 50,
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

          // el.addEventListener('click', function(){
          //     console.log("addevent");
          //     while(listEl.hasChildNodes()){
          //         listEl.removeChild(listEl.lastChild);
          //     }
          //     fragment = document.createDocumentFragment();
          //     for(let l=((p-1)*15); l< p*15; l++){
          //         if(l >= itemEls.length) break;
          //         fragment.appendChild(itemEls[l]);
          //     }
          //     listEl.appendChild(fragment);
          //     setPagination();
          // })
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
  top: 135px;
  left: 25px;
  bottom: 0;
  width: 300px;
  height: 580px;
  margin: 0px 0px 0px 30px;
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
