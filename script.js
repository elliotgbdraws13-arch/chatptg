// Jokes list
const jokes = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a fake noodle? An impasta!",
    "Why did the cookie go to the doctor? Because it felt crumbly!",
    "What do you call a bear with no teeth? A gummy bear!",
    "Why did the math book look sad? Because it had too many problems!",
    "What's orange and sounds like a parrot? A carrot!",
    "Why don't skeletons fight each other? They don't have the guts!",
    "What did the ocean say to the beach? Nothing, it just waved!",
    "Why is a computer cold? It left its Windows open!",
    "What do you call a sleeping bull? A dozer!",
    "Why did the chicken go to school? To get smarter!",
    "What's the best thing about Switzerland? I don't know, but the flag is a big plus!",
    "Why did the student do multiplication problems on the floor? The teacher told them not to use tables!"
];

// Facts list
const facts = [
    "A group of flamingos is called a 'flamboyance'!",
    "Honey never spoils. Archaeologists have found 3000-year-old honey that was still edible!",
    "A octopus has three hearts!",
    "Bananas are berries, but strawberries aren't!",
    "Cleopatra lived closer to the invention of the iPhone than to the building of the Great Pyramid!",
    "A day on Venus is longer than a year on Venus!",
    "Dolphins have names for each other!",
    "A jiffy is an actual unit of time (1/100th of a second)!",
    "Your nose can remember 50,000 different smells!",
    "Slime eels tie themselves in a knot to escape predators!"
];

// Quotes list
const quotes = [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Innovation distinguishes between a leader and a follower. - Steve Jobs",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
    "It is during our darkest moments that we must focus to see the light. - Aristotle",
    "The only impossible journey is the one you never begin. - Tony Robbins",
    "Success is not final, failure is not fatal. - Winston Churchill",
    "Believe you can and you're halfway there. - Theodore Roosevelt"
];

// Riddles list
const riddles = [
    { q: "What has hands but can't clap?", a: "A clock" },
    { q: "I speak without a mouth and hear without ears. What am I?", a: "An echo" },
    { q: "The more you take, the more you leave behind. What am I?", a: "Footsteps" },
    { q: "What gets wet while drying?", a: "A towel" },
    { q: "What has a head and a tail but no body?", a: "A coin" },
    { q: "I have cities, but no houses. What am I?", a: "A map" }
];

// Compliments list
const compliments = [
    "You're an awesome person!",
    "You have impeccable manners!",
    "You're a great listener!",
    "You're incredibly thoughtful!",
    "Your perspective is refreshing!",
    "You light up the room!",
    "You're a gift to those around you!",
    "You bring out the best in other people!",
    "You're a smart cookie!",
    "You're even more beautiful on the inside than on the outside!"
];

// Tongue Twisters
const tongueTwisters = [
    "She sells seashells by the seashore!",
    "How much wood would a woodchuck chuck if a woodchuck could chuck wood?",
    "Peter Piper picked a peck of pickled peppers!",
    "The lips, the teeth, the tip of the tongue!",
    "Six slippery slender snakes slowly sliding south!"
];

// Trivia Questions
const trivia = [
    { q: "What is the capital of France?", a: "Paris" },
    { q: "What is the largest planet in our solar system?", a: "Jupiter" },
    { q: "In what year did the Titanic sink?", a: "1912" },
    { q: "What is the smallest country in the world?", a: "Vatican City" },
    { q: "What is the highest mountain in the world?", a: "Mount Everest" }
];

// DOM Elements
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const messagesDiv = document.getElementById('messages');

// Event Listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const input = userInput.value.trim();
    if (input === '') return;

    // Display user message
    addMessage(input, 'user');
    userInput.value = '';

    // Get AI response
    const response = getResponse(input);
    setTimeout(() => {
        addMessage(response, 'bot');
    }, 500);
}

function setSuggestion(text) {
    userInput.value = text;
    sendMessage();
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    const p = document.createElement('p');
    p.textContent = text;
    
    messageDiv.appendChild(p);
    messagesDiv.appendChild(messageDiv);
    
    // Scroll to bottom
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function getResponse(input) {
    const lowerInput = input.toLowerCase();

    // 1. Joke
    if (lowerInput.includes('joke') || lowerInput.includes('tell me a joke')) {
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // 2. Dice Roll
    if (lowerInput.includes('roll') && lowerInput.includes('dice')) {
        const roll = Math.floor(Math.random() * 6) + 1;
        return `🎲 You rolled a ${roll}!`;
    }

    // 3. Coin Flip
    if (lowerInput.includes('flip') && lowerInput.includes('coin')) {
        const flip = Math.random() > 0.5 ? 'Heads' : 'Tails';
        return `🪙 ${flip}!`;
    }

    // 4. Math Equation (simple calculator)
    if (lowerInput.includes('what is') && /[\d+\-*/()]/.test(lowerInput)) {
        try {
            const mathPart = lowerInput.replace('what is', '').replace('?', '').trim();
            const result = eval(mathPart);
            return `The answer is: ${result}`;
        } catch (e) {
            return "I couldn't calculate that. Try asking something like 'What is 10 + 5?'";
        }
    }

    // 5. Random Quote
    if (lowerInput.includes('quote') || lowerInput.includes('inspire')) {
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    // 6. Rock Paper Scissors
    if (lowerInput.includes('rock') || lowerInput.includes('paper') || lowerInput.includes('scissors')) {
        const choices = ['rock', 'paper', 'scissors'];
        const botChoice = choices[Math.floor(Math.random() * choices.length)];
        
        if (lowerInput.includes('rock') && botChoice === 'scissors') return `I chose scissors. You win! 🎉`;
        if (lowerInput.includes('paper') && botChoice === 'rock') return `I chose rock. You win! 🎉`;
        if (lowerInput.includes('scissors') && botChoice === 'paper') return `I chose paper. You win! 🎉`;
        
        const userChoice = lowerInput.includes('rock') ? 'rock' : lowerInput.includes('paper') ? 'paper' : 'scissors';
        if (userChoice === botChoice) return `I chose ${botChoice}. It's a tie! 🤝`;
        return `I chose ${botChoice}. I win! 😄`;
    }

    // 7. Random Fact
    if (lowerInput.includes('fact') || lowerInput.includes('tell me a fact')) {
        return facts[Math.floor(Math.random() * facts.length)];
    }

    // 8. Random Number Generator
    if (lowerInput.includes('random number')) {
        const num = Math.floor(Math.random() * 100) + 1;
        return `Your random number is: ${num}`;
    }

    // 9. Magic 8-Ball
    if (lowerInput.includes('8-ball') || (lowerInput.includes('will i') || lowerInput.includes('should i') || lowerInput.includes('can i'))) {
        const responses = ['Yes', 'No', 'Maybe', 'Ask again later', 'Absolutely', 'Definitely not', 'Very likely', 'Unlikely'];
        return `🔮 ${responses[Math.floor(Math.random() * responses.length)]}`;
    }

    // 10. Palindrome Checker
    if (lowerInput.includes('palindrome')) {
        const word = lowerInput.replace('is', '').replace('palindrome', '').replace(/[?]/g, '').trim();
        const reversed = word.split('').reverse().join('');
        if (word === reversed && word.length > 0) {
            return `Yes! "${word}" is a palindrome!`;
        }
        return `No, "${word}" is not a palindrome.`;
    }

    // 11. Riddle
    if (lowerInput.includes('riddle') || lowerInput.includes('tell me a riddle')) {
        const riddle = riddles[Math.floor(Math.random() * riddles.length)];
        return `🧩 ${riddle.q}\n(Answer: ${riddle.a})`;
    }

    // 12. Temperature Converter (C to F)
    if (lowerInput.includes('temperature') || lowerInput.includes('celsius') || lowerInput.includes('fahrenheit')) {
        const match = lowerInput.match(/(\d+)/);
        if (match) {
            const celsius = parseInt(match[0]);
            const fahrenheit = (celsius * 9/5) + 32;
            return `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
        }
        return "Please provide a temperature like 'Convert 25 celsius'";
    }

    // 13. Current Date and Time
    if (lowerInput.includes('date') || lowerInput.includes('time') || lowerInput.includes('what time')) {
        const now = new Date();
        return `📅 ${now.toLocaleString()}`;
    }

    // 14. Word Counter
    if (lowerInput.includes('count') && lowerInput.includes('word')) {
        const text = lowerInput.replace('count', '').replace('words', '').replace('word', '').replace(/[?]/g, '').trim();
        const count = text.split(/\s+/).filter(w => w.length > 0).length;
        return `That phrase has ${count} words.`;
    }

    // 15. Compliment Generator
    if (lowerInput.includes('compliment') || lowerInput.includes('compliment me')) {
        return compliments[Math.floor(Math.random() * compliments.length)];
    }

    // 16. Tongue Twister
    if (lowerInput.includes('tongue twister')) {
        return tongueTwisters[Math.floor(Math.random() * tongueTwisters.length)];
    }

    // 17. Tip Calculator
    if (lowerInput.includes('tip') || lowerInput.includes('calculate tip')) {
        const match = lowerInput.match(/(\d+)/);
        if (match) {
            const amount = parseInt(match[0]);
            const tip15 = (amount * 0.15).toFixed(2);
            const tip20 = (amount * 0.20).toFixed(2);
            return `15% tip: $${tip15}\n20% tip: $${tip20}`;
        }
        return "Please provide an amount like 'Calculate tip for 50'";
    }

    // 18. Unit Converter (Miles to KM)
    if (lowerInput.includes('convert') && (lowerInput.includes('mile') || lowerInput.includes('km'))) {
        const match = lowerInput.match(/(\d+)/);
        if (match) {
            const miles = parseInt(match[0]);
            const km = (miles * 1.60934).toFixed(2);
            return `${miles} miles = ${km} km`;
        }
        return "Please provide a distance like 'Convert 10 miles'";
    }

    // 19. Password Strength Checker
    if (lowerInput.includes('password')) {
        const passwordMatch = lowerInput.match(/password[:\s]+(\S+)/i);
        if (passwordMatch) {
            const password = passwordMatch[1];
            let strength = 'Weak';
            if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                strength = 'Strong';
            } else if (password.length >= 6) {
                strength = 'Medium';
            }
            return `Password strength: ${strength} 🔐`;
        }
        return "Please provide a password to check like 'Check password: MyPass123'";
    }

    // 20. Fun Number Facts
    if (lowerInput.includes('number fact')) {
        const numberFacts = [
            "42 is the answer to life, the universe, and everything!",
            "13 is considered unlucky in many Western cultures.",
            "7 is often considered a lucky number!",
            "0 is the only number that has multiple names: zero, naught, nil, nada!",
            "The number 4 is unlucky in some Asian cultures."
        ];
        return numberFacts[Math.floor(Math.random() * numberFacts.length)];
    }

    // 21. Trivia
    if (lowerInput.includes('trivia')) {
        const q = trivia[Math.floor(Math.random() * trivia.length)];
        return `🧠 ${q.q}\n(Answer: ${q.a})`;
    }

    // 22. Help/What can you do
    if (lowerInput.includes('help') || lowerInput.includes('what can you do') || lowerInput.includes('capabilities')) {
        return `I can help with:\n• Tell jokes\n• Solve math equations\n• Roll dice or flip coins\n• Play rock, paper, scissors\n• Generate quotes & facts\n• Trivia questions\n• Riddles\n• Check palindromes\n• Temperature converter\n• Word counter\n• Password strength checker\n• And much more!`;
    }

    // 23. Name and greeting
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        return `Hey there! 👋 Great to see you! How can I help you today?`;
    }

    if (lowerInput.includes("what's your name") || lowerInput.includes("who are you")) {
        return `I'm ChatPTG, your personal AI assistant! Nice to meet you! 😊`;
    }

    // Default response
    return "I'm not sure about that. Try asking me for a joke, math problem, or type 'What can you do?' for more options!";
}
