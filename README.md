# intus-rectangle-manipulator

Task:
Create a webpage, for drawing rectangle SVG figure.
Near to the figure display the perimeter of the figure.

Requirements
The initial dimensions of the SVG figure needs to be taken from JSON file.
The user should be able to resize the figure by mouse.
Near to the figure display the perimeter of the figure.
After resizing, system must update JSON file with new dimensions.
Implement by using Angular (frontend) and C# (for JSON saving through API).
Provide the source code with readme file.


The app features a window that is resizable. Showing it's perimeter, area and side information.

To run the application, use ng-serve in the Angular directory.
Without the API running, it will provide basic functionality but will tell you it cannot load/save data.

If the API is running, it will load and save to the json file that is kept by the API.
To run the API, use the command dotnet run in the API directory.

Things I would like to improve, but not here due to time-restrictions:
- Configuration, settings like minimum width, maximum width, and border margins in the drawing area are hard coded.
- More abstractions in general, use of interfacing
- Now we save directly to the json file in the API directory, I would make a database which would save the rectangle.
