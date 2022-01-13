let tweetNow = document.getElementById('tweetNow')

// Tweets On click Tweet Button
const tweet = ()=>{
    let Author = document.getElementById('Author')
    let quotes = document.getElementById('Quotes')

    let tweetPost = `https://twitter.com/intent/tweet/?text= ${quotes.innerHTML} - ${Author.innerHTML}`
    window.open(tweetPost)     // Window.open(path) is used to open new tab/window in browser
}


// onClick calling tweet function, which is posting tweet on tweeter
tweetNow.addEventListener('click', tweet)
