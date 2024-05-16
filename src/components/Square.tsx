export const Square = ({ children, updateBoard, index }: {
    children: string | any;
    updateBoard: any;
    index: number;
    }) => {
  
    const handelClick = () => {
      updateBoard(index)
    }
  
    return (
      <figure onClick={handelClick} className='square'>
        {children}
      </figure>
    )
}

