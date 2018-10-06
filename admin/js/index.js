/**
 * Created by hustg on 2018/8/22.
 */
var data_sign={"1月":26,"2月":59,"3月":90,"4月":120,"5月":340,"6月":333,"7月":24,"8月":95,"9月":180,"10月":300,"11月":200,"12月":260,};
var data_m=[];
var data_v=[];
$.each(data_sign,function (item,value) {
    data_m.push(item);
    data_v.push(value);
});
var bar=document.querySelector(".picBar");
var myChart_bar=echarts.init(bar);
var option_bar = {
    title : {
        text: '2018年注册用户人数',
        subtext: '我瞎编的'
    },
    tooltip : {
        trigger: 'axis'
    },
    legend: {
        data:['注册量']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {show: true, type: ['line', 'bar']},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    xAxis : [
        {
            type : 'category',
            data : data_m
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'人数',
            type:'bar',
            data:data_v,
            markPoint : {
                data : [
                    {name : '年最高', value : 1822, xAxis: 7, yAxis: 183, symbolSize:18},
                    {name : '年最低', value : 23, xAxis: 11, yAxis: 3}
                ]
            },
            markLine : {
                data : [
                    {type : 'average', name : '平均值'}
                ]
            }
        }
    ]
};
myChart_bar.setOption(option_bar);


var pie=document.querySelector(".picPie");
var myChart_pie=echarts.init(pie);
var option_pie = {
    title : {
        text: '品牌销量占比',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : 'left',
        data:['阿迪达斯','耐克','匡威','李宁','乔丹']
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            magicType : {
                show: true,
                type: ['pie', 'funnel'],
                option: {
                    funnel: {
                        x: '25%',
                        width: '50%',
                        funnelAlign: 'left',
                        max: 1548
                    }
                }
            },
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    calculable : true,
    series : [
        {
            name:'品牌销量占比',
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'阿迪达斯'},
                {value:310, name:'耐克'},
                {value:234, name:'匡威'},
                {value:135, name:'李宁'},
                {value:1548, name:'乔丹'}
            ]
        }
    ]
};

myChart_pie.setOption(option_pie);