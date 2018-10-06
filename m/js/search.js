/**
 * Created by hustg on 2018/8/16.
 */
$(function () {
    // 初始化搜索历史
    var searchList=JSON.parse(localStorage.getItem("searchList"))||[ ];
    var render=function(searchList){
        var html=template("searchHistory",{"list":searchList});
        $(".lt_search_result").html(html);
    };
    render(searchList);

    // 注册搜索点击事件，添加搜索历史
    $(".container a").on("click",function () {
        // var search_val=$(".container input").val();
        var search_val=myForm.input_val.value.trim();
        console.log(search_val);
        if(!search_val){
            mui.toast('请输入搜索信息',{ duration:'long', type:'div' });
            return;
        }
        var searchList=JSON.parse(localStorage.getItem("searchList"))||[ ];
        var search_index=searchList.indexOf(search_val);
        if(search_index!=-1){
            searchList.splice(search_index,1);
        }
        search_val&&searchList.push(search_val);
        console.log(searchList);
        localStorage.setItem("searchList",JSON.stringify(searchList));
        location.href="searchList.html"+"?key="+search_val;
    });


    // 注册删除点击事件，删除搜索历史
    $(".lt_search_result").on("click","span",function () {
        var list_id=$(this).data("id");
        searchList.splice(list_id,1);
        localStorage.searchList=JSON.stringify(searchList);
        render(searchList);
    });
    // 注册清空点击事件，清空搜索历史
    $(".lt_search_bar span.fa-trash").on("click",function () {
        searchList=[];
        localStorage.searchList=JSON.stringify(searchList);
        render(searchList);
    })
});