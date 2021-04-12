"use strict";

const flowColor = 'lightblue'
const strokeColor = 'grey'

const radius = 19;
const rectWidth = 29
const rectLength = 1100
const topOffset = radius - rectWidth/2
const arrowHeight = 40
const arrowLength = 60


const demo = document.querySelector('#demo');
const aes = document.querySelector('#aesFix');

const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

circle.setAttribute('cx', radius)
circle.setAttribute('cy', radius)
circle.setAttribute('r', radius)
circle.setAttribute('fill', flowColor)

aes.appendChild(circle)

const timeflow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

demo.style.height = `${arrowHeight > 2*radius ? arrowHeight : 2*radius}px`;
aes.style.height = `${arrowHeight > 2*radius ? arrowHeight : 2*radius}px`;

const rect1 = `${radius},${topOffset}`
const rect2 = `${radius + rectLength},${topOffset}`

const arrow1 = `${radius + rectLength},${topOffset - (arrowHeight - rectWidth)/2}`
const arrow2 = `${radius + rectLength + arrowLength},${topOffset + (rectWidth)/2}`
const arrow3 = `${radius + rectLength},${topOffset + (arrowHeight) - (arrowHeight - rectWidth)/2}`

const rect3 = `${radius + rectLength},${topOffset + rectWidth}`
const rect4 = `${radius},${topOffset + rectWidth}`

timeflow.setAttribute('points', `${rect1} ${rect2} ${arrow1} ${arrow2} ${arrow3} ${rect3} ${rect4}`)
timeflow.setAttribute('fill', flowColor)

demo.appendChild(timeflow)

const aesFix = (x) => {
    const rectA = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    const aesWidth = 60

    rectA.setAttribute('width', aesWidth)
    rectA.setAttribute('height', rectWidth)
    rectA.setAttribute('y', topOffset)
    rectA.setAttribute('fill', flowColor)

    rectA.setAttribute('x', x)
    return rectA;
}

aes.appendChild(aesFix(380))
aes.appendChild(aesFix(600))
aes.appendChild(aesFix(865))
aes.appendChild(aesFix(1000))






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




const history = new Timeline2D();

history.addTimelineEvent(
    ''
)




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
