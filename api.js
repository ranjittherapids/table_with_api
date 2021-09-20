
changePage(1)
function changePage(i) {
  baseurl = `https://api.instantwebtools.net/v1/passenger?page=${i}&size=20`
  getData(baseurl)
}
var airlinename='';
      var airlineCountry='';
var tbody = document.getElementById('tbody')
function getData(baseurl) {
  axios.get(baseurl)
    .then(response => {
      var dataList = response.data.data;
      var row = '';
      
      dataList.map((data, index) => {
        (data.airline).map(data => {
          
          airlinename = (data.name)
          airlineCountry = data.country
        })
      
      
        row += ` <tr>
                      <td>${data.name}</td>
                      <td>${airlinename}</td>
                      <td>${airlineCountry}</td>
                    </tr>`
      })
      tbody.innerHTML = row

    })
    .catch(error => console.log(error))
}

//////// for filter and serching///////
var NameSearch, airlineNameSearch, CountrySearch = false;
const NameFilter = () => {
  NameSearch = true;
  CountrySearch = false;
  airlineNameSearch = false;
}
const AirlineNameFilter = () => {
  NameSearch = false;
  CountrySearch = false;
  airlineNameSearch = true;
}
const CountryFilter = () => {
  CountrySearch = true;
  NameSearch = false;
  airlineNameSearch = false;
}
const inputChange = (e) => {
  var tr = document.querySelectorAll('#tbody tr')
  var searchValue = (e.value).toUpperCase();
  for (var i = 0; i < tr.length; i++) {
    var tdName = (tr[i].getElementsByTagName('td'))
    var tdNameIndex;
    if (NameSearch) { tdNameIndex = tdName[0] }
    else if (airlineNameSearch) { tdNameIndex = tdName[1] }
    else if (CountrySearch) { tdNameIndex = tdName[2] }
    else { tdNameIndex = tdName[0] }
    var txtValue = tdNameIndex.textContent || tdNameIndex.innerText;
    if (txtValue.toUpperCase().indexOf(searchValue) > -1) {
      tr[i].style.display = '';
    }
    else {
      tr[i].style.display = 'none';
    }
  }
}
var filterToggle = document.getElementById('filtershow');
filterToggle.style.display = 'none';
const filter = () => { filterToggle.classList.toggle("show"); }
//////// for filter and serching///////

var shortToggle = false;
var nameshorting,airlineshorting,countryshorting;
 const Nameshorting=(e)=>{
   nameshorting=true;
   airlineshorting=false;
   countryshorting=false;
  Shorting(e)
}
const Airlinenameshort =(e)=>{
  nameshorting=false;
  airlineshorting=true;
  countryshorting=false;
  Shorting(e)
}
const Countryshorting =(e)=>{
  nameshorting=false;
  airlineshorting=false;
  countryshorting=true;
  Shorting(e)
}
function Shorting(e) {
   var roowChange=e.innerHTML
    if(roowChange=='arrow_downward'){
      e.innerHTML="arrow_upward"
    }
    else{
      e.innerHTML="arrow_downward"
    }
  shortToggle = !shortToggle
  var  shorting, x, y, shouldSwitch;
  
  const tbody = document.getElementById("tbody");
  shorting = true;
  while (shorting) {
    shorting = false;
    
    var tr = (tbody.querySelectorAll('tr'))
    for (var q = 0; q < (tr.length - 1); q++) {
      shouldSwitch = false;
      if(nameshorting){
        x = tr[q].querySelectorAll('td')[0];
        y = tr[q + 1].querySelectorAll('td')[0];
      }
      else if(airlineshorting){
        x = tr[q].querySelectorAll('td')[1];
        y = tr[q + 1].querySelectorAll('td')[1];
      }
      else if(countryshorting){
        x = tr[q].querySelectorAll('td')[2];
        y = tr[q + 1].querySelectorAll('td')[2];
      }
      if (shortToggle) {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      else {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }

    }
    if (shouldSwitch) {
      tr[q].parentNode.insertBefore(tr[q + 1], tr[q]);
      shorting = true;
    }
  }
}


// // pagination
var uiTag = document.getElementById('pagination')
var totalpages = 60;
function pageChange(totalpages, currentpages) {
  var li = '';
  var activeli;
  var beforepages = currentpages - 2;
  var afterpages = currentpages + 2;
  if (currentpages > 4) { li += `<li onclick='pageChange(totalpages,${currentpages - 1})'>previous</li>`}
if(currentpages>3){li += `<li onclick='pageChange(totalpages,1)'>1</li>`}
  if (currentpages == totalpages) { beforepages = beforepages - 2;}
  else if (currentpages == totalpages - 1) { beforepages = beforepages - 1;}
  if (currentpages == 1) {
    afterpages = afterpages + 2;
    beforepages = beforepages + 1;
  }
  else if (currentpages == 2) {afterpages = afterpages + 2;}
  for (var pagelength = beforepages; pagelength <= afterpages; pagelength++) {
     if (pagelength > totalpages) { continue}
    if (pagelength == 0) {pagelength = pagelength + 1; }
    if (currentpages == pagelength) {activeli = 'active'}
    else {activeli = '' }
    li += `<li class='${activeli}' onclick='pageChange(totalpages,${pagelength})' >${pagelength}</li>`
  }
  if (currentpages < totalpages - 2) {
    if (currentpages < totalpages - 3) {li += `<li>......</li>`}
    li += `<li onclick='pageChange(totalpages,${totalpages})'>${totalpages}</li>`;
  }
  if (currentpages < totalpages -3) { li += `<li onclick='pageChange(totalpages,${currentpages + 1})'>next</li>`}
  uiTag.innerHTML = li;
  changePage(currentpages)
}
pageChange(totalpages, 1)
