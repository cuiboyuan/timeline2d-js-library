# JS library: Timeline2D

## Library description
The library allows developers to generate a 2-dimensional timeline, where one dimension is the unidirectional time flow, while the other dimension is the discrete categories of events. The library helps developers to figuratively compare events of different categories happened during the same time. With the help of this library, developers can spend more time on gathering information on the events they want to compare rather than coding the timeline by themselves. The category can be different things in different use cases. If the developer wants to build an education website about world history, the category can be different countries and the timeline will compare major historical events occurring around the world at the same time. If the developer wants to build a promotion web platform for companies, the category can be different products, and the timeline will show the date of different product releases or company events. If the developer wants to build a project milestone tracker for individual usage, the category can be different projects and the timeline will track the date of milestones and deadlines of different project.

## Current features

The timeline is fully functional in the alpha release. Different events are scaled by their occurring times. End users can zoom in/out and move long the timeline to different time. End users can also hover over dots which represent events to see the title and occurring time of the event; user can also click on the dots to see more event information. Event information and time will be provided by developers through the library’s interface. Developers can add events and render the timeline to the website with the given API. Different categories are distinguished by the distance between event dots and the timeline, as well as colors.

## Example webpage link:
https://still-tundra-45710.herokuapp.com/example.html


## API for developers

`new Timeline2D();`
A constructor that represents the entire timeline and stores information of all events.

`addTimelineEvent(title, description, category, dateString);`
A function to add an event to the timeline. The event information is given by the argument. The `dateString` argument needs to be the same format to construct a JS Date object, e.g. ‘2021-03-23 15:00’.

`render(renderAt, length);`
A function to generate all necessary DOM objects to the web page with event information in the timeline. `renderAt` needs to be formatted correctly such that `querySelector()` is able to find the place where the timeline needs to be rendered. length represents how long the developer wants the timeline to be in px.  
