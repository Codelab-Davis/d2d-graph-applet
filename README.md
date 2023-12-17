![396shots_so](https://github.com/Codelab-Davis/d2d-graph-applet/assets/81405395/209c3ad2-1e34-45d8-9ec0-fdd36b4dac15)


# Developer Setup

1. Clone this repository with `git` in whichever way you are most comfortable with
(Make sure you will be able to push later)  
2. Make sure that you have Node.js installed on your computer or [install it here](https://nodejs.org/en/download/)  
3. Open up the directory/folder in Terminal, Powershell, or Command Prompt and run `npm i` to install dependencies.  
4. Create a file named `.env` at the root of the project and insert the environment variables into it in the
format `VARIABLE_NAME=VARIABLE_VALUE`.  
   * A `template.env` has been provided with the keys you need to fill out or change
5. Start the frontend with `npm start` or the backend with `nodemon server`  
   * The script should then automatically restart itself whenever changes are detected.

# Developer Guidelines
To ensure you are consistently creating a new branch with the latest version of the dev branch, execute the following commands:
### Copy the entire dev branch from the GitHub repository to a new local branch
```git branch local-branch origin/dev```
### Switch to the newly created local branch
```git checkout local-branch```
Now, you can proceed to work on your task on this branch. 
### Install npm packages
Additionally, it's advisable to run the following command each time you create a new branch:
```npm install```
This ensures that your local environment is up to date with the dependencies required for your project.

### Branch Naming
<aside>
💡 Ensure frequent commits (Suggestion - after finishing for the day or every hour).
</aside>
Branch naming is **crucial! Always adhere to kebab case. Every branch should be named as [TICKET NUMBER]-descriptive-title. For instance, if the Jira task is "D2D-8," name it as [8]-descriptive-title.

Pull Requests
Follow standard procedures when approaching pull requests.

Use a pull request template, which will be created and pushed soon.


## Creating a New Branch from Dev

To ensure you always work with the latest version of the dev branch, follow these commands:

```bash
# Copy the entire dev branch from the GitHub repository to a new local branch
git branch local-branch origin/dev

# Switch to the newly created local branch
git checkout local-branch

## **Jira Issue ticket number and link**

## **Type of change**

Please delete options that are not relevant.

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] This change requires a documentation update

## **Detailed Description**
Enter the purpose here

## **Attach any relevant Screenshots of Before -> After**
Attach here

## **Checklist before requesting a review**
- [ ] I have performed a self-review of my code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] I need to delete the branch once I get the PR approved if a feature is done
- [ ] I will include relevant pictures to better understand the PR
Include three main components in every pull request:

Ticket - link to the Jira ticket for reference
Purpose - outline the goals the PR achieves and how
Screenshots - Images of the changes or screenshots of the code editor for structural changes
When possible, all developers should approve.

Read the code and offer suggestions.
Don't overly stress about addressing comments unless they're crucial or time permits.
Merging PR
Once all developers have approved, the author of the PR will be asked to merge it.
Delete all merged branches.
This simplifies the review of merged PRs for unaddressed changes later on.


## Linting
To lint the frontend, run the following command:

```npm run lint```

To run the linter and fix all the errors, run the following command:

```npm run lint:fix```

# The Final Product

https://youtu.be/-VYYTWQ2Xqc?feature=shared

# The Client

The Siegel Lab, led by Dr. Justin B. Siegel at the Genome Center, is spearheading the Design 2 Data (D2D) project. This initiative focuses on acquiring precise kinetic and thermal stability data for previously unexplored mutant enzymes.

The central goal of this research is to unravel the intricate relationship between protein structure and function. Ultimately, the aim is to harness this understanding to design proteins with advantageous properties.

# Our Task

Our task within the framework of D2D was to develop a web application aimed at streamlining the calculation of enzyme reaction rates and generating graphs from student-generated data. Our focus was on efficiently identifying the steepest slope in absorbance data collected at various timepoints that was collected using a spectrophotometer.

*The over-arching objective of this project was to provide a user-friendly solution, enabling students from all D2D institutions to effortlessly gather high-quality data on enzyme functionality.*

# Timeframe

September — December 2023 | 6 weeks

# Tools

**Design —** Figma

**Development —** React, Tailwind-CSS, Chart.js, React-Joyride

**Maintenance —** Jira, Notion, Slack, Github

# Design System

To maintain a consistent brand identity with D2D, We took color inspiration from their website that utilized different shades of teals and oranges. We used teal for the majority of the design and orange draw attention to buttons and interactions, ensuring the colors met the WCAG accessibility standards. We also utilized components for the tables and graphs for scalability and for the interactive buttons and icons to keep the design minimalistic but intuitive for the user.

We chose Manrope as our primary font because of it’s simplicity and readability that makes it ideal for our data visualizations and text. Its modern aesthetic also further enhances the overall design.
<img width="2151" alt="Group 1000000862 (1)" src="https://github.com/Codelab-Davis/d2d-graph-applet/assets/81405395/961e574b-9f5b-4762-a278-975dcee4ee4c">

# **Input parsing**

Parsing the spreadsheet data from a Google Sheet was accomplished with the public-google-sheets-parser API. After providing a sheetID, a JSON containing the sheet data is returned. The returned object stores reaction rate data as an array of JSONs, with unique combinations of a letter between A-H and numbers between 1–12 that represent each trial.

```tsx
function getData(data:[]){
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  for (let dataIndex = 0; dataIndex < data.length; dataIndex++ ){
    for (let letter = 0; letter < letters.length; letter ++) {
      for (let number = 0; number < numbers.length; number ++) {
        let substrate = letters[letter] + numbers[number];
        // console.log(data[dataIndex][substrate]);

        if (dataIndex == 0) {
          substrateData.set(substrate, []);
        }
        substrateData.get(substrate)?.push(data[dataIndex][substrate])
      }
    }
  }
  console.log(substrateData.get('A1'));
}
```

# Rate Calculations

In each substrate trial, a comprehensive set of 18 data points is gathered, captured at one-minute intervals ranging from 0 to 17 minutes. The determination of the maximal rate involves the analysis of three consecutive data points, wherein the slope is derived through the application of the least squares regression. To illustrate, consider a trial conducted for a specific substrate, and let’s walk through the procedural steps involved in this process.

```tsx
function maxSlope(substrateData:Map<string, number[]>, substrate:string){
  const window:number[][] = [];
  let data:number[] = substrateData.get(substrate)!;
  let maxSlope = -Infinity
  let tempSlope = -Infinity
  for (let i = 0; i < data.length; i ++){
    if (window.length < 3) {
      window.push([i, data[i]]);
    }
    else{
      tempSlope = findSlope(window);
      maxSlope = Math.max(maxSlope, tempSlope);
      window.shift();
      window.push([i, data[i]]);
    }
  }

  tempSlope = findSlope(window);
  maxSlope = Math.max(maxSlope, tempSlope);

  return maxSlope;
}

function findSlope(points:number[][]) {
    let size = points.length;
    let sumx = 0;
    let sumxsquard = 0;
    let sumy = 0;
    let sumxy = 0;

    for (let i = 0; i < points.length; i++){
      let x = points[i][0];
      let y = points[i][1];

      sumx += x;
      sumxsquard += x * x;
      sumy += y;
      sumxy += x * y;
    }
    let slope = (size * sumxy - sumx * sumy) / (size * sumxsquard - sumx * sumx);
    return slope;
  }
```

# Rendering Charts

For the project, we needed to showcase 32 graphs representing substrates’ decay rates. Leveraging the Chart.js library for its simplicity, React.js compatibility, customization options, and responsiveness, we started by creating a versatile chart component using the Line component from Chart.js. This component dynamically rendered three substrates’ rates based on props, including data from a Google Spreadsheet, x and y-axis specifications, and styling to align with design guidelines.

```tsx
<div className="relative w-[98%]"><Graph substrateData={props.substrateData} substrates={val} title={`${val}`}></Graph></div>
```

Once successful with a single graph, we streamlined the process for the remaining 31. Utilizing a table component, we mapped cells to their respective graphs for efficient population. Each Graph component received substrate data and names as props, residing in its div element with responsive styling. By following Chart.js recommendations for resizing, our graphs seamlessly adjusted to varying screen sizes, ensuring an aesthetically pleasing and responsive display.

# Product Walkthrough

We designed the website to be as intuitive as possible, especially for new users. But, in case the user is unsure about any parts of the website, we decided to include a walkthrough that highlights important parts of the webpage and how the user can interact with it. This was implemented using React Joyride, a React library for guided tours of a webpage. The tour works by applying a spotlight on an element in the webpage, and provides useful notes for the user.

We started with getting React Joyride integrated with our app, which required some thought in terms of managing states relevant to the tour setup and passing it to the right components on the page. Then, we setup the steps of the tour, which highlights the workflow of the app. It starts with the user input for the Google Sheets URL, then after displaying some useful information about finding the correct link to upload, the tour highlights the rest of the app including the table, graphs, and how the user can interact with these and download them if desired.

# Challenges

![Team meetings/ General meeting/ Final Presentations / CodeLab Banquet ‘23](https://cdn-images-1.medium.com/max/1600/1*sgRUf7d0NxU9MjVBoyVrCg.png)

Team meetings/ General meeting/ Final Presentations / CodeLab Banquet ‘23

## Development

1. ***Parsing/Storing Data Efficiently:*** One of the initial challenges was that we had to devise efficient algorithms and data structures to ensure seamless data processing and storage, avoiding bottlenecks that could hamper performance.
2. ***Integrating Chart.js with Vite:***The decision to use Chart.js for data visualization came with its own set of challenges, especially when integrating it with the Vite build tool.
3. ***One Developer less:***Losing a team member midway through the development phase was an unforeseen setback and the team had to redistribute workloads.
4. ***Limited Data:***Working with limited data presented challenges in accurately simulating real-world lab scenarios. As a result, we were unable to refine or fine-tune the model to different input scenarios.

## **Design**

1. ***Lack of User Testing:*** The absence of thorough user testing became apparent during the later stages of design. This oversight led to issues that could have been identified earlier through user feedback.
2. ***New Design Practices:*** Adopting new design practices introduced a learning curve for designers unfamiliar with creating UI/UX for scientific applications. The transition necessitated training and adjustment to unfamiliar methodologies.
3. ***Accessibility in Mind:*** Integrating accessibility considerations into the design process was a critical aspect we overlooked. The designers had to reassess the software’s design and functionality to ensure it was inclusive and accessible to all users.

# Takeaways
![Team meetings/ General meeting/ Team Dinner/ CodeLab Banquet ‘23](https://cdn-images-1.medium.com/max/1600/1*wXywfy093L9Yg2E5PJRj3A.png)

Team meetings/ General meeting/ Team Dinner/ CodeLab Banquet ‘23

1. ***Importance of Work Environment:*** Among the various teams I’ve been a part of, this one was notably enjoyable. It felt more like collaborating with a close-knit group of friends to create something exciting, rather than adhering to the typical work setting. Building friendships within this team proved to be one of the most rewarding aspects of this experience.
2. ***Client Communication:*** It’s not always just about coding; it’s about really getting what our clients want. Keeping them in the loop and making sure we’re on the same page builds a solid foundation of trust. Even though none of us were bio lab experts, we took the plunge and reached out to our client multiple times to get the basics right. Big shoutout to Ashley for being an amazing client throughout.
3. ***Feedback is Key:*** Feedback was our secret sauce, coming from both our team and external sources. The client’s feedback guided us on our development journey, making sure we’re spot-on with user expectations. And even though lab testing didn’t pan out, big thanks to our professors and CodeLab pals for their game-changing feedback! No matter how many hours you ideate with your team, someone else’s perspective can sprinkle magic on your product, so keep those ears wide open!
4. ***Staying Organized:*** Organization isn’t just a buzzword; it’s a practical necessity. We hopped on the project management tools, version control, and meeting notes train because it seemed like the thing to do. Little did we know how much it would actually help us when things got crazy towards the end. It taught us the importance of sticking with being organized, and you can bet we’re keeping it up from now on.
5. ***Learning Never Stops:*** It might sound a bit contradictory, but our team worked well together not only because we shared a lot in common, but also our uniqueness. Each of us brought our own special talents to the table, yet there was never a hint of showing off — it was always about embracing and learning from one another. No matter our roles, we seamlessly worked together as a unit.

# Closing Remarks ✨

As we wrap up our D2D project journey, it’s a moment to reflect on the challenges we faced, the lessons we learned, and the bonds we forged. From parsing and storing data efficiently to integrating third-party libraries and overcoming unexpected setbacks, each challenge played a crucial role in shaping the final product. If you made it this far into the article, I appreciate it because you’ve just read about a journey that wasn’t always lines of code and pages of Figma. We shared many good memories, lots of laughter, and learnings that we will cherish forever.

<img width="1890" alt="Group 51" src="https://github.com/Codelab-Davis/d2d-graph-applet/assets/81405395/146b7455-bc7e-4872-87ad-dba3afa0f356">

