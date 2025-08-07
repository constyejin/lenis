$(function() {
    let wW = window.innerWidth;
    let wH = window.innerHeight;
    const body = $("body");
    const hd = $("#ddg_my_hd");
    let hdH = hd.height();
    const hamBtn = $(".m_gnb_btn");
    const gnbWrap = $(".ddg_my_util");
    const gnb = $("#ddg_my_gnb");
    const d1 = $(".depth1");
    const d1a = $(".depth1 > a");
    const slideSpeed = 300;

    // 반응형 check
    function rwd() {
        wW = window.innerWidth;
        wH = window.innerHeight;
        if(wW < 768) {
            body.addClass("mo").removeClass("tb pc");
        } else if(wW >= 768 && wW < 1024) {
            body.addClass("tb").removeClass("mo pc");
        } else {
            body.addClass("pc").removeClass("mo tb");
        }
        if($("body").hasClass("pc")){
            pcGnb();
        } else {
            hd.off("mouseenter mouseleave");
            gnb.off("mouseenter mouseleave");
            d1.off("mouseenter mouseleave");
        }
    }
    // 헤더 reset
    function reset() {
        hdH = hd.height();
        body.removeClass("hidden");
        //gnbReset();
    }

    function pcGnb() {
        //헤더디자인 바꾸기
        hd.mouseenter(function(){
            $(this).addClass("active");
        });
        hd.mouseleave(function(){
            $(this).removeClass("active");
        });
        // PC GNB
        d1.mouseenter(function(){
            $(this).addClass("active");
        });
        d1.mouseleave(function(){
            $(this).removeClass("active");
        });
    }

    // 모바일 GNB
    let chk = 0;
    hamBtn.click(function(){
        chk++;
        if(chk %= 2) {
            $(this).text("close");
            $(this).css("color","#000");
            $(".header_mobile_bg").show();
        } else {
            $(this).text("menu");
            $(this).css("color","#fff");
            $(".header_mobile_bg").hide();
        }
        gnbWrap.toggleClass("active");
    });

    d1a.click(function(){
        if(body.hasClass("mo") || body.hasClass("tb")){
            $(this).parent().siblings().removeClass("active");
            $(this).parent().toggleClass("active");

            hamBtn.text("menu");
            hamBtn.css("color","#fff");
            $(".header_mobile_bg").hide();
            gnbWrap.removeClass("active");

            return;
        }
    });

    $('.depth1, .depth1 a').on('click', function(event) {
        var target = $(this.hash);
        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 500); // 
        }
    });

    // top button - 위로 가기
    $(".top_btn").on("click", function() {
        $("html, body").animate({ scrollTop: 0 }, "fast");
        return false;
    });
    
    // about섹션과 core섹션에서 헤더 디자인 변경 기능
    const $header = $("#ddg_my_header");

    const $aboutSection = $("#about"); 
    const $aboutWrap = $("#about_wrap"); 
    const $coreSection = $("#core"); 
    const $careerSection = $("#ddg_my_career_contents");

    function handleHeaderColorChange() {
        // body에 'pc' 클래스가 없으면 기능 비활성화
        // if (!$('body').hasClass('pc')) {
        //     $header.removeClass("dark_header"); 
        //     return; 
        // }

        // 필요한 섹션들이 모두 없으면 기능 비활성화 (기본 상태로)
        if ($aboutSection.length === 0 && $aboutWrap.length === 0 && $coreSection.length === 0 && $careerSection === 0) {
            $header.removeClass("dark_header");
            return;
        }

        const scrollPos = $(window).scrollTop(); // 현재 스크롤 위치
        const headerHeight = $header.outerHeight(); // 헤더 높이

        // 각 섹션 위치 계산
        const isHeaderInAbout = $aboutSection.length > 0 && 
                               (scrollPos + headerHeight > $aboutSection.offset().top && 
                                scrollPos < ($aboutSection.offset().top + $aboutSection.outerHeight()));
        
        const isHeaderInAboutWrap = $aboutWrap.length > 0 &&
                                    (scrollPos + headerHeight > $aboutWrap.offset().top &&
                                     scrollPos < ($aboutWrap.offset().top + $aboutWrap.outerHeight()));

        const isHeaderInCore = $coreSection.length > 0 &&
                               (scrollPos + headerHeight > $coreSection.offset().top &&
                                scrollPos < ($coreSection.offset().top + $coreSection.outerHeight()));

        const isHeaderInCareer = $careerSection.length > 0 &&
                               (scrollPos + headerHeight > $careerSection.offset().top &&
                                scrollPos < ($careerSection.offset().top + $careerSection.outerHeight()));                        
        
        let shouldAddDarkHeader = false;

        // 로직 순서 : about_wrap이 가장 우선순위가 높고 그 다음 core, 그 다음 about (추가 조건).
        if (isHeaderInAboutWrap) { // 2. about_wrap 영역에 들어오면 dark_header 제거 (우선순위 높음)
            shouldAddDarkHeader = false;
        } else if (isHeaderInCore) { // 3. core 섹션에 들어오면 dark_header 추가
            shouldAddDarkHeader = true;
        } else if (isHeaderInAbout) { // 1. about 섹션에 들어오면 dark_header 추가
            shouldAddDarkHeader = true;
        } else if (isHeaderInCareer) { // 1. about 섹션에 들어오면 dark_header 추가
            shouldAddDarkHeader = true;
        } else { 
            shouldAddDarkHeader = false;
        }

        if (shouldAddDarkHeader) {
            $header.addClass("dark_header");
        } else {
            $header.removeClass("dark_header");
        }
    }

    // 페이지 로드 시 한 번 실행
    handleHeaderColorChange();
    rwd();

    // Initialize top button
    $(window).trigger('scroll');

    $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
            $('.top_btn').fadeIn();
        } else {
            $('.top_btn').fadeOut();
        }
        handleHeaderColorChange();
    });

    $(window).resize(function(){
        rwd();
        reset();
        handleHeaderColorChange();
    });
    
});


    