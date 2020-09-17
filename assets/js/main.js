document.querySelector('.burger').addEventListener('click', burgMachine);

function burgMachine(){
   const burger =  document.querySelector('.navbar-burger');
   burger.style.display = 'block';
   burger.style.left = '0';
   document.querySelector('.transparent').style.display = 'block';
}

document.querySelector('.close').addEventListener('click', dessimateNavWall);
document.querySelector('.transparent').addEventListener('click', dessimateNavWall);


function dessimateNavWall(){
   const burger =  document.querySelector('.navbar-burger');
   burger.style.display = 'none';
   document.querySelector('.transparent').style.display = 'none';
}


document.querySelector('#search-icon').addEventListener('click', searchMachine);

function searchMachine(){
   const search =  document.querySelector('.search-container');
   search.style.display = 'block';
   document.querySelector('.transparent').style.display = 'block';
}

document.querySelector('.transparent').addEventListener('click', transCloseMach);

function transCloseMach(){
   const search =  document.querySelector('.search-container');
   search.style.display = 'none';
   document.querySelector('.transparent').style.display = 'none';
}