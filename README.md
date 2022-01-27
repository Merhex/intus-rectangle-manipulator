# intus-rectangle-manipulator

## Task
Create a webpage, for drawing rectangle SVG figure.
Near to the figure display the perimeter of the figure.

## Requirements
The initial dimensions of the SVG figure needs to be taken from JSON file.
The user should be able to resize the figure by mouse.
Near to the figure display the perimeter of the figure.
After resizing, system must update JSON file with new dimensions.
Implement by using Angular (frontend) and C# (for JSON saving through API).
Provide the source code with readme file.

## Execution
##### Description
The app features a window that is resizable. Showing it's perimeter, area and side information. The size is represented in meters.
The window is saved when you will stop resizing the window, after a second it will give you the pop-up of a succesful save.

##### Running steps
To run the application, first you will need to download the packages by running ```npm i``` in the Angular directory.
Afterwards, use the  ```ng-serve``` command in the same directory to run the application.
Without the API running, it will provide basic functionality but will tell you it cannot load/save data.

If the API is running, it will load and save to the json file that is kept by the API.
To run the API, use the command ```dotnet run``` in the API directory.

##### Improvements
Things I would like to improve, but not here due to time-restrictions:
- Configuration, settings like minimum width, maximum width, and border margins and save intervals in the drawing area are hard coded.
- Use a data resolver for the data in Angular.
- More abstractions in general, use of interfacing. Create a mapping between data and functional model. Hide the implementation detail of getting the JSON behind a repository or service.
- Now we save directly to the json file in the API directory, I would make a database which would save the rectangle.
