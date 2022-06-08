window.addEventListener('load', function () {
    // 下拉菜单
    function dropdown(item,kid){
        for (var i = 0; i < item.length; i++) {
            item[i].onmouseover = function(){
                this.style.cursor='pointer';
                this.children[kid].style.display = 'block';
            }
            item[i].onmouseout = function(){
                this.children[kid].style.display = 'none';
            }
        }
    }

    var arrow_icon = document.querySelectorAll('.arrow_icon');
    dropdown(arrow_icon,0);

    var navitem_tab = this.document.querySelectorAll('.navitem_tab');
    dropdown(navitem_tab,1);
})