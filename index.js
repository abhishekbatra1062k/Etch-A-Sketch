const container=document.querySelector('.container');
var choice=3;

function createGrid(n){
    var row=[];
    for(let j=0;j<n;j++){
        row[j]=document.createElement('div');
        row[j].classList.add('row');
        container.appendChild(row[j]);
        var pixel=[];
        for(let i=0;i<n;i++){
            pixel[i]=document.createElement('div');
            pixel[i].classList.add('pixel');
            pixel[i].style.cssText=`width: ${560/n}px; height: ${560/n}px;`;
            row[j].appendChild(pixel[i]);
        }
    }
    pixels=document.querySelectorAll('.pixel');
    handleAddingEventListener();
    return pixels;    
}

function getRandomColor(){
    var letters='0123456789ABCDEF'.split('');
    var color='#';
    for(var i=0;i<6;i++){
        color+=letters[Math.floor(Math.random()*16)];
    }
    return color;
}

function getColor(choice){
    switch(choice){
        case 0: return colorPickerInput.value;
        case 1: return getRandomColor();
        case 2: return 'white';
        default: return 'black';
    }
}

const pixelSizeInput=document.getElementById('pixel-size');
pixelSizeInput.addEventListener('change', (e)=>{
    while(container.firstChild){
        container.firstChild.remove();
    }
    pixels=createGrid(parseInt(e.target.value));
    sizeLabel.textContent=`Customize Pixel Size ${pixelSizeInput.value}`;
});

var sizeLabel=document.querySelector('#size');

var pixels=createGrid(parseInt(pixelSizeInput.value));


const randomColorBtn=document.getElementById('random');
const colorPickerInput=document.getElementById('color-picker');
const clearBtn=document.getElementById('clear');
const eraserBtn=document.getElementById('eraser');

colorPickerInput.addEventListener('change', ()=>{
    choice=0;
});

randomColorBtn.addEventListener('click', ()=>{
    choice=1;
});

eraserBtn.addEventListener('click', ()=>{
    choice=2;
});

clearBtn.addEventListener('click', ()=>{
    pixels.forEach(pixel=>{
        pixel.style.background='white';
    });
});

function handleAddingEventListener(){
    pixels.forEach(pixel=>pixel.addEventListener('mouseover',()=>{
        switch(choice){
            case 0: container.style.cursor="url('./cursors/pencil.cur'), default";
                break;
            case 1: container.style.cursor="url('./cursors/rainbow.cur'), default";
                break
            case 2: container.style.cursor="url('./cursors/eraser.cur'), default";
                break;
            default: container.style.cursor="url('./cursors/pencil.cur'), default";
        }
        pixel.style.background=getColor(choice);
    }));
}