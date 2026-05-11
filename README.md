# 🥖 ZEROLOSS 프랜차이즈 ERP - 키오스크

> 서브웨이 스타일 샌드위치/샐러드 주문 키오스크 시스템

📅 개발 기간 : 2025.04.16 ~ 2025.05.11  
👨‍👩‍👧‍👦 팀원 : 5명

<div align="center">


![Java](https://img.shields.io/badge/Java_11-007396?style=for-the-badge&logo=openjdk&logoColor=white)
![JSP](https://img.shields.io/badge/JSP-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Servlet](https://img.shields.io/badge/Servlet-6DB33F?style=for-the-badge)
![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=for-the-badge)
![MariaDB](https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white)
![Tomcat](https://img.shields.io/badge/Tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black)

</div>

---

# 📌 프로젝트 소개

**ZEROLOSS 키오스크**는  
프랜차이즈 샌드위치 브랜드를 위한 **셀프 주문 키오스크 시스템**입니다.

사용자는 키오스크를 통해  
매장/포장 선택부터 메뉴 주문, 옵션 커스터마이징, 결제까지 한 번에 진행할 수 있으며,  
주문 데이터는 ERP 시스템과 연동되어 재고가 실시간 반영됩니다.

---

# 🎬 시연 영상

> 클릭하면 영상으로 이동합니다.

[![ZEROLOSS 키오스크 시연 영상](https://img.youtube.com/vi/영상ID/maxresdefault.jpg)](https://youtu.be/영상ID)

---

# 🖥 화면 미리보기

<div align="center">

| 초기 화면 | 메뉴 화면 |
|---|---|
| <img width="200" height="300" alt="초기 화면" src="https://github.com/user-attachments/assets/fb737af0-d86a-464c-a0d0-dc3ab5859f43" /> | <img width="200" height="300" alt="메뉴 화면" src="https://github.com/user-attachments/assets/29ccc0e2-560b-4cbd-ac79-2c7a2d8d1d5a" /> |

</div>

---

# 📖 사용 메뉴얼

---

## 1️⃣ 로그인

지점을 선택하면 해당 지점의 키오스크 목록이 자동으로 불러와집니다.

- 사용할 키오스크를 선택합니다.
- 아이디와 비밀번호를 입력한 후 로그인 버튼을 누릅니다.

---

## 2️⃣ 대기 화면

메인 화면에서 원하는 주문 방식을 선택합니다.

- 🏪 **매장**
- 🛍️ **포장**

선택 후 메뉴 화면으로 이동합니다.

---

## 3️⃣ 메뉴 선택

상단 탭에서 원하는 카테고리를 선택합니다.

### 🥪 메인 카테고리

- 샌드위치
- 샐러드
- 사이드
- 음료수프

### 🗂️ 서브 카테고리

- 전체
- 클래식
- 프레시&라이트
- 프리미엄

### 🛒 메뉴 선택 방식

- 샌드위치 / 샐러드  
→ 옵션 선택 화면으로 이동

- 사이드 / 음료수프  
→ 바로 장바구니에 추가

메뉴를 모두 선택했다면 **결제하기** 버튼을 누릅니다.

---

## 4️⃣ 옵션 선택

샌드위치 / 샐러드 선택 시 원하는 옵션을 고를 수 있습니다.

### 🥖 빵 종류 선택 (필수)

- 기본 사이즈 (무료)
- L 사이즈 (+6,000원)

> ⚠️ 샐러드는 빵 선택 항목이 표시되지 않습니다.

### 🧀 추가 옵션

- 치즈 선택 (최대 1개)
- 야채 선택 (다중 선택 가능)
- 소스 선택 (1~3개)
- 추가재료 선택 (유료)

옵션 선택 후 **다음 버튼**을 눌러 옵션 확인 화면으로 이동합니다.

취소하려면 **X 버튼**을 눌러 메뉴 선택 화면으로 돌아갑니다.

---

## 5️⃣ 옵션 확인

선택한 메뉴와 옵션을 최종으로 확인하는 화면입니다.

- 메뉴명 확인
- 선택한 옵션 확인
- 총 금액 확인

### 선택 가능 기능

- 🛒 장바구니 담기  
→ 메뉴 선택 화면으로 이동

- 💳 바로 결제  
→ 주문 확인 화면으로 이동

---

## 6️⃣ 주문 확인

장바구니에 담긴 메뉴를 최종으로 확인하는 화면입니다.

### 확인 가능 항목

- 담긴 메뉴 목록
- 수량
- 금액
- 총 합계

이상이 없으면 **결제하기** 버튼을 누릅니다.

---

## 7️⃣ 결제

Toss Payments API를 통해 결제를 진행합니다.

### 💳 지원 결제 방식

- 카드 결제
- 간편 결제
- Toss Payments 지원 결제 수단 연동

결제를 완료하면 주문이 접수되고 재고가 즉시 차감됩니다.

---

## 8️⃣ 주문 완료

결제가 완료되면 주문번호를 확인할 수 있습니다.

- 화면에 표시된 주문번호 확인
- 30초 후 자동으로 처음 화면으로 이동
- 처음으로 버튼 클릭 시 즉시 초기 화면으로 이동

---

# 🛠 기술 스택

| 분류 | 기술 |
|------|------|
| Language | Java 11 |
| Frontend | JSP, JSTL, JavaScript, CSS |
| Backend | Servlet, MyBatis |
| Database | MariaDB |
| Payment | Toss Payments API |
| Server | Apache Tomcat |
| Version Control | Git |

---

<div align="center">

## ZEROLOSS  
### Franchise Integrated ERP

</div>
