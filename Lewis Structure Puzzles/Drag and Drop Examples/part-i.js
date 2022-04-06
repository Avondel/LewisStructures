(function(){
  //each dragable element needs this for its dragstart event
	var dragStartHandler = function (ev) {
	  ev.originalEvent.dataTransfer.setData("Text", ev.target.getAttribute('id'));
	},
  //each droppable element needs this for its dragover event
  allowDragover = function (event) {
    //prevent the browser from any default behavior
    event.preventDefault();
  },
  //each of the four light-brown boxes at top have this bound to their drop event
  dropHandler = function (event) {
    var id = '';

    //prevent the browser from any default behavior
    event.preventDefault();

    //get a reference to the element that is being dropped
    id = event.originalEvent.dataTransfer.getData("Text");
    
    //add the hasChild class so that the UI can update
    $(event.target).addClass('hasChild');

    //move the dragged element into the drop target
    event.target.appendChild(document.getElementById(id));

    $(document.getElementById(id)).html('<i>Dropped</i>!');
  };


  $(document).ready(function(){
    //make each dragElement draggable
    $('.dragElement').attr('draggable','true');
  
    //bind the dragStartHandler function to all dragElements
    $('.dragElement').bind('dragstart',dragStartHandler);

    //bind the dragStartHandler function to all dragElements
    $('.dropElement').bind('dragover',allowDragover);

    //bind the dragStartHandler function to all dragElements
    $('.dropElement').bind('drop',dropHandler);
  })
})();