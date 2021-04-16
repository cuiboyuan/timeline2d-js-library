# JS library: Timeline2D

## Library description
The library allows developers to generate a 2-dimensional timeline, where one dimension is the unidirectional time flow, while the other dimension is the discrete categories of events. The library helps developers to figuratively compare events of different categories happened during the same time. With the help of this library, developers can spend more time on gathering information on the events they want to compare rather than coding the timeline by themselves. The category can be different things in different use cases. If the developer wants to build an education website about world history, the category can be different countries and the timeline will compare major historical events occurring around the world at the same time. If the developer wants to build a promotion web platform for companies, the category can be different products, and the timeline will show the date of different product releases or company events. If the developer wants to build a project milestone tracker for individual usage, the category can be different projects and the timeline will track the date of milestones and deadlines of different project.


## Landing Page Link:
https://still-tundra-45710.herokuapp.com

## Getting Started
### Load Timeline2D
Before doing anything, you will first need to load the library. There are two files need to be loaded: Timeline2D.js (source code file) and Timeline2D.css (style sheet file).

Load Timeline2D library by putting the following code inside your html <head> tag (or other similar approaches):

```
            <link rel="stylesheet" href="https://still-tundra-45710.herokuapp.com/Timeline2D.css"/> 
            <script defer src="https://still-tundra-45710.herokuapp.com/Timeline2D.js"></script> 
```
        
### Create your first 2D timeline
After you have loaded the library, you can create your first timeline by first running the following code:

 ```
                let timeline = new Timeline2D();
 ```
 
Right now, you won't see any timelines generated on you web page (don't worry!). Variable timeline is an object defined by Timeline2D.js which stores all the information needed to generate a timeline. The timeline is not generated until you call the function render() on the object timeline as shown below:

```
                timeline.render('body', 1000);
```

Now you should see a light blue timeline on you webpage. The render() function takes in two arguments. The first one indicates where this timeline should be generated. In this case we indicate that we want the timeline to be generated inside the <body> tag. Timeline2D library uses the function querySelector() on the string to fetch the corresponding DOM element, so you can change it to other strings (e.g. ".class", "#id") to render the timeline in different places. The second argument represents how long the timeline should be (in pixels). Here we indicate that the time line should be 1000 pixels long.

The current timeline does not do much as it has no timeline events added to it. So let's regenerate a timeline with some events in it.

```
                let timeline = new Timeline2D();
                
                timeline.addTimelineEvent('First Event', 'This is my first timeline event!!', 'my first category', '2021-04-12');
                timeline.addTimelineEvent('Second Event', 'Here is another event', 'my first category', '2022-04-12');
                timeline.addTimelineEvent('Third Event', 'Another one but in different category!', 'my second category', '2023-04-12');
                
                timeline.render('body', 1000);
```    

You should have generated a timeline with interactive events on it. Try to click on the dots to see the a longer description of the events. Different event category is distinguished by the color of the dot and its distance from the timeflow arrow. Events of the same category will have the same color and same distance away from the timeflow. You can also click on the zoom in/out button and the left/right button to focus on different time periods.

Here we have used function addTimelineEvent() on the object. It takes in 4 arguments. The first one indicates the title of the event. The second one is a longer description of the event. The third one indicates which category this event belongs to. The forth on indicates when does the event happen. The time format is YYYY-MM-DD. You need to add all events you want to display before you call the render() function.

Now you have created your first 2D timeline! See more about the library on [Documentation & API](https://still-tundra-45710.herokuapp.com/documentation.html).

## FUll Documentation Link
https://still-tundra-45710.herokuapp.com/documentation.html
