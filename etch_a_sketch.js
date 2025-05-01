const drawingSpace = document.querySelector('.drawing-space-container');
const getRowSizeButton = document.querySelector('#submitRows');
const getRowSizeInput = document.querySelector('#rows');
let drawingSpaceRows = 16;
let drawingSpaceSize = 500;

function initDrawingSpace(gridRows){
    getRowSizeInput.value = gridRows;
    drawingSpace.innerHTML = ""; 
    drawingSpace.style.width = `${drawingSpaceSize}px`;
    drawingSpace.style.height = `${drawingSpaceSize}px`;
    const eachBoxSize = drawingSpaceSize / gridRows;
    for(let i=0; i<gridRows; i++){
        let row_div = document.createElement('div');
        row_div.classList.add('row-of-box');
        for(let j=0; j<gridRows; j++){
            let ele_div = document.createElement('div');
            ele_div.classList.add('each-box');
            ele_div.style.width = `${eachBoxSize}px`;
            row_div.append(ele_div);
        }
        drawingSpace.append(row_div);
    }

}

function modifyGrid(gridRows){
    gridRows = Number(gridRows);
    if( gridRows < 10 && gridRows > 25){
        console.log("Not allowed grid Size");
    }else{
        initDrawingSpace(gridRows);
    }
}

getRowSizeButton.addEventListener("click", () => modifyGrid(getRowSizeInput.value));
initDrawingSpace(drawingSpaceRows);

