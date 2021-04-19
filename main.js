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
      var String = ''
      for(let i=0;i<data.length;i++){
        if(location.value == data[i].county){
          String += 
          `<option dataset="index-#{i}" value="${data[i].Site}">${data[i].Site}</option>`
        }
      }
    
    citySelect.innerHTML = String;
    document.querySelector('#TitleCountry').textContent = location.value;
    },false)

    var citySelect =document.querySelector('#city');

    citySelect.addEventListener('change',function(){
        document.querySelector('#TitleCity').textContent = citySelect.value;
    },false)
    
    
  



}
