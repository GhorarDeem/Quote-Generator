let apiQuotes = [];

// Show new Quote

function newQuote() {
    // pick random quotes

    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    console.log(quote); 
}

// Get QUOTES from API

async function getQuotes() {
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

// ON Load

getQuotes();