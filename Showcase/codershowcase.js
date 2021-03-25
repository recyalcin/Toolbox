/*
Created by C7197-Recep || Raymond Reddington, ahem, sorry :), Raymond Garner
*/


/*HTML ICINDEKI DIVDEN DEFAULT USER VE REPO DEGERLERINI AL*/
div = document.getElementById("info");
user = div.getAttribute('data-user');
repo = div.getAttribute('data-repo');
showfiles="false";
/*EGER URL YE USER VE REPO DEGERLERI PARAMETRE OLARAK GIRILDIYSE 
DEFAULT DEGERLER YERINE BU DEGERLERI KULLAN*/
new URLSearchParams(window.location.search).forEach((value, key) => {
    if (key=="user"){
      user=value;
    }
    if(key=="repo"){
      repo=value;
    }
    if(key=="showfiles"){
      showfiles=value;
    }
})

document.getElementById("title").innerText ="Coder Showcase : " + user.toUpperCase();
/*BUTUN REPOLAR MI YOKSA BIR REPONUN ICINDEKILER MI GORUNTULENECEK?
CEKILECEK URLLERI ONA GORE ATA*/
if (repo=="all") 
{
  callback_url="https://api.github.com/users/" + user + "/repos";
  github_page_url="https://"+user+".github.io/"; 
}
else{
  callback_url="https://api.github.com/repos/" + user + "/" + repo +"/contents";
  github_page_url="https://"+user+".github.io/"+repo+"/"; 
}
  readme_url="https://raw.githubusercontent.com/"+user+"/"+repo+"/main/README.md";
/*OLUSTURULAN URL JSON METNI GOSTERIYOR. BU METNI AL*/
callback = Get(callback_url);

/*JSONDAKI BILGILERI HTML ICINDEKI NAV BAR ICINE TAB OLARAK AKTAR*/
show_on_page(callback);

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",yourUrl,false);
  Httpreq.send(null);
  return Httpreq.responseText;          
}

function show_on_page(callback){
  parsed = JSON.parse(callback);
  nav = document.getElementById("mySidebar");
  for (i in parsed){
    //EGER DOSYALAR GOSTERILMEYECEKSE FAKAT LINK DOSYAYA AITSE ATLA
    if(showfiles=="false" && (parsed[i].name).includes(".")){
    }else {
      btn = document.createElement("a");
      btn.setAttribute("onclick","show_in_iframe(this,'"+github_page_url + parsed[i].name+"')");
      btn.setAttribute("class", "w3-bar-item w3-button w3-padding-large w3-hover-black menu");
      btn.innerText=parsed[i].name;
      nav.appendChild(btn);
    }

  }
}


/*NAVBAR ICINDEKI TABLARA BASILDIGINDA CAGIRILAN FONKSIYON*/
function show_in_iframe(elm,url){
  /*BASILAN BUTON STILINI DEGISTIR*/
  try{
    document.getElementsByClassName("w3-black")[0].classList.remove("w3-black");

  }catch(error){

  }
      elm.classList.add("w3-black");
  /*ILGILI SAYFAYI IFRAMEDE GOSTER*/
  /*document.getElementById("welcome").style.display="none";*/
  document.getElementById("iframe").style.display="block";
  document.getElementById("iframe").src= url;
  resize();
  //$("#main").load(url);
  //document.getElementById("iframe").setAttribute("srcdoc", Get(url));
}

function resize(){
       // Selecting the iframe element
       var frame = document.getElementById("iframe");
          
       // Adjusting the iframe height onload event
       frame.onload = function()
       // function execute while load the iframe
       {
         // set the height of the iframe as 
         // the height of the iframe content
         frame.style.height = 
         frame.contentWindow.document.body.scrollHeight + 100 + 'px';
             
       }
}