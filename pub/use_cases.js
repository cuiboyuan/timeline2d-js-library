"use strict";

const viewCodes = document.querySelectorAll(".viewCode")

for (let button of viewCodes) {
    button.addEventListener('click', (e) => {
        e.stopPropagation()
        const name = e.target.getAttribute("name");
        
        const code = document.querySelector(`#${name}`)
        if (!code.style.display || code.style.display === 'none') {
            code.style.display = 'block';
            e.target.innerText = 'Hide Code';
        } else {
            code.style.display = 'none';
            e.target.innerText = 'View Code';
        }
    })
}

const milestone = new Timeline2D();

// Milestones for individual projects
milestone.addTimelineEvent(
    'Proposal',
    '',
    'Individual Project',
    '2021-02-27'
)

milestone.addTimelineEvent(
    'Alpha Releases',
    '',
    'Individual Project',
    '2021-03-23'
)

milestone.addTimelineEvent(
    'Final Submission',
    '',
    'Individual Project',
    '2021-04-17'
)

// Milestones for group projects
milestone.addTimelineEvent(
    'Proposal',
    '',
    'Group Project',
    '2021-02-06'
)

milestone.addTimelineEvent(
    'Phase 1 Releases',
    '',
    'Group Project',
    '2021-03-10'
)

milestone.addTimelineEvent(
    'Phase 2 Releases',
    '',
    'Group Project',
    '2021-04-09'
)

milestone.addTimelineEvent(
    'Final Releases',
    '',
    'Group Project',
    '2021-05-01'
)

milestone.render('#milestone', 1000)





const tl = new Timeline2D();

const jobs = 'Steve Jobs'
tl.addTimelineEvent('Birth', 'Born in San Francisco, California', jobs, '1955-02-24');
tl.addTimelineEvent('College', 'Enrolled at Reed College', jobs, '1972-9');
tl.addTimelineEvent('Drop out', 'Dropped out after one semester', jobs, '1973-1');
tl.addTimelineEvent('Founded Apple', 'Co-founded with Steve Wozniak and Ronald Wayne in Cupertino, California', jobs, '1976-4');
tl.addTimelineEvent('Death', 'Died at Palo Alto, California', jobs, '2011-10-5 15:00');

const gates = 'Bill Gates'
tl.addTimelineEvent('Birth', 'Born in Seattle, Washington.', gates, '1955-10-28')
tl.addTimelineEvent('College', 'Enrolled at Harvard in the autumn of 1973 with an SAT score of 1590', gates, '1973-9')
tl.addTimelineEvent('Drop out', 'Dropped out of Harvard after two years', gates, '1975')
tl.addTimelineEvent('Founded Microsoft', 'Co-founded with Paul Allen in Albuquerque, New Mexico', gates, '1975-4')
tl.addTimelineEvent('Leaving', 'Leaving day-to-day operations of Microsoft', gates, '2008');

const musk = 'Elon Musk'
tl.addTimelineEvent('Birth', 'Born in Pretoria, South Africa', musk, '1971-6-28')
tl.addTimelineEvent('College', 'Transferred to University of Pennsylvania',musk, '1992')
tl.addTimelineEvent('Graduate', 'Graduated with BS in economics and BA in physics', musk, '1997')
tl.addTimelineEvent('Founded SpaceX','Founded in Hawthorn, California', musk, '2002-5-6')
tl.addTimelineEvent('Founded Tesla','Founded in San Carlos, California',musk,'2003-7-1')
tl.addTimelineEvent('Founded Neuralink', 'Co-founded in San Francisco',musk, '2016-7')

tl.render('#people', 800);


const history = new Timeline2D();

const china = 'China';

const hongwu = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Hongwu_Emperor">this link</a>'
history.addTimelineEvent(
    'Ming dynasty founded',
    'In 1368, Zhu Yuanzhang established the Ming dynasty in the city of Nanjing.'+
    ` Zhu Yuanzhang is the only emperor in the history of China who is a peasant before. See more about Zhu Yuanzhang at ${hongwu}`,
    china,
    '1368-01-23'
);


const yongle = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Yongle_Emperor">this link</a>'
history.addTimelineEvent(
    'New Capital Beijing',
    'Emperor Zhu Di designated Beijing as the new capital.'+
    ` Zhu Di is the forth son of Zhu Yuanzhang and built the Forbidden city. See more about this emperor at ${yongle}`,
    china,
    '1420-10-28'
);


const tumu = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Tumu_Crisis">this link</a>'
history.addTimelineEvent(
    'Tumu Crisis',
    'Emperor Zhu Qizhen was captured by the Oirat leader Esen Tayisi during an invasion'+
    ` This event is know as the Crisis of Tumu Fortress. See more at ${tumu}`,
    china,
    '1449-09-08'
);



const imjin = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Japanese_invasions_of_Korea_(1592%E2%80%931598)">this link</a>'
history.addTimelineEvent(
    'Imjin War',
    'A Japanese-Korean war where Ming dynasty was also involved.'+
    ` See more at ${imjin}`,
    china,
    '1592'
);


const end = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Chongzhen_Emperor">this link</a>'
history.addTimelineEvent(
    'Fallen of Ming dynasty',
    'After Beijing fell to the rebel army, the last emperor Zhu Youjian hanged himself on a tree outside of the Forbidden City.'+
    ` See more about the last Ming dynasty emperor at ${end}`,
    china,
    '1644-04-25'
);

const england = 'England'


const black = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Black_Death_in_England">this link</a>'
history.addTimelineEvent(
    'Black Death',
    'First Black Death case arrived at Weymouth, Dorset.' +
    `See more about Black Death in England at ${black}`,
    england,
    '1348'
)


const lanc = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Hundred_Years%27_War_(1415%E2%80%931453)">this link</a>'
history.addTimelineEvent(
    'Lancastrian War',
    'King Henry V invaded Normandy, which marks the start of the final phase of Anglo-French Hundred Years War, as known as Lancastrian War' +
    `See more about the war at ${lanc}`,
    england,
    '1415'
)

const rose = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Wars_of_the_Roses">this link</a>'
history.addTimelineEvent(
    'The Wars of the Roses',
    'A series of civil wars to claim the throne.' +
    `See more about Wars of the Roses at ${rose}`,
    england,
    '1455'
)

const vii = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Henry_VII_of_England">this link</a>'
history.addTimelineEvent(
    'Tudor Dynasty',
    'Henry VII began his reign, which marks the beginning of Tudor England.' +
    `See more about King Henry VII at ${vii}`,
    england,
    '1485'
)


const liz = '<a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Elizabeth_I">this link</a>'
history.addTimelineEvent(
    'Elizabeth I',
    'Elizabeth I came to the throne. Her reign was often depicted as the golden age in England history.' +
    `See more about Queen Elizabeth I at ${liz}`,
    england,
    '1558'
)


history.addTimelineEvent(
    'End of Tudor',
    'Following the death of Queen Elizabeth I, the Tudor dynasty has come to the end.',
    england,
    '1603'
)


history.render('#history', 1000)
