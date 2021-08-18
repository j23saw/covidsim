
# CovidSim

https://covidsim.herokuapp.com/

A simple web-based pandemic simulator where you can play with different parameters and study the spread of any viral disease. Since the COVID-19 outbreak was so viral, I thought if I could model the spread of the virus depending on various parameters such as:

- Population in a fixed area
- Maximum Infection Radius
- Speed of each person
- Number of people already infected

So I set out to make this project web-based to be accessible by anyone at any time. The code is entirely open-source so that anyone can contribute to this project or wants to know how the simulator works.

The tech stack used for this project:

- [p5.js](https://p5js.org/): A client-side Javascript library for making graphics on the webpage. p5.js is used for rendering the simulation on the browser.
- [ReactJS](https://reactjs.org/): A Javascript framework for building User Interfaces. The whole UI for this project was made through this library.

## About the Simulator

Each dot represents one person in the fixed area and has two indicators/states. A green color status means it is vulnerable/not infected yet and an orange color status means it has been infected. When a green dot (uninfected) comes in contact with an orange one (infected), the green dot turns into an orange one, indicating that it has caught the virus and is now infected.

Each dot traverses the whole area with a random velocity and a fixed maximum speed. This ensures that the virus spreads naturally and mimics the real-life spread as close as possible. All the dots are constrained in the rectangular area and not allowed to escape it.

The user can control **four** parameters that control the simulation and observe each parameter's effect on the rate of spread of the virus. These are:

- Population: Controls the number of dots (people) in the simulation area.
- Infected Percentage: Controls the no. of dots infected initially at the start of the simulation
- Speed: Controls the maximum speed each dot can have
- Minimum Infection Distance: Controls the radius of infection. The larger the radius, the more is the risk of transmission from the source.

These parameters can be varied through the range sliders present for each.

## How does it work?

User Interface: The user inputs the quantity for each parameter through the range sliders. The data from the sliders are then passed to the simulator with the help of the ReactJS library. Whenever any of the sliders are updated, the simulation is reset with the latest values from the user.

Simulator: Two main algorithms run the simulator

- Contact Detection Algorithm:
    1. The algorithm is really simple, it just checks the straight-line distance between each pair of a green dot and an orange dot present in the simulation area using the formula **(d=√((x<sub>2</sub>-x<sub>1</sub>)²+(y<sub>2</sub>-y<sub>1</sub>)²), where (x1, y1) is the co-ordinate of a green-dot and (x2, y2) is the co-ordinate of an orange dot)** and if this distance is lesser than the Infection Radius set by the user, the green dot which has got in contact with an orange dot will update its status from safe to infected and turn into an orange dot.
    2. To make this algorithm efficient, I've implemented the Quadtree data structure due to which the program only needs to check the distance between the nearby infected dots and not the faraway infected dots which makes the simulator run much faster.
- Random Movement Generation Algorithm:
    1. Each dot is made to move randomly in the simulation to mimic the natural movement of people in real life. I've implemented this using the 2D Vector Math functionality provided by the p5.js library.
    2. A random acceleration vector is added to the velocity vector of each dot at each frame, thus creating a true random movement of dots across the whole area.

