# Frontend Task - Build a React app that fetches and renders the list of dashboards available to a user

## The process
I have to be honest and say that I overcomplicated things at first and had to start over a couple of times. The first times I tried making the collapsible cards without using any libraries and spent way too much time on the styling and never got the functionality to work properly. I also had some problems with the API and couldn't render the data I expected. After adding a lot of console logs to analyze where it went wrong, I was finally able to make it work.  

### Conditional rendering
I implemented a lot of conditional rendering to make sure that the data was fetched before rendering the page and that no unnecessary API calls were made. There were also quite some differences in the data I got from the API, so I had to make sure that the data was rendered correctly and only the data I wanted was displayed.

### Material UI & Styling
I decided to use Material UI. I had actually never used it before but I had heard that it's easy to use and really wanted to give it a go. I found MUI's Accordion component, which seemed like a good way to display the data. 
It was a bit tricky at first to understand how to override the styling on the Accordion, and I could probably be prouder of my CSS-file. 
I also had to change so that the accordion only expanded when clicking on the expand button and not the whole card, since starring a dashboard would otherwise be impossible without expanding and collapsing the card at the same time.

## Thoughts
There were some things I wanted to do, but didn't have time for, like getting the unit tests to work (had problems with getting the Jest config to work) and a filter function. I tried to implement a filter function, but it didn't work as I wanted it to and unfortunately I didn't have time to fix it. 

I've learned a lot during this process and I'm happy with the result, even though there are some things I would like to improve and add.

Thank you for this opportunity!

## View it live
https://radiant-trifle-bfdc68.netlify.app/



