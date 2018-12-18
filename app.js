
const apiKey = '160243f61fa945d3af487a42d701b3af';
const defaultSource = 'the-washington-post';
const newsArticles = document.querySelector('main');
const sourceSelector = document.querySelector('#sources');
const logs = document.querySelector('#logs');
const profile = document.querySelector('#profile');

if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/service-worker.js").then(registration => {
        console.log("Worker Installed");
        if (registration.installing) {
            registration.installing.postMessage("Howdy from your installing page.");
        }
    }, err => {
        console.error("Installing the worker failed!", err);
    });
}


window.addEventListener('load', async e => {
    updateNews();
    await updateNewsSources();
    sourceSelector.value = defaultSource;
    fetchLinkedinProfile('https://linkedin.com/mwlite/me', {mode: "no-cors"});

    sourceSelector.addEventListener('change', evt => {
        updateNews(evt.target.value);
    });
});


async function updateNewsSources() {
    const response = await fetch(`https://newsapi.org/v2/sources?apiKey=${apiKey}`);
    const json = await response.json();
    sourceSelector.innerHTML =
        json.sources.map(source => `<option value="${source.id}">${source.name}</option>`).join('\n');

}


async function updateNews(source = defaultSource) {
    newsArticles.innerHTML = '';
    const response = await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&sortBy=top&apiKey=${apiKey}`);
    const json = await response.json();
    newsArticles.innerHTML = json.articles.map(createArticle).join('\n');
}


function createArticle(article){
    // return
    return `<div class="article" style="font-size: 10px; margin-top: 50px"><a href="${article.url}"><h2>${article.title}</h2><img src="${article.urlToImage}" alt="${article.title}" style="display: none"></a></div>`;
}


async function fetchLinkedinProfile(profileUrl) {
    const profileResponse = await fetch(profileUrl, {mode: "no-cors"});
    const res = new Response();
    // profile.append(res.text().toString());
    profile.append(profileResponse.text().toString());
}
