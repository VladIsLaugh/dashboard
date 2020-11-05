import React from "react"
import classes from  './DropList.module.css';
import DropItem from "../DropItem/DropItem"
import { DropTarget } from 'react-dnd'

function collect(connect, monitor){
  return {
    connectDragTarget: connect.dropTarget(),
    hovered: monitor.isOver(),
    item: monitor.getItem(),
  };
}

 const DropList = ({itemList, deleteHandler,hovered }) =>{
    // const [collectedProps, drop] = useDrop()
    const backgroundColor = hovered ? 'ligthgreen' : 'white'
 //   console.log(console.log(hovered))
  return (
    <div className={classes.DropList} style={{background: backgroundColor}} >
{itemList.list.map((item, index)=><DropItem item={item} deleteHandler={deleteHandler} index={itemList.listId} />)}

    </div>
  );
}

export default DropTarget("item",  {}, collect)(DropList)


