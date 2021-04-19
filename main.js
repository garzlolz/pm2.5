
//請求post
var xhr = new XMLHttpRequest();
xhr.open('post','https://data.epa.gov.tw/api/v1/aqx_p_02?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&format=json',true);
xhr.send();
xhr.onload = function(){
  var data = JSON.parse(xhr.responseText).records;
  main(data)
}
    function main(data){
      /**************************************************  選擇器  ************************************************* */
      var select_City = document.querySelector('#city');  // 選擇器：縣市
      var select_Town = document.querySelector('#town');  // 選擇器：城鎮
      var title_City = document.querySelector('#Title_City'); //Content 標題：縣市
      var titie_Town = document.querySelector('#TitleTown');  //Content 標題：城鎮
      var Content_pm = document.querySelector('.result');     //結果
      var UpdateTime = document.querySelector('#updateTime'); //更新時間
      /************************************************************************************************************ */


      UpdateTime.innerHTML = data[0].DataCreationDate; // 更新時間
      

      let String1 = '';                                 //篩選縣市
      let temp1 = [];
      for(let i=0;i<data.length;i++){
        temp1.push(data[i].county);
      }
      var temp1_Result = temp1.filter(function(el,index,arr){
        return arr.indexOf(el) === index;
      })
      for(let i=0;i<temp1_Result.length;i++){
        String1 += `<option dataset="${i}" value="${temp1_Result[i]}">${temp1_Result[i]}</option>`
      }
      select_City.innerHTML = String1;                //綁定選擇器 : 縣市

      select_City.addEventListener('change',function(){ //縣市添加event
        let String = ''
        for(let i=0;i<data.length;i++){
          if(select_City.value == data[i].county){
            String += `<option dataset="index${i}" value="${data[i].Site}">${data[i].Site}</option>`
          }
        }
        select_Town.innerHTML = String;

        select_Town.addEventListener('change',function(){

        })
      })
    }