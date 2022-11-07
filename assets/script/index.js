'use strict';

// element selector function
function select(selector, parent = document) {
    return parent.querySelector(selector);
}

// button functionality
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

// grabbing the elements of the page
let modal = select('.modal');
let openButton = select('.btn');
let content = select('.content');
let close = select('.close');

// create button functionality
onEvent('click', openButton, function() {
    modal.style.display = 'block'; // changes modal style to visible
});

onEvent('click', close, function() {
    modal.style.display = 'none'; // makes the X button close the modal
});

// closes the modal if you clcik anywhere except the modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}