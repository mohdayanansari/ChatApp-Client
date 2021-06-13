const thumb =  document.querySelector(".thumb");
const scrollBar = document.querySelector(".scroll-bar");

messageContainer.onscroll = ()=> {
    let containerHeight = messageContainer.getBoundingClientRect().height - 50;

    // console.log(messageContainer.scrollTop);
    let ratio = messageContainer.scrollHeight / containerHeight;

    let thumbHeight = containerHeight / ratio;
    console.log(thumbHeight);
    
    let thumbScrollTop = scale(messageContainer.scrollTop, 0, messageContainer.scrollHeight, 0, containerHeight);
    console.log(thumbScrollTop) ;
    thumb.style.height = thumbHeight + "px";
    thumb.style.top = thumbScrollTop + "px";
}
function scale(number, inMin, inMax, outMin, outMax) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
}

window.onresize = resize;

function resize(){
    let containerProp = messageContainer.getBoundingClientRect();

    scrollBar.style.top = containerProp.x + 50 + "px";
    scrollBar.style.left = (containerProp.x + containerProp.width - 10) + "px"
    scrollBar.style.height = containerProp.height - 50 + "px";
}

resize();