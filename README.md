![](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# Project 1: Stack - browser-based game

### Brief

The application should:

- Use HTML, CSS and JavaScript/jQuery for DOM manipulation
- Work in a web browser


[**GitHub Repo**](https://github.com/antoni1210/Project-1-WDI)

---

### Technologies used:

- HTML5
- CSS3
- JavaScript (ES6)
- jQuery
- Git
- GitHub

---

### Screnshots and gameplay

Game start:

<img width="1383" alt="Landing page" src="https://i.imgur.com/MVjgOg4.png">
###### The game starts with one block that the user drops by pressing the spacebar. 

In-game:

<img width="1217" alt="Homepage" src="https://i.imgur.com/TVGclIl.png">
###### A new bloack that animates continuously from the left to right of the screen is introduced each time the user drops the current block. The user must try and drop this block on top of the stack. If they fail to drop it directly onto the stack, the size of the portion of the block that overlaps the edge of the stack is removed from the blocks width and subsequently the next block inherits this size.

Game over:
<img width="1217" alt="Registration page" src="https://i.imgur.com/uOmBAuH.png">
###### As the blocks become smaller it becomes trickier to drop them on the stack, until inevitably the user misses the stack completely, resulting in the end of the game.

---

### Challenges and issues

- What seemed like a relatively straightforward concept for a game soon had me scratching my head. The calculations involved in subtracting the overlap of the block from the stack were relatively straightforward, but incorporating them into the JavaScript/jQuery was a real challenge.
- I went through several iterations of code to try and get the game woking as desired.

### Wins

- When the game finally worked!
- Using jQuery for the first time was cool.

### Future developments and tweaks

- Animate the portion of the block overlap, i.e. it falling off the page rather than simply being deducted from the width.
- Add a scoreboard.
- Add some more refined styling.
