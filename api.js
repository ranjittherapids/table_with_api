 var totalpages ='';
 changePage(1)
 function changePage(i) {
   baseurl = `https://api.instantwebtools.net/v1/passenger?page=${i}&size=20`
   getData(baseurl)
}
var airlinename = '';
var airlineCountry = '';
var tbody = document.getElementById('tbody')
function getData(baseurl) {
  axios.get(baseurl)
    .then(response => {
      var dataList = response.data.data;
      totalpages =response.data.totalPages
      var row = '';
      dataList.map((data) => { 
        
        (data.airline).map(data => {
          airlinename = (data.name)
          airlineCountry = data.country
        })      
        row += `  
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
var nameshorting, airlineshorting, countryshorting;
const Nameshorting = (e) => {
  console.log('ok')
  nameshorting = true;
  airlineshorting = false;
  countryshorting = false;
  Shorting(e)
}
const Airlinenameshort = (e) => {
  nameshorting = false;
  airlineshorting = true;
  countryshorting = false;
  Shorting(e)
}
const Countryshorting = (e) => {
  nameshorting = false;
  airlineshorting = false;
  countryshorting = true;
  Shorting(e)
}
function Shorting(e) {
  var roowChange = e.innerHTML
  if (roowChange == 'arrow_downward') {
    e.innerHTML = "arrow_upward"
  }
  else {
    e.innerHTML = "arrow_downward"
  }
  shortToggle = !shortToggle
  var shorting, x, y, shouldSwitch;

  const tbody = document.getElementById("tbody");
  shorting = true;
  while (shorting) {
    shorting = false;

    var tr = (tbody.querySelectorAll('tr'))
    for (var q = 0; q < (tr.length - 1); q++) {
      shouldSwitch = false;
      if (nameshorting) {
        x = tr[q].querySelectorAll('td')[0];
        y = tr[q + 1].querySelectorAll('td')[0];
      }
      else if (airlineshorting) {
        x = tr[q].querySelectorAll('td')[1];
        y = tr[q + 1].querySelectorAll('td')[1];
      }
      else if (countryshorting) {
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

var currentpages = 3;
function previous() {
  currentpages = currentpages - 1
  datachange(currentpages)
}
function next() {
  currentpages = currentpages + 1
  datachange(currentpages)
}
function first() {
  currentpages = 1
  datachange(currentpages)
}
function last() {
  currentpages = totalpages
  datachange(currentpages)
}
var dynamicbtn = document.getElementById('dynamic')
function datachange(currentpages) {
  document.getElementById('pageno').innerHTML=`page No:- ${currentpages}`
  changePage(currentpages)
  document.getElementById('previous').style.display = ""
  document.getElementById('first').style.display = ""
  document.getElementById('next').style.display = ""
  document.getElementById('last').style.display = ""
  document.getElementById('dot').style.display = ""
  document.getElementById('last').innerHTML = `${totalpages}`
  if (currentpages < 4) {
    document.getElementById('previous').style.display = "none"
    document.getElementById('first').style.display = "none"

  }
  if (totalpages - 3 < currentpages) {
    document.getElementById('next').style.display = "none"
    document.getElementById('last').style.display = "none"
    document.getElementById('dot').style.display = "none"
  }
  var after = currentpages + 2;
  var before = currentpages - 2;
  var btn = '';
  if (currentpages == totalpages) {
    after = after - 2;
    before = before - 3
  }
  if (currentpages == (totalpages - 1)) {
    after = after - 1;
    before = before - 3
  }
  if (currentpages == 1) {
    after = after + 2;
    before = before + 2;
  }
  if (currentpages == 2) {
    after = after + 2;
    before = before + 1;
  }
  var active = ' '
  for (var pagelength = before; pagelength <= after; pagelength++) {
    if (currentpages == pagelength) { active = "active" }
    else { active = "" }
  
    btn += `<button class='${active}'  onclick='datachange(${pagelength})'>${pagelength}</button>`


  }
  dynamicbtn.innerHTML = btn
}
datachange(1)
document.getElementById('next').style.display = ""
document.getElementById('last').style.display = ""