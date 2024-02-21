import React from 'react';
import './App.css';
import SimpsonsQuote from './SimpsonsQuote';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Simpson's Quote Deliverator</h1>

            </header>

            <main>
                <p>
                    This is an app that allows you to select a Simpson's character and get a quote from them.

                    https://thesimpsonsquoteapi.glitch.me/
                </p>
                <SimpsonsQuote/>
            </main>
            <footer>
                <p>Created by: <a href="https://www.linkedin.com/in/nickgalvez/">Nick Galvez</a></p>
            </footer>
        </div>
    );
}

export default App;
