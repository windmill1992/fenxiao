const setTitle = t => {
    document.title = t;
    var i = document.createElement('iframe');
    i.src = 'https://www.51xsbl.com/res/icon/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
        setTimeout(function(){
            if(i.remove){
                i.remove();
            }else{
                document.body.removeChild(i);
            }
        }, 9)
   }
    document.body.appendChild(i);
}

module.exports = {
    setTitle
}