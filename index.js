console.log('Welcome to News Website');

newsAccordion = document.getElementById('newsAccordion');  

let apiKey = '076cab3284c6405b9b653fc5c426d1a0';
let source = 'the-times-of-india';

const xhr = new XMLHttpRequest();
xhr.open('GET', `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${apiKey}`, true);
// xhr.open('GET', `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`, true);
xhr.getResponseHeader('Content-type', 'application/json');

xhr.onload = function(){
    if(this.status === 200){
        json = JSON.parse(this.responseText);
        let articles = json.articles;
        console.log(articles);
        let newsHtml = '';
        articles.forEach(function(element, index) {
            console.log(element, index);
            let news = `
                          <div class="card">
                             <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                <button class="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            
                              <b>Breaking News ${index+1}: </b> ${element['title']}
                                </button>
                                </h2>
                            </div>
                      
                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                            <div class="card-body">
                         
                             ${element["content"]}  <a href="${element['url']}" target="_blank">Read more here</a>
                            </div>
                            </div>
                         </div>`;
            newsHtml += news;
        });

        newsAccordion.innerHTML = newsHtml;


    }
    else{
        console.log("Some Error Occured");
    }
}

xhr.send();
