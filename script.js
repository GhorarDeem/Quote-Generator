const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading...

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading...

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}

// Get QUOTES from API

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[10]);
        newQuote();

    } catch(error) {
        console.error();
        // alert(error);
        // Catch ERROR here
    }
}

// Show new Quote

function newQuote() {
    loading();
    // pick random quotes

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote); 
    // quoteAuthor.textContent = quote.author; 
    // quoteText.textContent = quote.text;
    
    // Check if the 'Author' field is blank and replace it with "Unknown"
    if(!quote.author)
    {
        quoteAuthor.textContent = "Unknown";
    } else {
        quoteAuthor.textContent = quote.author;
    }
    
    // Check the Quote length to determine the styling
    if (quote.text.length > 70) 
    {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    // Set the Quote and Hide the Loader

    quoteText.textContent = quote.text;   
    complete();

    console.log('new Quote generated');

}


// Tweet a quote

function tweetQuote() {
    const twetterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twetterUrl, '_blank');
    
    console.log('Tweet quote option selected');
}

// Event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// ON Load

getQuotes();
// loading();
// complete();