import { useState } from 'react'

const Quote = () => {

    const quote_list = [
        { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { quote: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
        { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
        { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { quote: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky" },
        { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau" },
        { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { quote: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Anonymous" },
        { quote: "Dream big and dare to fail.", author: "Norman Vaughan" },
        { quote: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
        { quote: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", author: "Roy T. Bennett" },
        { quote: "Act as if what you do makes a difference. It does.", author: "William James" },
        { quote: "Keep your face always toward the sunshine—and shadows will fall behind you.", author: "Walt Whitman" },
        { quote: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
        { quote: "It always seems impossible until it's done.", author: "Nelson Mandela" },
        { quote: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
        { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { quote: "You don’t have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
        { quote: "Life is 10% what happens to us and 90% how we react to it.", author: "Charles R. Swindoll" },
        { quote: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt" },
        { quote: "The only way to achieve the impossible is to believe it is possible.", author: "Charles Kingsleigh" },
        { quote: "If opportunity doesn't knock, build a door.", author: "Milton Berle" },
        { quote: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.", author: "Albert Schweitzer" },
        { quote: "Hardships often prepare ordinary people for an extraordinary destiny.", author: "C.S. Lewis" },
        { quote: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
        { quote: "The only place where success comes before work is in the dictionary.", author: "Vidal Sassoon" },
        { quote: "Failure is the condiment that gives success its flavor.", author: "Truman Capote" },
        { quote: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
        { quote: "The best revenge is massive success.", author: "Frank Sinatra" },
        { quote: "The journey of a thousand miles begins with one step.", author: "Lao Tzu" },
        { quote: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar" },
        { quote: "The biggest risk is not taking any risk.", author: "Mark Zuckerberg" },
        { quote: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill" },
        { quote: "In the end, we only regret the chances we didn't take.", author: "Lewis Carroll" },
        { quote: "Success is not how high you have climbed, but how you make a positive difference to the world.", author: "Roy T. Bennett" },
        { quote: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
        { quote: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
        { quote: "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.", author: "Jamie Paolinetti" },
        { quote: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Elliot" },
        { quote: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { quote: "The difference between ordinary and extraordinary is that little extra.", author: "Jimmy Johnson" },
        { quote: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Ryun" },
        { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
        { quote: "To see what is right and not do it is a lack of courage.", author: "Confucius" },
        { quote: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
        { quote: "You are never too old to set another goal or to dream a new dream.", author: "Les Brown" },
        { quote: "We become what we think about.", author: "Earl Nightingale" }       
    ];   

    const [quote, setQuote] = useState(
        { 
            quote: "The only person you are destined to become is the person you decide to be.", 
            author: "Ralph Waldo Emerson" 
        }
    )

    const changeQuote = () => {
        let quote_list_length = quote_list.length

        const randomNumber = Math.floor(Math.random() * quote_list_length);

        return setQuote(quote_list[randomNumber])
    }

    return (
        <div>
            <p>
                "{quote.quote}"
                <br />
                - {quote.author} -
            </p>
            <button onClick={changeQuote}>Change Quote</button>
        </div>
    )
}

export default Quote