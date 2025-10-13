document.addEventListener('DOMContentLoaded', function() {
    const surgeList = document.getElementById('surge-list');
    const rollButton = document.getElementById('roll');
    const rollCount = document.getElementById('roll-count');
    const rollValue = document.getElementById('roll-value');
    const instructions = document.getElementById('instructions');

    let surges = [];

    const durations = [
    "10d100 hours have passed",
    "1d4 turns have passed per level of the caster",
    "They have attained fluency in 1d4 additional languages",
    "They have attained fluency in one additional language",
    "They have been awarded a title by royalty",
    "They have been branded with a hot iron like a bull",
    "They have been formally pardoned by the king",
    "They have been reduced to one hit point",
    "They have been resurrected",
    "They have been stabbed by a silver weapon",
    "They have been tried and imprisoned for heresy",
    "They have bested 10d10 warriors in single combat",
    "They have bought a hugely expensive home and burned it down",
    "They have broken every finger on one of their hands",
    "They have built 2d10 snowmen",
    "They have burned down their current home",
    "They have burned themself for 2d20 total hit points of fire damage",
    "They have carried a gallon of water from the sea to this spot",
    "They have carried a stone from this spot to the sea",
    "They have carved their full name in 10d10 different trees",
    "They have circumnavigated the globe without using magic to do so",
    "They have composed 3d4 sonnets",
    "They have cut off 1d4 fingers",
    "They have cut off their own ear",
    "They have destroyed every book that they own",
    "They have destroyed every table within 1d4 miles",
    "They have destroyed their most prized possession",
    "They have dug a functioning and productive well on this spot",
    "They have eaten 1,000 gold pieces worth of gold",
    "They have eaten 1d4 pounds of soil",
    "They have eaten 1d4× their weight in squirrels",
    "They have eaten 2d6 pounds of cured leather",
    "They have eaten an entire, live chicken",
    "They have extracted 1d4 of their own teeth",
    "They have felled 3d6 trees older than they are",
    "They have forged a sword from meteoric iron",
    "They have found a lost city hidden in the desert",
    "They have founded a cult",
    "They have gained a level",
    "They have gone 10d10 days and nights without speaking",
    "They have gone 1d4 weeks without exposure to direct sunlight",
    "They have gone one full month without using magic or any magic items",
    "They have had a personal audience with 1d6 different deities",
    "They have hand-carved a marble statue of themself",
    "They have hidden a cursed ruby beneath a tall mountain",
    "They have imbibed 1d4 pints of lamp oil",
    "They have imbibed 1d8 pints of their own blood",
    "They have located and destroyed an artifact",
    "They have lost a level",
    "They have lost a total of 3d10 hit points due to burns from acid",
    "They have lost a total of 3d10 hit points due to electrical damage",
    "They have manually unearthed a diamond larger than their head",
    "They have married",
    "They have married, divorced, and remarried 1d4 times",
    "They have produced an heir",
    "They have razed the nearest wooden structure",
    "They have remained awake for 4d6 consecutive days and nights",
    "They have restored the nearest undead creature to life",
    "They have retrieved a particular gold coin from the bottom of the sea",
    "They have rid themself of all magic items",
    "They have rid the nearest town of mice and rats",
    "They have rolled less than their weight on 1d1000, one attempt per day",
    "They have rolled less than their Wisdom on 1d100, one attempt per day",
    "They have scaled the tallest mountain on the continent",
    "They have sharpened every blade within 1d10 miles",
    "They have shaved their head completely bald",
    "They have shed 2d10 pounds",
    "They have single-handedly dammed the nearest river",
    "They have slain 1d10 undead",
    "They have slain 1d6 kings",
    "They have spent 1,000,000 gold pieces with nothing to show for it",
    "They have spent 1d4 days and nights at the bottom of a deep well",
    "They have spent a night in a sty with at least 3d10 pigs",
    "They have spent a night in each of 2d6 dragons’ lairs",
    "They have spent an entire night at the bottom of a lake",
    "They have spent an entire night naked and unprotected in snow",
    "They have spent an entire night sealed in a barrel",
    "They have spent an entire night up to their neck in offal",
    "They have stabbed themself with a weapon that they forged",
    "They have swallowed 4d10 gallons of water",
    "They have swallowed a pint of molten lead",
    "They have tattooed 10d100 cryptic runes on their skin",
    "They have thwarted an assassination attempt against the king",
    "They have triggered 1d4 additional wild surges",
    "They have visited both of the world’s magnetic poles",
    "They have waded along the shores of 1d4 oceans",
    "They have walked 10d100 miles",
    "They have walked on the floor of the ocean",
    "They have walked on the surface of the moon",
    "They have walked the shores of hell",
    "They have woven a six foot length of rope from their own hair",
    "They have written their full name in 10d10 different books",
    "They unearth 1d4 pounds of gold",
    "Their next birthday",
    "Their child produces an heir",
    "One year and one day have passed",
    "The current king has died",
    "The next total lunar eclipse occurs",
    "They have performed an exorcism on a member of the royal family",
    "They have been bitten by 1d6 different lycanthropes"
    ];
 
    //parser, not adding 10k lines to a code
    async function loadSurges() {
        try {
            const response = await fetch('https://qwikster.github.io/surge/wildMagic.txt');

            if (!response.ok) { throw new Error(`Could not load wildMagic.txt (${response.status})`) }

            const text = await response.text();
            const lines = text.split('\n');
            
            surges = lines.map(line => {
                //whitespaces, empty lines
                line = line.replace(/\r$/, '').trim();
                if (!line) return null;

                const first_space = line.indexOf(' ');

                if (first_space === -1) {
                    console.warn('parse issue: ', line);
                    return null;
                }

                const id = line.substring(0, first_space).trim();
                const surge_text = line.substring(first_space + 1).trim();
                
                // god i hate regex
                if (!/^\d{4}$/.test(id)) {
                    console.warn('broken id:', id);
                    return null;
                }

                return {
                    id: `#${id}`,
                    surge: surge_text
                };
            }).filter(surge => surge !== null); //remove nulls from whitespace strings
        
        if (surges.length === 0) {
            throw new Error('surge list is empty, failed to load in a weird way?');
        }

        console.log(`loaded all ${surges.length} surges`);
        } catch (error) {
            console.error('error loading surges: ', error);
            surges = [{id: '#0000', surge: 'ERROR, CHECK JS CONSOLE'}];
        }

        console.log(surges);
    }

    rollCount.addEventListener('input', function() {
        rollValue.textContent = this.value;
    });

    function getSurge() {
        return surges[Math.floor(Math.random() * surges.length)];
    }

    function getDuration() {
        return durations[Math.floor(Math.random() * durations.length)];
    }

    function makeSurge() {
        const surge = getSurge();
        const duration = getDuration();
        const surgeDiv = document.createElement('div');
        
        surgeDiv.className = 'surge sliding-in';
        surgeDiv.innerHTML = `
            <div class="surge-result">
                <span class="surge-num">${surge.id}</span>
                <div class="surge-text">${surge.surge}</div>
            </div>
            <div class="surge-time">
                <button class="reroll">Reroll</button>
                <div class="time"><b>Until: </b>${duration}</div>
            </div>
        `;
        const rerollButton = surgeDiv.querySelector('.reroll');
        rerollButton.addEventListener('click', function() { //wish it was this easy in python
            const newDuration = getDuration();
            const timeElement = surgeDiv.querySelector('.time');
            timeElement.innerHTML = `<b>Until: </b>${newDuration}`;
        });

        setTimeout(() => {
            surgeDiv.classList.remove('sliding-in');
        }, 500);

        return surgeDiv;
    }

    function killSurges() {
        const surgenodes = surgeList.querySelectorAll('.surge');
        if (surgenodes.length == 0) { return Promise.resolve() }

        return new Promise(resolve => {
            let removed = 0;
            
            surgenodes.forEach(surge => {
                surge.classList.add('sliding-out');
                surge.addEventListener('animationend', function()
                {
                    surge.remove();
                    removed++;
                    
                    if (removed === surgenodes.length) {
                        resolve();
                    }
                }, {once: true }); //HELL
            });
        });
    }
    // no more hell :)
    rollButton.addEventListener('click', async function() {
        if (instructions) { // WHY IS THE OPERATOR DIFFERENT
            instructions.classList.add('sliding-out');
        }
        setTimeout(click, 400);
    });

    function click() {
        killSurges();
        instructions.remove()

        const count = parseInt(rollCount.value);
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                const surgeElement = makeSurge();
                surgeList.appendChild(surgeElement);
            }, i * 100);
        }
    };

    loadSurges();
});