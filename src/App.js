import React, {useState} from "react";
import classes from "./App.module.css";

const App=()=> {
  const [boards, setBoards] = useState([
    {
      id: 1,
      items: [
        { id: 1, text: "hello1" },
        { id: 2, text: "hello2" },
        { id: 3, text: "hello3" },
      ],
    },
    {
      id: 2,
      items: [
        { id: 4, text: "hello4" },
        { id: 5, text: "hello5" },
      ],
    },
    {
      id: 3,
      items: [{ id: 6, text: "hello6" }],
    },
  ]);
  const [currentBoard, setCurrentBoard] = useState(null)
  const [currentItem, setCurrentItem] = useState(null)

    const dragOverHandler = (e)=>{
      e.preventDefault()
      if(e.target.className=='item'){
        e.target.style.boxShadow='0 2px 3px gray'
      }
    }
    const dragLeaveHandler = (e)=>{
      e.target.style.boxShadow='none'
    }
    const dragStartHandler = (e, board, item)=>{
      setCurrentBoard(board)
      setCurrentItem(item)
    }
    const dragEndHandler = (e)=>{
      e.target.style.boxShadow='none'
    }
    const dropHandler = (e, board, item)=>{
      e.preventDefault()
      const currentIndex = currentBoard.items.indexOf(currentItem)
      currentBoard.items.splice(currentIndex, 1) 
      const dropIndex = board.items.indexOf(item)
      board.items.splice(dropIndex + 1, 0, currentItem) 
      setCurrentBoard(boards.map(b=>{
        if(b.id ===board.id){
          return board
        } 
        if(b.id===currentBoard.id){
          return currentBoard 
        }
        return b
      }))
    }

    return (
      <div className={classes.App}>
        {
          boards.map(board=>{
            return(
            <div key={board.id} className={classes.board}
>
              {
                board.items.map(item=>{
                  return(
                    <div 

                    key={item.id}
                    className={classes.item}
                    draggable={true}
                    onDragOver={e=>dragOverHandler(e)}
                    onDragLeave={e=>dragLeaveHandler(e)}
                    onDragStart={e=>dragStartHandler(e, board, item)}
                    onDragEnd={e=>dragEndHandler(e)}
                    onDrop={e=>dropHandler(e, board, item)}
                    >
                        {item.text}
                    </div>
                  )

                })
              }

            </div>)
          })
        }

      </div>
    );
  }

export default App;
