$(document).ready(main);

function main()
{
//    initialiseBox();

    if (customise())
    {
        start();
    }
}

function start()
{
    $("#help").css("display","none");
    $("#epic-music")[0].play();

    initialiseBox2();

    animateIn();
}

function customise()
{
    var url=document.URL;

    var customisations=url.split("#");

    customisations=parseUrl(customisations);

    if (!customisations)
    {
        return false;
    }

    return applyCustomisations(customisations);
}

function parseUrl(urlArray)
{
    if (urlArray.length<3)
    {
        return false;
    }

    var c={};

    for (x=0;x<urlArray.length;x++)
    {
        console.log(urlArray[x+1]);

        if (urlArray[x]=="background")
        {
            c.background=urlArray[x+1];
        }

        else if (urlArray[x]=="toptext")
        {
            c.toptext=urlArray[x+1].replace(/_/g," ");
        }
        
        else if (urlArray[x]=="bottext")
        {
            c.bottext=urlArray[x+1].replace(/_/g," ");
        }

        else if (urlArray[x]=="darken")
        {
            c.darken=urlArray[x+1];
        }

        else if (urlArray[x]=="preset")
        {
            c.preset="presets/"+urlArray[x+1];
        }
    }

    return c;
}

function applyCustomisations(customisations)
{
    if (customisations.preset)
    {
        $.get(customisations.preset,function(data)
              {
                  applyCustomisations(data);
                  start();
              },"json");
        
        return false;
    }

    if (customisations.background)
    {
        $("#accomplishment img").attr("src",customisations.background);
    }

    if (customisations.toptext)
    {
        $(".toptext p").text(customisations.toptext);
    }

    if (customisations.bottext)
    {
        $(".bottomtext p").text(customisations.bottext);
    }

    if (customisations.darken)
    {
        $(".darken").css("opacity",customisations.darken);
    }

    return true;
}

function initialiseBox2()
{
    var botBox=$(".bottomtext");
    var botTextWidth=parseInt($(".bottomtext p").width());

    var topBox=$(".toptext");
    var topTextWidth=parseInt($(".toptext p").width());

    var mainBox=$("#details");

    botBox.css("width",botTextWidth);
    topBox.css("width",topTextWidth);

    botBox.css("margin-left",botTextWidth/-2);
    topBox.css("margin-left",topTextWidth/-2);

    var mainBoxWidth=botTextWidth;

    if (topTextWidth>mainBoxWidth)
    {
	mainBoxWidth=topTextWidth;
    }

    mainBox.css("width",mainBoxWidth+100);
    mainBox.css("margin-left",(mainBoxWidth+100)/-2);

    var botText=$(".bottomtext p");
    var topText=$(".toptext p");

    botText.css("width",botTextWidth)
        .css("margin-left",botTextWidth/-2)
        .css("position","absolute");

    topText.css("width",topTextWidth)
        .css("margin-left",topTextWidth/-2)
        .css("position","absolute");

    $("#detail-wrap").css("width",mainBoxWidth+100);
}

function initialiseBox()
{
    var topBox=parseInt($(".toptext p").width());
    var botBox=parseInt($(".bottomtext p").width());

    if (topBox>botBox)
    {
        botBox=topBox;
    }

    $("#details").css("width",botBox)
        .css("margin-left",botBox/-2);

    var topText=$(".toptext");
    var botText=$(".bottomtext");

    topText.css("margin-left",topText.width()/-2);
    botText.css("margin-left",botText.width()/-2);
    
}

function animateIn()
{
    t=new TimelineMax({delay:.5});

    var milestone=$("#milestone");
    var borderTop=$(".topbox");
    var borderBottom=$(".botbox");
    var details=$("#detail-wrap");
    var darken=$(".darken");

    var milestoneA=TweenMax.from(milestone,3,{width:"0px",ease:Power1.easeOut});

    t.add(milestoneA,0)
        .from(borderTop,2,{top:"-10%"},0)
        .from(borderBottom,2,{top:"100%"},0)
        .from(darken,2,{opacity:0},0)
        .to(milestone,2,{width:"0px",ease:Power0.easeOut},"+=.5")
        .set(details,{opacity:1})
        .from(details,2,{width:"0px"})
        .addLabel("detailDone")
        .to(details,2,{width:"0px"},"detailDone+=3")
        .to(borderTop,2,{top:"-10%"},"detailDone+=3")
        .to(borderBottom,2,{top:"100%"},"detailDone+=3")
        .to(darken,2,{opacity:0},"detailDone+=3");
}
