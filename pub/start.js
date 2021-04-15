"use strict";

const first = new Timeline2D();

first.render('#first', 1000);


const second = new Timeline2D();
                
second.addTimelineEvent('First Event', 'This is my first timeline event!!', 'My first category', '2021-04-12');
second.addTimelineEvent('Second Event', 'Here is another event', 'My first category', '2022-04-12');
second.addTimelineEvent('Third Event', 'Another one but in different category!', 'My second category', '2023-04-12');

second.render('#second', 1000);