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
