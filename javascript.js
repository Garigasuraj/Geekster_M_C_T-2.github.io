const news_body =  document.getElementById("body")
const menu_button = document.getElementById("bar")
const menu = document.getElementById("side_nav_bar")

const side_nav_list = document.querySelectorAll("ul")
const content = document.getElementById("info_content")
const del_nav = document.getElementById("del_icon")

init()
function init(){
    menu_button.addEventListener("click",()=>{
        menu.style.width = "200px"
    })
    del_nav.addEventListener("click",()=>{
        menu.style.width = "0px"
    })
    for(let i=0; i<side_nav_list.length; i++){
        side_nav_list[i].addEventListener("click",()=>{
            api_call(side_nav_list[i].innerHTML)
        })
    }
    api_call()
}
async function api_call(data){
    if(data!=null){
        const get_data = await fetch(`
        https://newsapi.org/v2/everything?q=${data}&from=2023-02-09&too=2023-02-09&sortBy=popularity&apiKey=95c60c7edab840ecb918de6fd099d0b9`)
        const text_data = await get_data.text()
        const res_string = JSON.parse(text_data)
        rendering_data(res_string)
    }else{
        const get_data = await fetch(`
        https://newsapi.org/v2/everything?q=general&from=2023-02-09&too=2023-02-09&sortBy=popularity&apiKey=95c60c7edab840ecb918de6fd099d0b9`)
        const text_data = await get_data.text()
        const res_string = JSON.parse(text_data)
        rendering_data(res_string)
    }
}
function rendering_data(api_data){
    let html = ""
    for(let i=0; i<api_data.articles.length; i++){
        html += `
        <div id="content">
           <div id="image_div">
            <img style="width: 275px; height = auto" src="${api_data.articles[i].urlToImage}">
        </div>
        <div id="content_div" style="margin: 8px 10px;">
            <div id="heading">${api_data.articles[i].title}</div>  

            <div id="author_time">
                <span style="font-weight: bold; color: grey;"><a id="link_1" href="${api_data.articles[i].url}">short</a></span>
                
                <span style="color: rgb(149, 146, 146);"> ${api_data.articles[i].author} / ${api_data.articles[i].publishedAt}</span>
            </div>

            <div id="description">${api_data.articles[i].description}</div>

            <div id="new_info_link">
            Readmore at 
            <span style="font-weight: bold;"><a id="link" href="${api_data.articles[i].url}">${api_data.articles[i].source.name}</a></span></div>
            </div>
        </div>`
    }
    content.innerHTML = html
}