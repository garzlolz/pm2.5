//請求post
var xhr = new XMLHttpRequest();
xhr.open('post','https://data.epa.gov.tw/api/v1/aqx_p_02?limit=1000&api_key=9be7b239-557b-4c10-9775-78cadfc555e9&format=json',true);
xhr.send();
xhr.onload = function(){
  var data = JSON.parse(xhr.responseText).records;
  filterData(data);
}

function filterData(data){
//篩選城市，綁定option
  document.querySelector('#updateTime').textContent = data[0].DataCreationDate;
  var Repeatcouty=[];
  for(let i=0;i<data.length;i++){
    Repeatcouty.push(data[i].county)
  }
  var County = Repeatcouty.filter(function(el,index,arr){
    return arr.indexOf(el) === index;
  })
  let String = '';
  let location = document.querySelector('#location');
  for(let i=0;i<County.length;i++){
    String += `
    <option dataset="index-${i}" value="${County[i]}">${County[i]}</option>
    `;
    location.innerHTML = String;
  }
    location.addEventListener('change',function(){
      let title = document.querySelector('#TitleCountry');
      var String = ''
      for(let i=0;i<data.length;i++){
        if(location.value == data[i].county){
          String += 
          `<option dataset="index-#{i}" value="${data[i].Site}">${data[i].Site}</option>`
        }
      }
      title.textContent = location.value;

      let ContString = document.querySelector('.info');
      let string2 = '';
      for(let i=0;i<data.length;i++){
        if(title.textContent == data[i].county){
          string2 += `<div class ="info${i}">
              <h3>${data[i].county},${data[i].Site}監測站</h3> 
              <h5>
                          更新時間 : <em>${data[i].DataCreationDate}</em>
                    <p>PM2.5 : ${data[i].PM25}  ${data[i].ItemUnit}</p>
              </h5>
          </div>`
        }
      }
      ContString.innerHTML = string2;




    },false)


}
