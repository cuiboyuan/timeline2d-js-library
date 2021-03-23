'use strict'

function TimelineEvent (title, description, category, time) {
    this.title = title;
    this.description = description;
    this.time = time;
    this.category = category;
}

TimelineEvent.prototype = {
    getTime: function() {
        return this.time;
    },

    getTimeString: function() {
        return this.time.toLocaleString();
    },

    getPrimaryTime: function() {
        return this.time.getFullYear()
    }
}



/* Styling parameters for timeline */

const flowWidth = 30; 
const arrowWidth = flowWidth * 2; 

const catNamePadding = 10; 
const catNameWidth = 100;
const catNameHeight = 20;

const titleHeight = 50;
const timeHeight = 30;
const descriptionHeight = 100;
const boxHeight = titleHeight + timeHeight + catNameHeight + descriptionHeight;

const startX = catNamePadding * 2 + catNameWidth + 5;
const startY = (arrowWidth - flowWidth)/2;
const arrowLength = 50;

const circleRadius = 20;

const categoryWidth = 70;
const eventCategoryOffset = 20;
const dotWidth = 20;

const dotTitlePadding = 10;

const timelineMarginBottom = 10;
const timelineMarginTop = 0;

/* Helper functions */

function createZoomedTimeline (length, renderMin, renderMax){
    const timeline = document.createElement('div');
    timeline.classList.add('timeline2d')
    
    // Determine which category stays above/below the timeline
    let above = [];
    let below = [];
    
    for (let i = 0; i < this.categories.length; i++){
        if (i % 2 == 0){   
            above.push(this.categories[i]);
        } else {
            below.push(this.categories[i]);
        }
    }
    
    // Parameter for formating
    const aboveHeight = above.length * categoryWidth;
    const belowHeight = below.length * categoryWidth;

    timeline.style.height = `${aboveHeight + belowHeight + flowWidth}px`

    // Add each event to the timeline
    this.events.forEach(
        (item) => {
            if (item.getTime() < renderMin || item.getTime() > renderMax){
                return;
            }

            // Calculate where should the event be placed on the time flow
            // based on its time
            const total = renderMax - renderMin;
            const fraction = total ? (item.getTime() - renderMin) / total : 0
            const toLeft = (length - dotWidth) * fraction + startX;
            
            // Calculate the position based on its category
            let lineHeight;
            if (above.includes(item.category)){
                lineHeight = categoryWidth * above.indexOf(item.category) + eventCategoryOffset;
            } else {
                lineHeight = categoryWidth * below.indexOf(item.category) + eventCategoryOffset;
            }

            // The event is graphically represented by a dot and a line which connect to the timeline
            const event = document.createElement('div');
            event.classList.add('overlay');

            const dot = document.createElement('div')
            dot.classList.add('eventDot');

            const line = document.createElement('div')
            line.classList.add('eventLine')

            // A hidden event title above (or below) the dot which only become visible when the mouse hovers
            // over the dot
            const title = document.createElement('div')
            title.innerText = `${item.getPrimaryTime()}, ${item.title}`
            title.classList.add('eventTitle')

            dot.addEventListener('mouseenter', (e) => {
                title.style.visibility = 'visible';
            })
            
            dot.addEventListener('mouseleave', (e) => {
                title.style.visibility = 'hidden';
            })

            // Show a box containing information of the event when the dot is clicked
            dot.addEventListener('click', e => {
                const existingBox = timeline.querySelector('.eventBox');
                if (existingBox) {
                    timeline.removeChild(existingBox);
                }
                const eventBox = document.createElement('div');
                eventBox.classList.add('eventBox');
                eventBox.style.zIndex = `${this.events.length + 1}`;
                
                const closeButton = document.createElement('div');
                closeButton.innerHTML = '<center> X </center>';
                closeButton.classList.add('closeButton');

                closeButton.addEventListener('click', e => {
                    const existingBox = timeline.querySelector('.eventBox');
                    timeline.removeChild(existingBox);
                })

                const timeHeader = document.createElement('div');
                timeHeader.id = 'eventTime';
                timeHeader.style.maxHeight = `${timeHeight}px`

                const eventTitle = document.createElement('div');
                eventTitle.id = 'eventTitle';
                eventTitle.style.maxHeight = `${titleHeight}px`

                const eventCat = document.createElement('div');
                eventCat.id = 'eventCat';
                eventCat.style.maxHeight = `${catNameHeight}px`

                const eventDescription = document.createElement('div');
                eventDescription.id = 'eventDescription';
                eventDescription.style.maxHeight = `${descriptionHeight}px`

                timeHeader.innerText = item.getTimeString();
                eventTitle.innerHTML = `<center><strong>${item.title}</strong></center>`;
                eventCat.innerText = `${item.category}`;
                eventDescription.innerHTML = item.description;
                
                eventBox.appendChild(timeHeader);
                eventBox.appendChild(eventCat);
                eventBox.appendChild(eventTitle);
                eventBox.appendChild(eventDescription);
                eventBox.appendChild(closeButton);

                eventBox.style.maxHeight = `${boxHeight}px`;
                eventBox.style.left = `${toLeft}px`;

                if (above.includes(item.category)){
                    eventBox.style.top = `${aboveHeight - lineHeight}px`
                } else {
                    eventBox.style.bottom = `${belowHeight - lineHeight}px`
                }
                timeline.appendChild(eventBox);
            })

            // The dot and line representing the event is placed on the timeline
            // w.r.t. its time
            event.style.left = `${toLeft}px`;
            title.style.left = `${toLeft}px`;

            // Give a color to the event based on its category
            dot.style.backgroundColor = getColor.bind(this)(item.category);
            line.style.backgroundColor = getColor.bind(this)(item.category);

            // Add the events above or below the timeline based on its category
            if (above.includes(item.category)){
                line.style.height = `${lineHeight}px`

                event.style.bottom = `${belowHeight + flowWidth}px`
                title.style.bottom = `${belowHeight + flowWidth + lineHeight + dotWidth + dotTitlePadding}px`;

                event.appendChild(dot)
                event.appendChild(line)

                // Ensure that events near the timeline is rendered above events that are further
                title.style.zIndex = `${above.length - above.indexOf(item.category)}`
                event.style.zIndex = `${above.length - above.indexOf(item.category)}`
            } else {
                line.style.height = `${lineHeight}px`

                event.style.top = `${aboveHeight + flowWidth}px`
                title.style.top = `${aboveHeight + flowWidth + lineHeight + dotWidth + dotTitlePadding}px`;

                event.appendChild(line) 
                event.appendChild(dot)
                
                // Ensure that events near the timeline is rendered above events that are further
                title.style.zIndex = `${below.length - below.indexOf(item.category)}`
                event.style.zIndex = `${below.length - below.indexOf(item.category)}`
            }
    
            timeline.appendChild(event);
            timeline.appendChild(title)

        }
    );

    // Add categories' names
    this.categories.forEach((cat) => {
            const catName = document.createElement('div');
            catName.classList.add('categoryName')
            catName.style.left = `${(startX - catNameWidth) / 2}px`;
            catName.style.maxWidth = `${catNameWidth}px`;
            catName.style.color = getColor.bind(this)(cat);
            catName.innerText = cat;

            if (above.includes(cat)) {
                catName.style.bottom = `${belowHeight + flowWidth + categoryWidth * above.indexOf(cat) + eventCategoryOffset}px`
            } else {
                catName.style.top = `${aboveHeight + flowWidth + categoryWidth * below.indexOf(cat) + eventCategoryOffset}px`
            }
            timeline.appendChild(catName);
        }
    );

    // Add time scale on the timeflow arrow
    const scaleNum = 5;
    const scalesLength = this.renderMax - this.renderMin;
    this.scaleUnit = scalesLength / scaleNum;

    let scales = getTimeScales.bind(this)();
    scales.forEach(time => {
        const scaleFraction = scalesLength ? (time - this.renderMin) / scalesLength : 0;

        const scale = document.createElement('div');
        scale.classList.add('timelineScale');
        scale.style.left = `${startX + scaleFraction * (length - dotWidth)}px`;
        scale.style.top = `${aboveHeight}px`;
        scale.style.zIndex = `${this.events.length + 1}`;

        scale.innerText = time.getFullYear();
        
        timeline.appendChild(scale);
    });

    // create canvas to draw the timeflow arrow
    const timeflow = document.createElement('canvas');
    timeflow.width = length + arrowLength + startX;
    timeflow.height = arrowWidth;
    timeflow.style.zIndex = `${this.events.length}`;
    
    // Fix position of arrow
    timeflow.style.top = `${aboveHeight - (arrowWidth - flowWidth)/2}px`
    
    // Draw arrow
    const ctx = timeflow.getContext("2d");
    ctx.fillRect(startX, startY, length, flowWidth);
    ctx.beginPath();
    ctx.arc(startX, startY + flowWidth/2, circleRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.moveTo(length + startX, startY - (arrowWidth - flowWidth)/2);
    ctx.lineTo(length + startX, startY + flowWidth + (arrowWidth - flowWidth)/2);
    ctx.lineTo(length + startX + arrowLength, startY + flowWidth/2);
    ctx.fill();

    // Put timeflow arrow into the timeline
    timeline.appendChild(timeflow);
    timeline.style.marginTop = `${timelineMarginTop}px`;
    timeline.style.marginBottom = `${timelineMarginBottom}px`;
    return timeline;
}


function getColor(category) {
    const colors = ['darkgreen','crimson','orange','darkblue'];
    const idx = this.categories.indexOf(category) % colors.length;
    return colors[idx];
}

function getTimeScales() {
    let scales = []
    
    let partialMax = this.renderMin;
    while (partialMax <= this.renderMax){
        scales.push(partialMax);
        partialMax = new Date(partialMax.valueOf() + this.scaleUnit);
    }
    return scales;
}


function Timeline2D () {
    this.timeMax = undefined;
    this.timeMin = undefined;
    this.events = [];
    this.categories = [];

    this.renderMax = undefined;
    this.renderMin = undefined;

    this.unitTime = undefined;

    this.scaleUnit = undefined;

}

Timeline2D.prototype = {

    addTimelineEvent: function(title, description, category, dateString){

        const time = new Date(dateString);
        const event = new TimelineEvent(title, description, category, time);
        if (!this.timeMin || time < this.timeMin){
            this.timeMin = time;
        }

        if (!this.timeMax || time > this.timeMax){
            this.timeMax = time;
        } 

        this.events.push(event);
        if (!this.categories.includes(category)){
            this.categories.push(category)
        }
    },
    
    render: function(rendetAt, length) {
        
        // Parameters for zooming
        const zoomDepth = 10;

        const zoomUnit = (this.timeMax - this.timeMin) / zoomDepth;
        this.renderMin = this.timeMin;
        this.renderMax = this.timeMax;
        this.unitTime = zoomUnit;

        const timeline = createZoomedTimeline.bind(this)(length, this.timeMin, this.timeMax);

        /* Wrapper for timeline and the panel */
        const wrapper = document.createElement('div');
        wrapper.classList.add('timelineWrapper');

        // Add timeline to the wrapper for rendering
        wrapper.appendChild(timeline);

        /* The panel for zooming and moving the timeline */
        const panel = document.createElement('div');
        panel.classList.add('timelinePanel');

        const panelRefresh = () => {
            zoomIn.disabled = (this.renderMax - this.renderMin) <= zoomUnit;
            zoomOut.disabled = (this.renderMax >= this.timeMax) && (this.renderMin <= this.timeMin);

            next.disabled = this.renderMax >= this.timeMax;
            prev.disabled = this.renderMin <= this.timeMin;
        };

        // Button to zoom in
        const zoomIn = document.createElement('button');
        zoomIn.classList.add('timelineZoom');
        zoomIn.innerText = 'Zoom In';

        zoomIn.addEventListener('click', e => {

            const oldTimeline = wrapper.querySelector('.timeline2d');
            this.renderMin = new Date(this.renderMin.valueOf() + zoomUnit/2);
            this.renderMax = new Date(this.renderMax.valueOf() - zoomUnit/2);
            const zoomedTimeline = createZoomedTimeline.bind(this)(length, this.renderMin, this.renderMax);
            wrapper.replaceChild(zoomedTimeline, oldTimeline);

            panelRefresh();

            this.unitTime = (this.renderMax - this.renderMin) / (2*zoomDepth + 1);
        });
        
        // Button to zoom out
        const zoomOut = document.createElement('button');
        zoomOut.classList.add('timelineZoom');
        zoomOut.innerText = 'Zoom Out';

        zoomOut.addEventListener('click', e => {

            const oldTimeline = wrapper.querySelector('.timeline2d');
            if (this.renderMin > this.timeMin){
                this.renderMin = new Date(this.renderMin.valueOf() - zoomUnit/2);
            }
            if (this.renderMax < this.timeMax){
                this.renderMax = new Date(this.renderMax.valueOf() + zoomUnit/2);
            }
            const zoomedTimeline = createZoomedTimeline.bind(this)(length, this.renderMin, this.renderMax);
            wrapper.replaceChild(zoomedTimeline, oldTimeline);

            panelRefresh();
            
            this.unitTime = (this.renderMax - this.renderMin) / (2*zoomDepth + 1);
        });

        // Button to move left in the timeline
        const prev = document.createElement('button');
        prev.classList.add('timelineMove');
        prev.innerText = '<';

        prev.addEventListener('click', e => {
            const oldTimeline = wrapper.querySelector('.timeline2d');
            if (this.renderMin > this.timeMin){
                this.renderMin = new Date(this.renderMin.valueOf() - this.unitTime);
                this.renderMax = new Date(this.renderMax.valueOf() - this.unitTime);
            }
            const zoomedTimeline = createZoomedTimeline.bind(this)(length, this.renderMin, this.renderMax);
            wrapper.replaceChild(zoomedTimeline, oldTimeline)
            
            panelRefresh();
        });
        
        // Button to move right in the timeline
        const next = document.createElement('button');
        next.classList.add('timelineZoom');
        next.innerText = '>';

        next.addEventListener('click', e => {
            const oldTimeline = wrapper.querySelector('.timeline2d');
            if (this.renderMax < this.timeMax){
                this.renderMin = new Date(this.renderMin.valueOf() + this.unitTime);
                this.renderMax = new Date(this.renderMax.valueOf() + this.unitTime);
            }
            const zoomedTimeline = createZoomedTimeline.bind(this)(length, this.renderMin, this.renderMax);
            wrapper.replaceChild(zoomedTimeline, oldTimeline)
            
            panelRefresh();
        });

        panelRefresh();

        // Add the buttons in the panel
        panel.appendChild(prev);
        panel.appendChild(zoomIn);
        panel.appendChild(zoomOut);
        panel.appendChild(next);
        
        // Add the panel to the wrapper
        wrapper.appendChild(panel);

        // Define the width of the wrapper to be the same as timeline
        wrapper.style.width = `${startX + length + arrowLength + circleRadius}px`;

        // Rendered the entire timeline to the given place
        const where = document.querySelector(rendetAt);
        where.appendChild(wrapper);
    }
};
