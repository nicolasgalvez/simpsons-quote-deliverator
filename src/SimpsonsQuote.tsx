import React, { useState } from 'react';

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
const characters: CharacterOption[] = [
    { label: 'Homer', value: 'Homer' },
    { label: 'Marge', value: 'Marge' },
    { label: 'Bart', value: 'Bart' },
    { label: 'Lisa', value: 'Lisa' },
    { label: 'Maggie', value: 'Maggie' },
];

const SimpsonsQuote: React.FC = () => {
    const [selectedCharacter, setSelectedCharacter] = useState<string>('');
    const [quotes, setQuotes] = useState<QuoteData[]>([]);

    const fetchQuotes = async () => {
        const response = await fetch(`https://thesimpsonsquoteapi.glitch.me/quotes?character=${selectedCharacter}`);
        const data: QuoteData[] = await response.json();
        setQuotes(data);
    };

    return (
        <div>
            <select value={selectedCharacter} onChange={(e) => setSelectedCharacter(e.target.value)}>
                <option value="">Select a Character</option>
                {characters.map((character) => (
                    <option key={character.value} value={character.value}>
                        {character.label}
                    </option>
                ))}
            </select>
            <button onClick={fetchQuotes}>Get Quotes</button>
            <div>
                {quotes.map((quote, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <p>{quote.quote}</p>
                        <p>Character: {quote.character}</p>
                        {quote.image && (
                            <img src={quote.image} alt={quote.character} style={{ maxWidth: '200px', direction: quote.characterDirection === 'Right' ? 'rtl' : 'ltr' }} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SimpsonsQuote;
