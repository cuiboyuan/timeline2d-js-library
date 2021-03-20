
const tl = new Timeline2D();

const jobs = 'Steve Jobs'
tl.addTimelineEvent('Birth', 'Born in San Francisco, California', jobs, 1955, 2, 24);
tl.addTimelineEvent('College', 'Enrolled at Reed College', jobs, 1972, 9);
tl.addTimelineEvent('Drop out', 'Dropped out after one semester', jobs, 1973, 1);
tl.addTimelineEvent('Founded Apple', 'Co-founded with Steve Wozniak and Ronald Wayne in Cupertino, California', jobs, 1976, 4);
tl.addTimelineEvent('Death', 'Died at Palo Alto, California', jobs, 2011, 10, 5, 15);

const gates = 'Bill Gates'
tl.addTimelineEvent('Birth', 'Born in Seattle, Washington. I have no idea what im d=talking this is nonsensensdfsdjkhfwaeuhisdh s   hasdfhsaihfs i want to mashdufhsidfsdc', gates, 1955, 10, 28)
tl.addTimelineEvent('College', 'Enrolled at Harvard in the autumn of 1973 with an SAT score of 1590', gates, 1973, 9)
tl.addTimelineEvent('Drop out', 'Dropped out of Harvard after two years', gates, 1975)
tl.addTimelineEvent('Founded Microsoft', 'Co-founded with Paul Allen in Albuquerque, New Mexico', gates, 1975, 4)
tl.addTimelineEvent('Leaving', 'Leaving day-to-day operations of Microsoft', gates, 2008);

const musk = 'Elon Musk'
tl.addTimelineEvent('Birth', 'Born in Pretoria, South Africa', musk, 1971, 6, 28)
tl.addTimelineEvent('College', 'Transferred to University of Pennsylvania',musk, 1992)
tl.addTimelineEvent('Graduate', 'Graduated with BS in economics and BA in physics', musk, 1997)
tl.addTimelineEvent('Founded SpaceX','Founded in Hawthorn, California', musk, 2002, 5, 6)
tl.addTimelineEvent('Founded Tesladfgdfgerdfgsdfgfsd','Founded in San Carlos, California',musk,2003,7,1)
tl.addTimelineEvent('Founded Neuralink', 'Co-founded in San Francisco',musk, 2016,7)

tl.render('body', 800);

const something = document.createElement('span')
something.innerHTML = 'something else in the website'
document.querySelector('body').appendChild(something);

// const tl2 = new Timeline2D();

// tl2.addTimelineEvent('Birth', 'Born in San Francisco, California', jobs, 1955, 2, 24);
// tl2.addTimelineEvent('College', 'Enrolled at Reed College', jobs, 1972, 9);
// tl2.addTimelineEvent('Drop out', 'Dropped out after one semester', jobs, 1973, 1);
// tl2.addTimelineEvent('Founded Apple', 'Co-founded with Steve Wozniak and Ronald Wayne in Cupertino, California', jobs, 1976, 4);
// tl2.addTimelineEvent('Death', 'Died at Palo Alto, California', jobs, 2011, 10, 5, 15);



// tl2.render('body', 500);