import React from "react";
import classes from "./DropItem.module.css";
import { useDrag, DragSource, useDrop } from "react-dnd";

const itemSourse = {
  beginDrag(props) {
    return {text:"component"};
    // return props.item
  },
  endDrag(props, monitor, component) {
    // return () => {
    //   console.log("end");
    // };

    return props.deleteHandler(props.item.id, props.index)
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

const DropItem = ({item, deleteHandler,connectDragSource,isDragging} ) => {
  const [collectedProps, drop] = useDrop({
    accept: "true"
  })

  let opacity = isDragging? 0 : 1
  return connectDragSource(
    <div className={classes.DropItem} style={{opacity}} ref={drop} >
      {item.text}
    </div>
  )
};

export default DragSource("item", itemSourse, collect)(DropItem);
