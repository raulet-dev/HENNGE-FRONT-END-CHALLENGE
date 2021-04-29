# REPORT.md for HENNGE Front End Challenge
Being a fresh graduate from a programming school, I haven’t gained much practical experience in coding, mostly in C #  but I am earning to code with React and JavaScript as well.

Given such professional background above, I have been copying with a couple of difficulties to accomplish this challenge.

Even though I got understanding of the requirements of these missions fully and planned ahead important steps for execution, some unexpected bumps happened on my way.

For instance, I firstly struggled to understand how the callbacks from child to parents work, it took me some time to understand how it works.

From my knowledge, I could figure out how to send values from parent to child  (`target={value}`), but I don’t know how to do in the opposite way.
So I found it was in a similar way but this time instead of value I point to a function that point to a parent target. (parent: `parentCallback={this.valueFromChildFunction}` child: `function f(props, value){props.parentCallback(value)}`).

```seq
parent->child: target={value}
parent->child: parentCallback={this.valueFromChildFunction}
child-->parent: ()=>{props.parentCallback(value)}
```

Second problem that I had was with the states, because the differences between react with classes and react with hooks, It took me like a day to realize the differences and understand them.

At the beginning I was using useState with react Hook, but when trying to do many things most of the examples I found when searching for info, were using class methods, when I mixed both I realized I couldn’t use useState and construct state at same time, so I reworked my components to work as a class, and used most of them in that way

Finally I got problems with update components.

When I was using any of my states changes it was changing all the time one step late, for example when I push to search button, it worked when I click for second time and not at the first time. So after some research I found I need to refresh the state after the change to force the component to update, to do that I just make a function that change from true to false every time I call for it, so it force state to refresh(`this.setState(refresh: !this.state.refresh)`) , also had to add extraData to flatlist, to force the list to update.

After going through all above struggles at beginner level, I have learnt deeply how React works, and the way to use it better in the future.

I would like to thank you for giving me this opportunity of challenging myself on completing this mission, I did enjoy the time of going through all difficulties and roadblocks. also It has been a great chance for me to improve my practical coding and solving-problem skills .