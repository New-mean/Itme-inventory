draw SQL : https://drawsql.app/teams/node-15/diagrams/item-inventory


1. Item-inventory 명세서
<img width="1445" alt="스크린샷 2024-09-12 오전 2 01 21" src="https://github.com/user-attachments/assets/906b6585-ced5-4fc4-99ee-1ea7a07969fd">
<img width="1443" alt="스크린샷 2024-09-12 오전 2 01 37" src="https://github.com/user-attachments/assets/bb89b425-f94f-409a-be8f-979710391927">
<img width="1442" alt="스크린샷 2024-09-12 오전 2 01 44" src="https://github.com/user-attachments/assets/61d58c55-fa09-44fe-af9b-2e95bbdd3960">

2.비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?
= Hash는 단방향 암호화 방식에 해당합니다. 원본 데이터를 암호화한 후에는 복호화를 통해 원본 데이터로 갈수 없다.


3. 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
= 실제 비밀번호가 유출되더라도 사용자의 정보를 보호할 수 있다.


4.JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요? 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
= access token이 노출되면 누군가 그 토큰을 사용해 사용자의 권한으로 행동 가능.이는 개인정보 유출, 무단 액세스 등의 문제, refresh token을 사용한다.실제 비밀번호가 유출되더라도 사용자의 정보를 보호할 수 있습니다.


5. 인증과 인가가 무엇인지 각각 설명해 주세요. 위 API 구현 명세에서 인증을 필요로 하는 API와 그렇지 않은 API의 차이가 뭐라고 생각하시나요?
= 인증은 사용자가 누구인지 확인하는 과정, 인가는 사용자가 어떤 권한을 가지고 있는지 확인과정


6.아이템 생성, 수정 API는 인증을 필요로 하지 않는다고 했지만 사실은 어느 API보다도 인증이 필요한 API입니다. 왜 그럴까요?
= 사용자가 누구인지에 따라 달라지기 때문에 인증이 필요하다.


7.과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
 =status(400) = 아이디 영문+숫자 조합이 아닐때 , 아이디 이미 존재 할때, 아이템이 존재하지 않을때,이미 존재하는 캐릭터 일때,캐릭터가 존재하지 않을때
status(200) =로그인 되었을때, user 조회 성공할때,아이템 수정되었을때,아이템 상세 조회할때,캐릭터 상세 조회할때,캐릭터 삭제 성공할때
status(201) =회원가입 성공했을때,아이템 생성했을때,캐릭터 생성했을때
status(409) = 회원가입시 비밀번호 6자 이상 아닐때,회원가입시 비밀번호와 확인비밀번호가 다를때,
status(401) = 로그인시 존재하지않는 아이디 일때, 로그인시 비밀번호가 일치하지 않을때


8.현재는 간편한 구현을 위해 캐릭터 테이블에 money라는 게임 머니 컬럼만 추가하였습니다. - 이렇게 되었을 때 어떠한 단점이 있을 수 있을까요? - 이렇게 하지 않고 다르게 구현할 수 있는 방법은 어떤 것이 있을까요?
= 정해놓은 값만 사용할수있다.


9.아이템 구입 시에 가격을 클라이언트에서 입력하게 하면 어떠한 문제점이 있을 수 있을까요?
= 서버가 불안정 해진다.


10.과제를 수행하시면서 어려운 점을 적어주세요.
=처음 해보는 node.js라서 어려웠다.특히 prisma,JWT부분이 어려웠다. 아직 인증과 인가에대해 부족한거같다. 계속 해보면서 공부를 해야겠다.
