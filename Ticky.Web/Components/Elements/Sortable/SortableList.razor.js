export function init(id, group, pull, put, sort, handle, filter, component, forceFallback, direction, animation) {

    const DEBUG_MODE = true;
    if (DEBUG_MODE) {
        console.log("Init for Id:", id);
    }

    let htmlElement = document.getElementById(id);

    var sortable = new Sortable(htmlElement, {
        animation: animation,
        delayOnTouchOnly: true,
        delay: 200,
        group: {
            name: group,
            pull: pull || true,
            put: put
        },
        filter: filter || undefined,
        sort: sort,
        forceFallback: forceFallback,
        handle: handle || undefined,
        direction: direction,
        onUpdate: (event) => {
            let customChildNodes = Array.from(event.to.childNodes).filter(node => node.tagName === 'DIV');
            if (DEBUG_MODE) {
                console.log(event)
                console.log("onUpdate item:");
                console.log(event.item);
                console.log('event from: ', event.from)
                console.log('event to: ', event.to)
                console.log('event oldIndex: ', event.oldIndex)
                console.log('event newIndex: ', event.newIndex)
                console.log('event to childNodes: ', customChildNodes)
                console.log('insert before: ', customChildNodes[event.oldIndex])
            }


            if (customChildNodes.length === 1) {
                if (DEBUG_MODE)
                    console.log('ignoring move because moved into the same place')
                return
            }

            event.item.remove();

            if (event.oldIndex < event.newIndex)
                event.to.insertBefore(event.item, customChildNodes[event.oldIndex])
            else
                event.to.insertBefore(event.item, customChildNodes[event.oldIndex+1])

            // method inserts a child node before an existing child. insertBefore(newNode, referenceNode)
            // referenceNode - The node before which newNode is inserted
            //event.to.insertBefore(event.item, event.to.childNodes[event.oldIndex]);
            let oldIndex = event.oldDraggableIndex;
            let newIndex = event.newDraggableIndex

            // Notify .NET to update its model and re-render
             component.invokeMethodAsync('OnUpdateJS', oldIndex, newIndex, event.from.id);
        },
        onRemove: (event) => {
            let customToChildNodes = Array.from(event.to.childNodes).filter(node => node.tagName === 'DIV');
            let oldIndex = event.oldDraggableIndex;
            let newIndex = event.newDraggableIndex;

            let movedCardWrapper = customToChildNodes[event.newIndex]
            let movedCard = Array.from(movedCardWrapper.childNodes).filter(node => node.tagName === 'DIV')[0]
            let cardBelow = Array.from(customToChildNodes[event.newIndex + 1].childNodes).filter(node => node.tagName === 'DIV')[0]
            let cardBelowId = null
            let movedCardId = movedCard.id

            if (cardBelow)
                cardBelowId = cardBelow.id

            if (DEBUG_MODE) {
                console.log(event)
                console.log("onRemove item:");
                console.log(event.item);
                console.log('event from: ', event.from)
                console.log('event to: ', event.to)
                console.log('event oldIndex: ', event.oldIndex)
                console.log('event newIndex: ', event.newIndex)
                console.log('event oldDraggableIndex: ', oldIndex)
                console.log('event newDraggableIndex: ', newIndex)
                console.log('event to childNodes: ', customToChildNodes)
                console.log('moved card: ', movedCard)
                console.log('card below inserted: ', cardBelow)
                console.log('moved card ID: ', movedCardId)
                console.log('card below inserted ID: ', cardBelowId)
            }

            component.invokeMethodAsync('OnRemoveJS', movedCardId, cardBelowId, event.from.id, event.to.id, event.originalEvent.clientX / event.originalEvent.view.outerWidth, event.originalEvent.clientY / event.originalEvent.view.outerHeight);

        },
        onMove: (event) => {
            // This event fires continually as you drag.
            // You typically wouldn't do DOM manipulation here.
            // It's useful for preventing drops, etc.
            // If you return false, the item cannot be dropped at that position.
            // return !event.related.classList.contains('no-drop');
            return true; // Allow all moves by default
        }
    });
}
