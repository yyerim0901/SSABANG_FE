## 공공데이터 기반의 부동산 관련 정보 제공 사이트

![logo](./asset/logo.png)

[BackEnd Code 바로가기](https://github.com/yyerim0901/SSABANG_BE)



## 목차

1. [개요](#개요)
2. [요구사항 분석](#요구사항-분석)
3. [DB 설계](#DB-설계)
4. [기술스택](#기술스택)
5. [주요 기능](#주요-기능)
6. [참고](#참고)
7. [기능에 따른 상세 코드](#BoardController)



## 개요

> ### Member
>
> | Name | Role |
> | ------ | ------------- |
> | 김예림 | FrontEnd, BackEnd |
> | 박민상 | FrontEnd, BackEnd |
>
> 
>
> ### 기획 의도 및 기대 효과
>
> - 사람들이 쉽고 직관적으로 아파트 매매 정보를 조회할 수 있고, 기존에 쓰던 매매 정보 사이트에서 느꼈던 불편한 점을 개선한 사이트를 만들고자 하였습니다.
>
> 
>
> ### 개발 기간
>
> > 2021.05.20 - 2021.05.27



## 요구사항 분석

> 1. 로그인, 로그아웃
> 2. 회원 관리
>    - 회원가입
>    - 회원정보수정
>    - 회원탈퇴
> 3. 게시판 (CRUD)
>    - 게시글 읽기(목록, 상세페이지)
>    - 게시글 작성
>    - 게시글 수정
>    - 게시글 삭제
> 4. Map
>    - 기본 매물 조회
>    - 공원 정보 조회
>    - 병원 정보 조회
>    - 현재 위치
> 5. 용어집
> 6. 뉴스
>
> 



## DB 설계

![ERD](./asset/ERD.PNG)



## 기술스택

![기술스택](./asset/기술스택.png)

[목차로 돌아가기](#목차)



## 주요 기능

| 기능               | View                                                         | Description                                                  |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 메인 페이지        | ![메인_뉴스](./asset/메인페이지.PNG)                         | - 메인 페이지<br>- 매매 정보를 찾기 위한 주소 키워드 검색창을 메인페이지에 제공<br>- 로고 클릭시 메인페이지로 이동 |
| 회원가입           | ![회원가입](./asset/회원가입.png) <br>![유효성검사](./asset/회원가입_유효성검사.PNG) <br>![주소검색](./asset/회원가입_주소검색.PNG) | - 아이디, 비밀번호, 이메일 유효성 검사<br>- 회원 가입 시 주소 검색 API를 통해 주소 정보 저장 |
| 로그인<br>로그아웃 | ![로그인](./asset/로그인.png)<br>![로그아웃](./asset/로그아웃.png) | - 상단바를 이용하여 로그인, 로그아웃 자유롭게 가능           |
| 마이페이지         | ![마이페이지](./asset/마이페이지.PNG)                        | - 마이페이지를 통해 기본 정보 확인<br>- 비밀번호는 비공개    |
| 회원정보수정       | ![유효성검사](./asset/회원정보수정전검사.PNG)![회원정보수정](./asset/회원정보수정.png) | - 수정하기 전 비밀번호 재검사<br> - Form 에 이전 정보 유지   |
| 회원탈퇴           | ![회원탈퇴](./asset/회원탈퇴.png)                            | - 탈퇴 하기 전 팝업창                                        |
| 게시글 목록        | ![게시글목록](./asset/게시판읽기.png)                        | - 조회수 정보 제공 <br>- 페이지네이션<br>- 글 작성 시간 정보 제공<br>- 시간 내림차순 정렬 |
| 게시글 상세페이지  | ![게시글 상세 페이지](./asset/게시판상세페이지.png)          | - 상세페이지를 통해 수정 삭제 가능 <br>- 목록으로 이동 가능  |
| 게시글 수정        | ![게시글 수정](./asset/게시글수정.png)                       | - 게시글 수정 전 이전 게시글 정보 그대로 옮겨짐<br>- 작성자는 변경 불가 (고정) |
| 게시글 삭제        | ![게시글 삭제](./asset/게시글삭제.png)                       |                                                              |
| 매물 검색          | ![매물 검색](./asset/매물검색(맵클러스터링).png)             | - 지도의 범위에 따라 정보를 클러스터링 하여 제공<br>- Map 내부 리스트 정보 제공 및 페이지네이션<br>- 지도 상에 위치하는 매물 수 표기 |
| 공원 정보          | ![공원 정보](./asset/공원정보제공.png)                       | - 공원 버튼 클릭 시 공원의 위치에 따라 아이콘 생성<br>- mouseover시 병원의 간단한 정보 제공 |
| 병원 정보          | ![병원 정보](./asset/병원정보제공.png)                       | - 병원 버튼 클릭 시 병원의 위치에 따라 아이콘 생성<br>- mouseover시 간단한 병원 정보 확인 가능 |
| 현재 위치          | ![현재 위치](./asset/현재위치.jpg)                           | - 내 위치 확인하기 클릭 시 현재 위치로 map 이동 및 pin 이동<br>- 현재 위치를 중심으로 주변 매매 정보 제공 |
| 주택 용어 사전     | ![용어 사전](./asset/주택용어사전목록.png)                   | - 공공데이터를 기반으로 주택 용어, 의미, 예시 제공           |
| 주택 용어 검색     | ![용어 검색](./asset/주택용어사전검색.png)                   | - 검색 키워드를 통해 관련 용어 검색 가능                     |
| 뉴스 제공          | ![뉴스](./asset/메인_뉴스.png)                               | - 뉴스 클러스터링을 통해 검색창 하단에서 Top10 뉴스 확인 가능<br>- 클릭 시 기사 원문으로 바로 이동 가능 |

[목차로 이동하기](#목차)





## 참고

[서울시 열린데이터 광장](https://data.seoul.go.kr/)

[공공데이터포털](https://www.data.go.kr/)







# BoardController

## LIST

```java
@GetMapping
public ResponseEntity<List<BoardDto>> list(){
	return new ResponseEntity<>(bservice.list(),HttpStatus.OK);
}
```

***

## READ DETAIL

```java
@GetMapping("{bnum}")
public ResponseEntity<BoardDto> read(@PathVariable int bnum) {
	BoardDto dto = bservice.read(bnum);
	return new ResponseEntity<BoardDto>(dto, HttpStatus.OK);
}
```

***

## WRITE

```java
@PostMapping
public ResponseEntity<String> write(@RequestBody BoardDto board, @PathVariable("upfile") MultipartFile[] files) throws IllegalStateException, IOException, SQLException {
		if(files!= null && !files[0].isEmpty()) {
		//			String realPath = servletContext.getRealPath("/upload");
		String realPath = servletContext.getRealPath("/resources/img");
		String today = new SimpleDateFormat("yyMMdd").format(new Date());
		String saveFolder = realPath + File.separator + today;
			File folder = new File(saveFolder);
		if(!folder.exists())
			folder.mkdirs();
		List<FileInfoDto> fileInfos = new ArrayList<FileInfoDto>();
		for(MultipartFile mfile : files) {
			FileInfoDto fileInfoDto = new FileInfoDto();
			String originalFileName = mfile.getOriginalFilename();
			if(!originalFileName.isEmpty()) {
				String saveFileName = UUID.randomUUID().toString() + originalFileName.substring(originalFileName.lastIndexOf('.'));
				fileInfoDto.setSaveFolder(today);
				fileInfoDto.setOriginFile(originalFileName);
				fileInfoDto.setSaveFile(saveFileName);
					mfile.transferTo(new File(folder, saveFileName));
			}
			fileInfos.add(fileInfoDto);
		}
		board.setFileInfos(fileInfos);
	}
		bservice.write(board);
	
	return new ResponseEntity<String>("success",HttpStatus.OK);
}
```

***

## UPDATE

```java
@PutMapping("{bnum}")
public ResponseEntity<String> update(@RequestBody BoardDto boardDto) {
	boolean result = bservice.update(boardDto);
	if(!result)
		return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
	else 
		return new ResponseEntity<String>("success", HttpStatus.OK);
}
```

***

## DELETE

```java
@DeleteMapping("{bnum}")
public ResponseEntity<String> delete(@PathVariable int bnum) {
	int result = bservice.delete(bnum);
	if(result>0)
		return new ResponseEntity<String>("success",HttpStatus.OK);
	else
		return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
}
```

# CommentController

## LIST

```java
@GetMapping("{bnum}")
public ResponseEntity<List<CommentDto>> listCmd(@PathVariable int bnum){
	List<CommentDto> clist = cservice.getCmtList(bnum);
	
	if(clist == null)
		return new ResponseEntity<List<CommentDto>>(HttpStatus.NO_CONTENT);
	else
		return new ResponseEntity<List<CommentDto>>(clist, HttpStatus.OK);
}
```

***

## WRITE

```java
@PostMapping("{bnum}")
public ResponseEntity<String> registCmd(@PathVariable int bnum, @RequestBody CommentDto dto){
	boolean result = cservice.writeComment(dto);
	if(!result)
		return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
	else
		return new ResponseEntity<String>("success", HttpStatus.OK);
}
```

***

## DELETE

##### 추가된 기능
```java
@DeleteMapping("{cnum}")
public ResponseEntity<String> deleteCmd(@PathVariable int cnum){
	boolean result = cservice.deleteComment(cnum);
	if(!result)
		return new ResponseEntity<String>("fail",HttpStatus.NO_CONTENT);
	else
		return new ResponseEntity<String>("success", HttpStatus.OK);
}
```

***

# HouseController

## LIST

```java
@GetMapping
public ResponseEntity <List<Map<String, String>>> allHouse() throws Exception {
	List<Map<String, String>> houselist = hservice.allHouse();

	if(houselist == null)
		return new ResponseEntity<List<Map<String,String>>>(HttpStatus.NO_CONTENT);
	else
		return new ResponseEntity<List<Map<String,String>>>(houselist, HttpStatus.OK);
}
```

***

## SEARCH

```java
@GetMapping("/search")
public ResponseEntity<List<Map<String, String>>> searchHouse(@PathVariable Map<String, String> map) throws Exception {
	String type = map.get("type");
	String keyword = map.get("keyword");
		List<Map<String, String>> result;
	
	if(type.equals("dong")) {
		result = hservice.dongHouse(keyword);
	}else {
		result = hservice.aptnameHouse(keyword);
	}
	if(result == null)
		return new ResponseEntity<List<Map<String,String>>>(HttpStatus.NO_CONTENT);
	else
		return new ResponseEntity<List<Map<String,String>>>(result, HttpStatus.OK);
}
```

[목차로 이동하기](#목차)
