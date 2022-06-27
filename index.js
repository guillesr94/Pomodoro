let ArrayTasks=[]
let time=null;
let timer=null;
let timeBox = document.getElementById("timeBox");
let title = document.getElementById("title");
let inputContainer = document.getElementById("inputContainer");
let input = document.getElementById("input");
let btnSubmit = document.getElementById("btnSubmit");
let task = document.getElementById("task");
let html=null;
let intervalo;
let id;
let btnStart;

btnSubmit.addEventListener("click",()=>{
    value=input.value;
    if(value!==""){
        AddTask(value);
        input.value=""
        updateTask();
    }
})

function AddTask(value){
    newTask={
        id:Math.floor(Math.random()*1000),
        title:value,
        completed:false
    }
    ArrayTasks.unshift(newTask)
}

function updateTask(){
  let html = ArrayTasks.map(task=>{
     return `
     <div class="is-flex is-justify-content-space-between my-5 is-size-2">
     <div>${task.title}</div>
     <div ${task.completed?`
     <button class="button">Completado </button` :`<button class="button btnStart" data-id=${task.id}> Empezar</button`}> 
     </div>
     </div>`
  })

  task.innerHTML=html.join(" ");

  btnStart = document.querySelectorAll(".btnStart")

  btnStart.forEach(start => {
    start.addEventListener("click",(e)=>{
    id= e.target.getAttribute(`data-id`);
    handlerTime(id);
    current = e.target;
    e.target.textContent="En proceso";
    })
  });
}   

function handlerTime(id){
    if(!timer){
      timer=true;
      restartTime(id);
    }
}

function restartTime(){
  
  index = ArrayTasks.findIndex(task=>task.id == id);
  title.textContent = `Realizar tarea: ${ArrayTasks[index].title}`;
  time=60*25;
  
  timer = setInterval(()=>{
    seconds = time%60;
    minutes = Math.floor(time/60);
    time--;
      timeBox.textContent =`${minutes<10?"0":""}${minutes}:${seconds<10 ?"0":""}${seconds}`;
      if(time==0){
        stopTime();
        timeBreak()
        
      }  
  },1000)
}


function timeBreak(){
  title.textContent = "Descanso";
  time=60*15;
  timer = setInterval(()=>{
  time--;
  seconds = time%60;
  minutes = Math.floor(time/60);
  timeBox.textContent =`${minutes<10?"0":""}${minutes}:${seconds<10 ?"0":""}${seconds}`;
  if(time == 0){
    stopTime();
    current.textContent="Empezar";
    title.textContent="";
    timer=null;
  }
  },1000)

}

function stopTime(){
      clearInterval(timer)
    }