const drawingSpace = document.querySelector('.drawing-space-container');
const getRowSizeButton = document.querySelector('#submitRows');
const getResetButton = document.querySelector('#resetGrid');
const getBorderButton = document.querySelector('#borderToggle');
const getOverrideToggle = document.querySelector('#overrideToggle');
const getRowSizeInput = document.querySelector('#rows');

let overrideColors = 0;
let borderEnabled = 1;
let drawingSpaceRows = 16;
const drawingSpaceSize = 500;

//making a list of colors to randomly pick from
const colorlistChoices = ['81E7AF', 'FF90BB', 'EF9651', 'FF9149', 
    '626F47', 'FCC6FF', 'F72C5B', 'FFF100', '7C00FE', 'D2649A', 'A3D8FF',
    'F28585', 'D0F288', '00235B', '835151'
];

function chooseRandomColor(){
    let sizeOfColorsArray = colorlistChoices.length;
    let index = Math.floor(Math.random() * sizeOfColorsArray);
    return `#${colorlistChoices[index]}`;
}

function changeColor(e){
    e.currentTarget.style.backgroundColor = chooseRandomColor();
    if(!overrideColors){
        e.currentTarget.removeEventListener("mouseover", changeColor);
    }
}

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
            if(borderEnabled)
                ele_div.classList.add('each-box-bord');
            ele_div.style.width = `${eachBoxSize}px`;
            ele_div.addEventListener("mouseover", changeColor);
            row_div.append(ele_div);
        }
        drawingSpace.append(row_div);
    }

}

function modifyGrid(gridRows){
    gridRows = Number(gridRows);
    if( gridRows < 10 || gridRows > 100){
        console.log("Not allowed grid Size");
    }else{
        drawingSpaceRows = gridRows;
        initDrawingSpace(gridRows);
    }
}

function handleOverrideToggle(){
    overrideColors = 1 - overrideColors;
    if(overrideColors)
        document.querySelectorAll('.each-box').forEach( (ele) =>  ele.addEventListener("mouseover", changeColor));
    if(!overrideColors)
        document.querySelectorAll('.each-box').forEach( (ele) =>  {
                                                            let bgColor = ele.style.backgroundColor;
                                                            if(bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent')
                                                                ele.removeEventListener("mouseover", changeColor)
                                                        });
}

function handleBorderToggle(){
    borderEnabled = 1 - borderEnabled;
    document.querySelectorAll('.each-box').forEach( ele => ele.classList.toggle("each-box-bord"));
}

getRowSizeButton.addEventListener("click", () => modifyGrid(getRowSizeInput.value));
getResetButton.addEventListener("click", () => modifyGrid(drawingSpaceRows));
getOverrideToggle.addEventListener("click", handleOverrideToggle);
getBorderButton.addEventListener("click", handleBorderToggle);
initDrawingSpace(drawingSpaceRows);

