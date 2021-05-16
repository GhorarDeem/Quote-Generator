const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const facebookBtn = document.getElementById('facebook');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading Spinner

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden)
    {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get QUOTES from API

async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = 'https://type.fit/api/quotes';
    
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[10]);
        newQuote();

    } catch(error) {
        console.log(error);
        // alert(error);
        // Catch ERROR here
    }
}

// Show new Quote

function newQuote() {
    showLoadingSpinner();

    // pick random quotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote); 
    // quoteAuthor.textContent = quote.author; 
    // quoteText.textContent = quote.text;
    
    // Check if the 'Author' field is blank and replace it with "Unknown"
    if(!quote.author)
    {
        quoteAuthor.innerText = "Unknown";
    } else {
        quoteAuthor.innerText = quote.author;
    }
    
    // Check the Quote length to determine the styling
    if (quote.text.length > 70) 
    {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote.text;   
    hideLoadingSpinner();

    console.log('new Quote generated');

}


// Tweet a quote

function tweetQuote() {
    const twetterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
    window.open(twetterUrl, '_blank');
    
    console.log('Tweet quote option selected');
}

// Share on Facebook

function fbQuote() {
    const facebookUrl = `https://www.facebook.com/dialog/share?text=${quoteText.innerText} - ${quoteAuthor.innerText}`;
    window.open(facebookUrl, '_blank');

    console.log('Facebook Share option selected');

}

// Event listeners

newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);
facebookBtn.addEventListener('click',fbQuote);


// ON Load

getQuotes();
// loading();
// complete();