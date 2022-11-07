## Simple modal with vanilla JavaScript

#### Disclaimer
This tutorial is aimed at people that already know the basics of HTML, CSS, and Java-script. I will not be explaining how HTML is formatted, or the styling used for the CSS. Only the core elements, so you can make something on your own.

#### What we are making
A modal is a sort of modern version of a pop-up. Anybody who has been on the internet since Vista or before would know how obnoxious it would be having web-pages open up entirely new windows to show information. Modals work similarly, except you remain on the same webpage.

As you can see below, the modal stands out of the page, and is useful for highlighting important information that you want your user to focus on without the distraction of the rest of the website.

<img width='500px' src='https://i.imgur.com/q4GQAAS.png'>

#### Getting started

You can find my example [here](apricosma.github.io/creating-javascript-modal) if you wish to inspect the full code.

The setup for the HTML is extremely simple, you only need 1 `<button>`, 2 `<div>`, and a `<span>`. 

1. Start by creating a `<button>` that will be the button you use to open the modal, and give it a class for JavaScript to easily hook onto.
2. Create a `<div>` which will be used for covering the entire background with a dim overlay, and give it a class of modal.
3. Inside of that `<div>`, create another `<div>` which will be used for the content of the modal. This is the modal its self. Give it a simple class name, like 'content'.
4. Add a `<span>` which will function as the close button for the modal. Give it a simple class, and place `&times;` insdie of it so a font-like X will display

```HTML
<!-- Button to open the modal -->
<buttton class="btn">Open modal</buttton>

<!-- The modal its self -->
<div class="modal">
    <!-- Content inside of modal-->
    <div class="content">
        <span class="close">&times;</span>
        <p>The text or content you want inside the modal</p>
    </div>
</div>
```

#### Essential CSS style

##### Background-dimming 
Start by adding some simple style to your button to make it appear as you please.
Then, the most important part, target your `.modal` class and add `display: none;` to it. Make the width and height of the element fill the screen with 100%, and give it a `background-color` with 40% or so opacity, and a near-black color.

```CSS
.modal {
    display: none; 
    position: fixed;
    z-index: 1;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(17, 17, 17, 0.396);
}
```
##### The modal
Following this, we're going to need to style our actual modal. Give the modal a `background-color` of your choice, and set `margin: auto;` and `width: 80%` so the modal has device responsiveness. You can lower the width percentage to whatever you wish, such as 40-50% for a more box-like element. 

Place the modal wherever you wish on the screen utilizing `margin-top:`, and give it some `padding`.

```CSS
.content {
    background-color: #fefefe;
    margin: auto;
    margin-top: 40px;
    padding: 40px;
    border: 1px solid #888;
    width: 80%;
}
```

##### The close button

Simply make the X button whatever size you wish, and make it a greyish color. You may give it `:hover` if you choose.

```CSS
.close {
    color: #aaaaaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}
````

With this we should have the basic styling of the page down. 

##### Making it work with JavaScript

Create basic selection functions for the sake of convenience
```JavaScript
// element selector function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// button function
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}
```

Now, we need to select all of the elements that we need to utilize.

```JavaScript
// grabbing the elements of the page
let modal = select('.modal');
let openButton = select('.btn');
let content = select('.content');
let close = select('.close');
```

Here is where we add functionality to the button. We are plugging back into our `onEvent()` function by adding `click` to the target of `openButton`, and attaching a funciton to it. Inside of our function we add `modal.style.display = 'block;`. This is what makes our modal show up by changing the display we previously set to `none`.

```JavaScript
// create button functionality
onEvent('click', openButton, function() {
    modal.style.display = 'block'; // changes modal style to visible
});
```

Next, we add functionality to our close button by adding another EventListener

```JavaScript
onEvent('click', close, function() {
    modal.style.display = 'none'; // makes the X button close the modal
});
```
Lastly, we need to make it so when the user clicks outside of the modal, the modal will close. This is important for familiarity, as sometimes people don't want to hunt for the close button.

`window.onclick` selects the entire window of your web-page. If we were to add the style change to this, then our modal will close if it's clicked on, which isn't what we want.

We exclude the modal its self with an if statement. `if (event.target == modal)` will refine the click event so that it only closes if you click on the grey of the page, since our `.modal` CSS is not the modal its self.

```JavaScript
// closes the modal if you clcik anywhere except the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}
```

With this our modal should be working. Make sure to check the console for any null selectors if you are running into issues. You can add whatever content you want inside of a modal, you can even create a mini-webpage inside of the modal its self. 