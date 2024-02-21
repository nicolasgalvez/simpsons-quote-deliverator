import React, {useEffect, useState} from 'react';

// Define a TypeScript interface for the select options
interface CharacterOption {
    label: string;
    value: string;
}

// Define a TypeScript interface for the quote data
interface QuoteData {
    quote: string;
    character: string;
    image: string;
    characterDirection: string;
}

// Define your characters
// Note that Maggie has no quotes. I never realized that!
// Instead, I'll substitute an easter egg object when no quotes are found.
// Ideally, we would just remove the option from the select list. But I thought it was interesting.
// And normally I would not make the fetch at all for Maggie if she had to be on the list to save bandwidth and phone resources.
const characters: CharacterOption[] = [
    {label: 'Homer', value: 'Homer'},
    {label: 'Marge', value: 'Marge'},
    {label: 'Bart', value: 'Bart'},
    {label: 'Lisa', value: 'Lisa'},
    {label: 'Moe', value: 'Moe'},
    {label: 'Ralph', value: 'Ralph'},
    {label: 'Maggie', value: 'Maggie'},
];

// Easter egg data to be used when no data is fetched
const easterEggData: QuoteData[] = [
    {
        quote: "Baptize your Baby at Mount Splashmore!",
        character: 'Christlist.org',
        image: 'https://static.simpsonswiki.com/images/thumb/8/87/Christlist.png/500px-Christlist.png',
        characterDirection: 'Right',
    },
    {
        quote: "The Deliverator's car has enough potential energy packed into its batteries to fire a pound of bacon into the Asteroid Belt.",
        character: 'Neal Stephenson, Snow Crash',
        image: 'https://media.wired.com/photos/593252a1edfced5820d0fa07/master/w_2560%2Cc_limit/the-homer-inline4.jpg',
        characterDirection: 'Right',
    },
];

const SimpsonsQuote: React.FC = () => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');
    const [quotes, setQuotes] = useState<QuoteData[]>([]);
    const [fadeIn, setFadeIn] = useState<boolean>(false);

    const fetchQuotes = async () => {
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${selectedCharacter}`);
        const data: QuoteData[] = await response.json();
        setFadeIn(false); // Reset animation state
        if (data.length === 0) {
            // Select a random quote from the easter egg data
            const randomIndex = Math.floor(Math.random() * easterEggData.length);
            setQuotes([easterEggData[randomIndex]]);
        } else {
            setQuotes(data);
        }
        setFadeIn(true); // Trigger fade-in animation
    };

    // Use useEffect to reset the fade-in effect when quotes change
    useEffect(() => {
        if (quotes.length > 0) {
            setFadeIn(true);
        }
    }, [quotes]);

    return (
        <div>
            <label htmlFor="character-select">Select a Character:</label> {/* Accessible label */}
            <select id="character-select" value={selectedCharacter}
                    onChange={(e) => setSelectedCharacter(e.target.value)} aria-label="Simpsons Characters">
                <option value="">Select a Character</option>
                {characters.map((character) => (
                    <option key={character.value} value={character.value}>
                        {character.label}
                    </option>
                ))}
            </select>
            <button onClick={fetchQuotes}>Get Quotes</button>
            <div className={fadeIn ? 'fade-in' : ''} role="region" aria-live="polite"> {/* ARIA role and live region */}
                {quotes.map((quote, index) => (
                    <div key={index} style={{marginBottom: '20px'}}>
                        {quote.image && (
                            <img src={quote.image} alt={`${quote.character}`} style={{
                                maxHeight: '200px',
                                direction: quote.characterDirection === 'Right' ? 'rtl' : 'ltr'
                            }}/>
                        )}
                        <p>{quote.quote}</p>
                        <p>- {quote.character}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimpsonsQuote;
