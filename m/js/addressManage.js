/**
 * Created by hustg on 2018/8/20.
 */

var addressId=getUrlData().addressId;
console.log(addressId);
if(addressId){
    $(".lt_topBar span").html("修改收货地址");
    $loginAjax({
        url:"/address/queryAddress",
        type:"get",
        success:function (res) {
            for(var i=0;i<res.length;i++){
                if(res[i].id==addressId){
                    $('[name="address"]').val(res[i].address);
                    $('[name="addressDetail"]').val(res[i].addressDetail);
                    $('[name="recipients"]').val(res[i].recipients);
                    $('[name="postCode"]').val(res[i].postCode);
                }
            }
        }
    });
}
var picker = new mui.PopPicker({
    layer: 3
});
picker.setData(cityData);

// 初始地址
picker.pickers[0].setSelectedIndex(16);
picker.pickers[1].setSelectedIndex(0);
picker.pickers[2].setSelectedIndex(4);

 // 为地址选择注册事件
$('[name="address"]').on("tap",function () {
    var that=this;
    picker.show(function(SelectedItem) {
        console.log(SelectedItem);
        var address="";
        for(var i=0;i<SelectedItem.length;i++){
            address+=SelectedItem[i].text;
        }
        console.log(address);
        $(that).val(address);
    });
});

var address="";
var addressDetail="";
var recipients="";
var postcode="";


$(".btn_submit").on("tap",function () {
     address=$('[name="address"]').val();
     addressDetail = $('[name="addressDetail"]').val();
     recipients=$('[name="recipients"]').val();
     postcode =$('[name="postCode"]').val();

    if(!recipients){
        mui.toast("请输入收货人");
        return;
    }
    if(!postcode){
        mui.toast("请输入邮编");
        return;
    }else if(!/^\d{6}$/.test(postcode)){
        mui.toast("请输入合法邮编");
        return;
    }
    if(!address){
        mui.toast("请选择省市区");
        return;
    }
    if(!addressDetail){
        mui.toast("请输入详细地址");
        return;
    }
    if(addressId){
        editAddress(addressId);
    }else{
        addAddress();
    }


});

function addAddress(){
    $loginAjax({
        url: "/address/addAddress",
        type: "post",
        data: {
            address: address,
            addressDetail: addressDetail,
            recipients: recipients,
            postcode: postcode
        },
        success: function () {
                location.href = "/m/user/address.html";
        }
    });
}

function editAddress(id){
    $loginAjax({
        url: "/address/updateAddress",
        type: "post",
        data: {
            address:address,
            addressDetail: addressDetail,
            recipients: recipients,
            postcode: postcode,
            id:id
        },
        success: function () {
            location.href = "/m/user/address.html";
        }
    });
}