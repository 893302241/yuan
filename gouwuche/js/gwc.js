window.onload=function(){
   if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {
                if (els[i].className === cls
                    || els[i].className.indexOf(cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls) >= 0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    } 


    var cartTable=document.getElementById('cartTable');
    var tr=cartTable.children[1].rows;
    var checkInputs=document.getElementsByClassName('check');
    var checkAllInputs=document.getElementsByClassName('check-all');
    var selectedTotal = document.getElementById('selectedTotal');
    var priceTotal = document.getElementById('priceTotal');
    var selected=document.getElementById('selected');
    var foot =document.getElementById('foot');
    var selectedViewList=document.getElementById('selectedViewList');
    var deteAll=document.getElementById('deteAll');
    //计算
    function getTotal(){
        var selected=0;
        var price=0;
        var HTMLstr='';
            for(var i=0,len=tr.length;i<len;i++){
                if(tr[i].getElementsByTagName('input')[0].checked){
                    tr[i].className='on';
                    selected +=parseInt(tr[i].getElementsByTagName('input')[1].value);
                    price +=parseFloat(tr[i].cells[4].innerHTML);
                    HTMLstr +='<div><img src="'+ tr[i].getElementsByTagName('img')[0].src+'" /><span class="del" index="'+ i +'">取消选择</span></div>';
                }
                else{
                    tr[i].className='';
                }
            }
            selectedTotal.innerHTML=selected;
            priceTotal.innerHTML=price.toFixed(2);
            selectedViewList.innerHTML=HTMLstr;
    }

    for(var i=0,len=checkInputs.length;i<len;i++){
        checkInputs[i].onclick=function (){
            if(this.className==='check-all check'){
                for (var j=0;j<checkInputs.length;j++) {
                    checkInputs[j].checked=this.checked;
                }
            }
            if(this.checked == false){
                for (var k=0;k<checkAllInputs.length;k++) {
                checkAllInputs[k].checked=false;
               
        }
         
    }
    getTotal();
}  
}
//显示已选商品层
// selected.onclick=function(){
//     console.log(123);
//     if(foot.className='foot'){
//         if(selectedTotal.innerHTML !=0){
//             foot.className='foot show';
//         }

        
//     }else{
//         foot.className='foot';
//     }
// }

selected.onclick = function () {
        if (selectedTotal.innerHTML != 0) {
            foot.className = (foot.className == 'foot' ? 'foot show' : 'foot');
        }
    }
// 取消选择事件
selectedViewList.onclick=function(e){
    var e=e ||window.event;
    var el=e.srcElement;
    if(el.className="del"){
        var i=el.getAttribute('index');
        var input=tr[i].getElementsByTagName('input')[0];
        input.checked=false;
        input.onclick();
    }
    

}

// 价格计算
    function getSubtotal(tr){
            var tds=tr.getElementsByTagName('td');
            var price=tds[2];//单价
            var Subtotal =tds[4];//小计
            var count=tr.getElementsByTagName('input')[1];//数量
            Subtotal.innerHTML=(parseInt(count.value) * parseFloat(price.innerHTML)).toFixed(2);

    }
// 加减的计算
for (var i=0;i<tr.length;i++) {
    //点击加减实现金额变化
    tr[i].onclick=function(e){
    var e=e || window.event;
    var el=e.target || e.srcElement;
    var cls=el.className;
    var count=this.getElementsByTagName('input')[1];
    var val=parseInt(count.value);
   if(cls=="add"){
        count.value=val+1;
        getSubtotal(this);
        getTotal();
        
   }
   if(cls=="reduce"){
    if(count.value>1){
        count.value=val-1;
        getSubtotal(this);
        getTotal();
        
    }
        
    }
    if(cls=="delete"){
        var conf=confirm('确定删除商品吗？');
        if(conf){
            this.parentNode.removeChild(this);
        }
    }
    getTotal();
   }
   //删除全部事件
   deleteAll.onclick=function(){
    if(selectedTotal.innerHTML !=0){
        var conf=confirm('确定删除商品吗？');
        if(conf){
            for(i=0;i<tr.length;i++){
                var input=tr[i].getElementsByTagName('input')[0];
                if(input.checked)
                    tr[i].parentNode.removeChild(tr[i]);
                    i--;
            }
        }
    }
    getTotal();
   }
   //输入文本实现金额变化
   tr[i].getElementsByTagName('input')[1].onkeyup=function(){
            var val=parseInt(this.value);
            var tr=this.parentNode.parentNode;
            var reduce=tr.getElementsByTagName('span')[1];
            if(isNaN(val) || val<=0){
                val=1;
            }
            if(this.value !=val){
                this.value=val;
            }
            if(val <= 1){
                reduce.innerHTML='';
                
            }else{
                reduce.innerHTML='-';
            }

            getSubtotal(tr);//更新小计
            getTotal();//更新总数
   }
   }
   checkAllInputs[0].checked=true;
   checkAllInputs[0].onclick();
} //结束

