const menu_button = document.getElementById("bar")
const menu = document.getElementById("side_nav_bar")

const side_nav_list = document.querySelectorAll("ul")
const content = document.getElementById("info_content")
// const del_nav = document.getElementById("del_icon")

init()
function init(){
    menu_button.addEventListener("click",()=>{
        menu.style.width = "200px"
    })
    // del_nav.addEventListener("click",()=>{
    //     menu.style.width = "0px"
    // })
    menu.onmouseleave = ()=>{
        menu.style.width = "0px"
    }
    // menu_button.addEventListener("click",()=>{
    //     // menu.setAttribute("class","active")
    //     menu_button.classList.toggle("active")
    //     menu.classList.toggle("active")
    // })
    // document.onclick = (clickEvent)=>{
    //     if(clickEvent.target.id !== "side_nav_bar"){
    //         menu.classList.remove("active")
    //     }
    // }
    for(let i=0; i<side_nav_list.length; i++){
        side_nav_list[i].addEventListener("click",()=>{
            api_call(side_nav_list[i].innerHTML)
        })
    }
    api_call()  
}
async function api_call(data){
    if(data!=null){
        const get_data = await fetch(`https://www.newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2F${data}%22%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%7D%7D&resultType=articles&articlesSortBy=date&articlesCount=100&articleBodyLen=-1&apiKey=a6dfd44e-ea73-4f19-a4f9-d2a03e44b832`)
        const text_data = await get_data.text()
        const res_string = JSON.parse(text_data)
        rendering_data(res_string)
    }else{
        const get_data = await fetch(`https://www.newsapi.ai/api/v1/article/getArticles?query=%7B%22%24query%22%3A%7B%22%24and%22%3A%5B%7B%22conceptUri%22%3A%22http%3A%2F%2Fen.wikipedia.org%2Fwiki%2FNews_media%22%7D%2C%7B%22lang%22%3A%22eng%22%7D%5D%7D%2C%22%24filter%22%3A%7B%22forceMaxDataTimeWindow%22%3A%2231%22%7D%7D&resultType=articles&articlesSortBy=date&articlesCount=100&articleBodyLen=-1&apiKey=a6dfd44e-ea73-4f19-a4f9-d2a03e44b832`)
        const text_data = await get_data.text()
        const res_string = JSON.parse(text_data)
        rendering_data(res_string)
    }
}
function rendering_data(api_data){
    let html = ""
    for(let i=0; i<api_data.articles.results.length; i++){
        html += `
        <div id="content">
           <div id="image_div">
            <img style="width: 275px; height = auto" src="${api_data.articles.results[i].image}">
        </div>
        <div id="content_div" style="margin: 8px 10px;">
            <div id="heading">${api_data.articles.results[i].title}</div>  

            <div id="author_time">
                <span style="font-weight: bold; color: grey;"><a id="link_1" href="${api_data.articles.results[i].url}">short</a></span>
                
                <span style="color: rgb(149, 146, 146);"> ${api_data.articles.results[i].source.title}/ ${api_data.articles.results[i].date}${api_data.articles.results[i].time}</span>
            </div>

            <div id="description">${api_data.articles.results[i].body.slice(0,400)}...</div>

            <div id="new_info_link">
            <span>Readmore at<span> 
            <span style="font-weight: bold;"><a id="link" href="${api_data.articles.results[i].url}">${api_data.articles.results[i].source.uri}</a></span></div>
            </div>
        </div>`
    }
    content.innerHTML = html
}
