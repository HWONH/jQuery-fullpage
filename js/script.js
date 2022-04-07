$(document).ready(function(){
    // fullpage_make
    // mousewheel : 익스플로러, 크롬, 사파리, 오페라
    // DOMMouseScroll : 파이어폭스

    var $elm=".box"; //클래스명을 지목할 만한 문자 데이터
    $($elm).each(function(index){
        // 개별적으로 각 섹션마다 마우스 휠 이벤트 적용
        $(this).on("mousewheel DOMMouseScroll", function(e){
            e.preventDefault(); // 초기화 방지(초기화 시, 현재 화면에서 최상단으로 올라가지 못 하도록 한다)
            console.log(e); // *** each문의 index와 같이 "mousewheel DOMMouseScroll"의 이벤트가 발생하였을 때 자동 생성되는 값으로 수 많은 값을 포함, [개발자 모드]-[Console]에서 확인 가능

            var delta=0; // 마우스가 휠을 돌리지 않은 상태를 초기값으로 선정
            console.log(event.wheelDelta); // 마우스 휠을 내렸을 때, -120 <=> 마우스 휠을 올렸을 때, 120, event는 고유의 값, event가 아닌 매개변수 e와 동일하게 선언해도 됨
            console.log(event.detail); // 파이어폭스 브라우저에서 받게 되는 값; 마우스 휠을 내렸을 때, 3 <=> 마우스 휠을 올렸을 때, -3
            
            if(!event){event=window.event} // 어떠한 이벤트도 발생하지 않았다면 초기 윈도우 이벤트로 등록
            if(event.wheelDelta){ // 마우스 휠 이벤트를 통해서 어떠한 값을 받았다면
                delta=event.wheelDelta / 120; // 마우스 휠을 내렸을 때, -1 <=> 마우스 휠을 올렸을 때, 1
                if(window.opera){delta = -delta}
            }else if(event.detail){
                delta = -event.delta / 3 // 마우스 휠을 내렸을 때, -1 <=> 마우스 휠을 올렸을 때, 1
            }

            var $moveTop=$(window).scrollTop(); // 각 섹션의 브라우저 상단으로부터 떨어진 스크롤바의 상단 위치값을 저장
            var $elmIndex=$($elm).eq(index);
            // 마우스 휠을 위에서 아래 방향으로 내렸을 때
            if(delta<0){ // 마우스 휠을 내려서 delta에 저장된 값이 음의 정수라면
                if($($elmIndex).next()!=undefined){ // 마우스 휠을 내리는 시점에서 다음 섹션이 존재한다면
                    try{ // 실행문 처리에 대한 시도
                        $moveTop=$($elmIndex).next().offset().top;
                        $(".box").removeClass("active");
                        $($elmIndex).next().addClass("active");
                        var $index=$(".box.active").index();
                        $("header ul li").removeClass("active");
                        $("header ul li").eq($index).addClass("active");
                    }catch(e){ // 시도한 부분 이외의 나머지 부분에 대한 에러를 예외 처리
                        // console.log("예외처리");
                    }
                }
            // 마우스 휠을 아래에서 위 방향으로 올렸을 때
            }else{ // 마우스 휠을 올려서 delta에 저장된 값이 양의 정수라면
                if($($elmIndex).prev()!=undefined){ // 마우스 휠을 내리는 시점에서 이전 섹션이 존재한다면
                    try{
                        $moveTop=$($elmIndex).prev().offset().top;
                        $(".box").removeClass("active");
                        $($elmIndex).prev().addClass("active");
                        var $index=$(".box.active").index();
                        $("header ul li").removeClass("active");
                        $("header ul li").eq($index).addClass("active");
                    }catch(e){
                        // console.log("예외처리");
                    }
                }
            }

            // 실제로 동작을 수행하도록 명령
            $("html, body").stop().animate({scrollTop:$moveTop+"px"}, 800);
        });
    });

    $("header ul li").click(function(){
        var $index=$(this).index();
        $("header ul li").removeClass("active");
        $(this).addClass("active");
        $("html, body").stop().animate({scrollTop:$(".box").eq($index).offset().top}, 1000, function(){
            // 애니메이션이 동작 완료되면 .box에 active라는 클래스명이 추가되도록 선언
            $(".box").removeClass("active");
            $(".box").eq($index).addClass("active");
        });
        return false;
    });
    /* 
    try{
        실행문
    }catch(e){
        예외처리
    }
     */

    /* 
    if(조건이 참이라면){
        내부 실행문을 실행해라
    };
    */

    // {} : scope 또는 블록
});