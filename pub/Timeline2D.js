'use strict';

(function(global, document){

    /* Styling parameters for timeline */
    
    const flowWidth = 30; 
    const arrowWidth = flowWidth * 2; 
    const flowColor = 'lightblue'
    const flowStroke = 'darkgrey'
    const flowStrokeWidth = 2

    const catNamePadding = 10; 
    const catNameWidth = 100;
    const catNameHeight = 20;

    const titleHeight = 50;
    const timeHeight = 30;
    const descriptionHeight = 100;
    const boxHeight = titleHeight + timeHeight + catNameHeight + descriptionHeight;
    const boxWidth = 250;
    const boxArrowLength = 20;
    const boxArrowPadding = boxWidth * 1/4
    const strokeWidth = 2
    const boxFill = "blanchedalmond"
    const boxStroke = "brown"

    const startX = catNamePadding * 2 + catNameWidth + 5;
    const startY = (arrowWidth - flowWidth)/2;
    const arrowLength = 80;

    const circleRadius = 25;
    const circleCenterOffset = 19

    const categoryWidth = 70;
    const eventCategoryOffset = 70;
    const dotWidth = 20;
    const dotEnlarge = 8;

    const dotTitlePadding = 10;

    const timelineMarginBottom = dotWidth + titleHeight;
    const timelineMarginTop = dotWidth + titleHeight;

    
    const scaleNum = 5;
    const scaleArrowWidth = 10
    const scaleArrowHeight = flowWidth/3
    const scaleColor = 'grey'
    const scaleOffset = 3

    
    const colors = ['darkgreen','crimson','orange','darkblue'];


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
            return this.time.toDateString();
        },
    }
    

    /* Helper functions */

    function getPrimaryTime(time) {
        const totalInterval = this.renderMax.getTime() - this.renderMin.getTime();
        const diff_in_month = totalInterval / (1000 * 60 * 60 * 24 * 30)

        const toMonth = function (month){
            if (month < 0 || month > 11){
                return 'Unknown'
            }
            const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            return months[month]
        };
        
        if (diff_in_month <= scaleNum){
            return `${toMonth(time.getMonth())}. ${time.getDate()}, ${time.getFullYear()}`
        } else if (diff_in_month <= scaleNum * 12){
            return `${toMonth(time.getMonth())}. ${time.getFullYear()}`
        } else {
            return time.getFullYear()
        }
    }
    
    function getColor(category) {
        const idx = this.categories.indexOf(category) % colors.length;
        return colors[idx];
    }

    function getTimeScales() {
        let scales = []
        
        let partialMax = this.renderMin;

        const scalesLength = this.renderMax - this.renderMin;
        const scaleUnit = scalesLength / scaleNum;

        while (partialMax < this.renderMax){
            scales.push(partialMax);
            partialMax = new Date(partialMax.valueOf() + scaleUnit);
        }
        
        scales.push(partialMax);
        return scales;
    }

    function createTimeflowDOM (length, aboveHeight, belowHeight){

        // create canvas to draw the timeflow arrow
        const timeflow = document.createElement('canvas');
        timeflow.width = length + arrowLength + startX;
        timeflow.height = arrowWidth + flowStrokeWidth*2;
        timeflow.style.zIndex = `${this.events.length}`;
        
        // Fix position of arrow
        timeflow.style.top = `${aboveHeight - (arrowWidth - flowWidth)/2}px`
        
        // Draw arrow
        const ctx = timeflow.getContext("2d");

        // Fill color of the timeflow
        ctx.fillStyle = flowColor

        ctx.beginPath();
        ctx.arc(startX-circleCenterOffset, startY + flowWidth/2, circleRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.fillRect(startX, startY, length, flowWidth);

        ctx.beginPath();
        ctx.moveTo(length + startX, startY - (arrowWidth - flowWidth)/2);
        ctx.lineTo(length + startX, startY + flowWidth + (arrowWidth - flowWidth)/2);
        ctx.lineTo(length + startX + arrowLength, startY + flowWidth/2);
        ctx.closePath();
        ctx.fill();
        
        // Drawing edge of the timeflow
        ctx.strokeStyle = flowStroke
        ctx.lineWidth = flowStrokeWidth
        ctx.beginPath();
        ctx.arc(startX-circleCenterOffset, startY + flowWidth/2, circleRadius, 0.2 * Math.PI, 1.8*Math.PI);
        ctx.lineTo(length + startX, startY);
        ctx.lineTo(length + startX, startY - (arrowWidth - flowWidth)/2);
        ctx.lineTo(length + startX + arrowLength, startY + flowWidth/2);
        ctx.lineTo(length + startX, startY + flowWidth + (arrowWidth - flowWidth)/2);
        ctx.lineTo(length + startX, startY + flowWidth);

        ctx.closePath();
        ctx.stroke()

        return timeflow;
    }

    function createZoomedTimeline (length, renderMin, renderMax){
        const timeline = document.createElement('div');
        timeline.classList.add('timeline2d')
        
        timeline.style.marginTop = `${timelineMarginTop}px`;
        timeline.style.marginBottom = `${timelineMarginBottom}px`;
        
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

        // Render an empty timeline if no events is provided
        if (!renderMin || !renderMax) {
            
            const timeflow = createTimeflowDOM.bind(this)(length, aboveHeight, belowHeight)

            // Put timeflow arrow into the timeline
            timeline.appendChild(timeflow);
            return timeline;
        }

        // Add each event to the timeline
        this.events.forEach(
            (item) => {
                if (item.time < renderMin || item.time > renderMax){
                    return;
                }

                // Calculate where should the event be placed on the time flow
                // based on its time
                const total = renderMax - renderMin;
                const fraction = (total !== 0) ? ((item.time - renderMin) / total) : 0
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
                dot.style.width = `${dotWidth}px`
                dot.style.height = `${dotWidth}px`

                const line = document.createElement('div')
                line.classList.add('eventLine')

                // A hidden event title above (or below) the dot which only become visible when the mouse hovers
                // over the dot
                const title = document.createElement('div')
                title.innerText = `${getPrimaryTime.bind(this)(item.time)} | ${item.title}`
                title.classList.add('eventTitle')

                dot.addEventListener('mouseenter', (e) => {
                    dot.style.width = `${dotWidth + dotEnlarge}px`
                    dot.style.height = `${dotWidth + dotEnlarge}px`

                    title.style.visibility = 'visible';
                })
                
                dot.addEventListener('mouseleave', (e) => {
                    dot.style.width = `${dotWidth}px`
                    dot.style.height = `${dotWidth}px`

                    title.style.visibility = 'hidden';
                })

                // Show a box containing information of the event when the dot is clicked
                dot.addEventListener('click', e => {
                    const existingBox = timeline.querySelector('.eventBox');
                    if (existingBox) {
                        timeline.removeChild(existingBox);
                    }
                    const existingTri = timeline.querySelector('.eventTriangle');
                    if (existingTri) {
                        timeline.removeChild(existingTri);
                    }
                    const eventBox = document.createElement('div');
                    eventBox.classList.add('eventBox');
                    eventBox.style.zIndex = `${this.events.length + 1}`;
                    eventBox.style.backgroundColor = boxFill
                    eventBox.style.border = `${strokeWidth}px solid ${boxStroke}`
                    
                    const closeButton = document.createElement('div');
                    closeButton.innerHTML = 'X';
                    closeButton.classList.add('closeButton');
                    closeButton.style.color = boxFill;

                    closeButton.addEventListener('click', e => {
                        const existingBox = timeline.querySelector('.eventBox');
                        timeline.removeChild(existingBox);
                        const existingTri = timeline.querySelector('.eventTriangle');
                        timeline.removeChild(existingTri);
                    })

                    const timeHeader = document.createElement('div');
                    timeHeader.id = 'eventTime';
                    timeHeader.style.maxHeight = `${timeHeight}px`

                    const eventTitle = document.createElement('div');
                    eventTitle.id = 'eventTitle';
                    eventTitle.style.maxHeight = `${titleHeight}px`
                    eventTitle.style.paddingTop = `${catNameHeight / 2}px`
                    eventTitle.style.paddingBottom = `${catNameHeight / 2}px`

                    const eventDescription = document.createElement('div');
                    eventDescription.id = 'eventDescription';
                    eventDescription.style.maxHeight = `${descriptionHeight}px`

                    timeHeader.innerText = item.getTimeString();
                    eventTitle.innerHTML = `${item.category}: <strong>${item.title}</strong>`;
                    eventDescription.innerHTML = item.description;
                    
                    eventBox.appendChild(timeHeader);
                    eventBox.appendChild(eventTitle);
                    eventBox.appendChild(eventDescription);
                    eventBox.appendChild(closeButton);

                    eventBox.style.maxHeight = `${boxHeight}px`;
                    eventBox.style.minWidth = `${boxWidth}px`;
                    eventBox.style.left = `${toLeft - boxWidth/2}px`;

                    if (above.includes(item.category)){
                        eventBox.style.top = `${aboveHeight - lineHeight + boxArrowLength}px`
                    } else {
                        eventBox.style.bottom = `${belowHeight - lineHeight + boxArrowLength}px`
                    }

                    // Drawing the event box: The triangle above or below eventbox
                    const eventTriangle = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                    eventTriangle.classList.add('overlay')
                    eventTriangle.classList.add('eventTriangle')
                    eventTriangle.style.width =`${boxWidth}px`
                    eventTriangle.style.height =`${boxArrowLength + strokeWidth}px`
                    eventTriangle.style.left = `${toLeft - boxWidth/2}px`;
                    eventTriangle.style.zIndex = `${this.events.length + 2}`;

                    const boxArrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
                    
                    let tri1, tri2, tri3, triangleTop,triangleBottom;
                    if (above.includes(item.category)){
                        eventTriangle.style.top = `${aboveHeight - lineHeight}px`

                        triangleTop = 0
                        triangleBottom = boxArrowLength + strokeWidth
                    } else {
                        eventTriangle.style.bottom = `${belowHeight - lineHeight}px`

                        triangleBottom = 0
                        triangleTop = boxArrowLength + strokeWidth 
                    }
                    
                    tri1 = `${boxWidth/2 + (dotWidth)/2},${triangleTop}`
                    tri2 = `${boxArrowPadding},${triangleBottom}`
                    tri3 = `${boxWidth - boxArrowPadding},${triangleBottom}`
                    
                    boxArrow.setAttribute('points', `${tri1} ${tri2} ${tri3}`)
                    boxArrow.setAttribute('fill', boxFill)

                    const arrowStroke = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    arrowStroke.setAttribute('x1', boxWidth/2 + (dotWidth)/2)
                    arrowStroke.setAttribute('y1', triangleTop)
                    arrowStroke.setAttribute('x2', boxArrowPadding)
                    arrowStroke.setAttribute('y2', triangleBottom)

                    arrowStroke.setAttribute('stroke-width', strokeWidth)
                    arrowStroke.setAttribute('stroke', boxStroke)

                    
                    const arrowStroke2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    arrowStroke2.setAttribute('x1', boxWidth/2 + (dotWidth)/2)
                    arrowStroke2.setAttribute('y1', triangleTop)
                    arrowStroke2.setAttribute('x2', boxWidth - boxArrowPadding)
                    arrowStroke2.setAttribute('y2', triangleBottom)
                    
                    arrowStroke2.setAttribute('stroke-width', strokeWidth)
                    arrowStroke2.setAttribute('stroke', boxStroke)

                    eventTriangle.appendChild(boxArrow)
                    eventTriangle.appendChild(arrowStroke)
                    eventTriangle.appendChild(arrowStroke2)

                    timeline.appendChild(eventBox);
                    timeline.appendChild(eventTriangle)
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

        // Add time scale on the timeflow
        const scalesLength = this.renderMax - this.renderMin;

        let scales = getTimeScales.bind(this)();
        scales.forEach(time => {
            const scaleFraction = (scalesLength !== 0) ? (time - this.renderMin) / scalesLength : 0;

            const scale = document.createElement('div');
            scale.classList.add('timelineScale');
            scale.style.left = `${startX + scaleFraction * (length - dotWidth)}px`;
            scale.style.top = `${aboveHeight - scaleOffset}px`;
            scale.style.zIndex = `${this.events.length + 1}`;

            const topScale = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            topScale.setAttribute('width', scaleArrowWidth)
            topScale.setAttribute('height', scaleArrowHeight)
            const topTriangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            topTriangle.setAttribute('points', `${0},${0} ${scaleArrowWidth},${0} ${scaleArrowWidth/2},${scaleArrowHeight}`)
            topTriangle.setAttribute('fill', scaleColor)
            topScale.appendChild(topTriangle)

            const timeVal = getPrimaryTime.bind(this)(time)
            const timeContent = document.createElement('div');
            timeContent.id = 'timeContent';
            timeContent.innerText = timeVal
            timeContent.style.color = scaleColor
            
            const bottomScale = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            bottomScale.setAttribute('width', scaleArrowWidth)
            bottomScale.setAttribute('height', scaleArrowHeight)
            const buttomTriangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
            buttomTriangle.setAttribute('points', `${0},${scaleArrowHeight} ${scaleArrowWidth},${scaleArrowHeight} ${scaleArrowWidth/2},${0}`)
            buttomTriangle.setAttribute('fill', scaleColor)
            bottomScale.appendChild(buttomTriangle)
            
            
            scale.appendChild(topScale)
            scale.appendChild(timeContent)
            scale.appendChild(bottomScale)

            timeline.appendChild(scale);
        });

        // Create the timeflow arrow
        const timeflow = createTimeflowDOM.bind(this)(length, aboveHeight, belowHeight)

        // Put timeflow arrow into the timeline
        timeline.appendChild(timeflow);
        return timeline;
    }


    function Timeline2D () {
        this.timeMax = undefined;
        this.timeMin = undefined;
        this.events = [];
        this.categories = [];

        this.renderMax = undefined;
        this.renderMin = undefined;

        this.unitTime = undefined;

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
                if (!this.renderMax || !this.renderMin){
                    
                    zoomIn.disabled = true
                    zoomOut.disabled = true

                    next.disabled = true
                    prev.disabled = true

                } else {
                    zoomIn.disabled = (this.renderMax - this.renderMin) <= zoomUnit;
                    zoomOut.disabled = (this.renderMax >= this.timeMax) && (this.renderMin <= this.timeMin);
    
                    next.disabled = this.renderMax >= this.timeMax;
                    prev.disabled = this.renderMin <= this.timeMin;
                }
            };

            // Button to zoom in
            const zoomIn = document.createElement('button');
            zoomIn.classList.add('timelineZoom');
            zoomIn.innerText = 'Zoom in';

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
            zoomOut.innerText = 'Zoom out';

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
            next.classList.add('timelineMove');
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



    // Finish setup
    // Add Timeline2D object to the window object:
    global.Timeline2D = global.Timeline2D || Timeline2D;

})(window, window.document);