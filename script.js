// =========================
// CLOCK & GREETING
// =========================

function updateClock() {

    const now = new Date();

    // Jam
    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("en-US", {
            hour12: false
        });

    // Tanggal
    document.getElementById("date").innerHTML =
        now.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

    // Greeting
    let hour = now.getHours();

    let greeting = "";

    if(hour < 12){

        greeting = "☀️ Good Morning";

    }else if(hour < 17){

        greeting = "🌤 Good Afternoon";

    }else if(hour < 20){

        greeting = "🌇 Good Evening";

    }else{

        greeting = "🌙 Good Night";

    }

    document.getElementById("greeting").innerHTML = greeting;

}

updateClock();

setInterval(updateClock,1000);


// =========================
// POMODORO TIMER
// =========================

let totalSeconds = 25 * 60;

let timer;

let running = false;

const timerDisplay = document.getElementById("timer");

function showTimer(){

    let minutes = Math.floor(totalSeconds / 60);

    let seconds = totalSeconds % 60;

    timerDisplay.innerHTML =
        String(minutes).padStart(2,"0") + ":" +
        String(seconds).padStart(2,"0");

}

showTimer();

document.getElementById("startBtn").onclick = function(){

    if(running) return;

    running = true;

    timer = setInterval(function(){

        if(totalSeconds > 0){

            totalSeconds--;

            showTimer();

        }else{

            clearInterval(timer);

            running = false;

            alert("🎉 Time's Up!");

        }

    },1000);

}

document.getElementById("stopBtn").onclick = function(){

    clearInterval(timer);

    running = false;

}

document.getElementById("resetBtn").onclick = function(){

    clearInterval(timer);

    running = false;

    totalSeconds = 25 * 60;

    showTimer();

}// =========================
// TO DO LIST
// =========================

const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Tampilkan semua tugas
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task-item";

        li.innerHTML = `

            <div class="task-left">

                <input type="checkbox"
                    ${task.done ? "checked" : ""}
                    onchange="toggleTask(${index})">

                <span class="${task.done ? "completed" : ""}">
                    ${task.text}
                </span>

            </div>

            <div class="task-buttons">

                <button class="edit-btn"
                    onclick="editTask(${index})">
                    Edit
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">
                    Delete
                </button>

            </div>

        `;

        taskList.appendChild(li);

    });

}

// Tambah tugas
addTask.onclick = function(){

    const text = taskInput.value.trim();

    if(text === ""){

        alert("Masukkan tugas terlebih dahulu!");

        return;

    }

    // Prevent duplicate
    if(tasks.some(task => task.text.toLowerCase() === text.toLowerCase())){

        alert("Tugas sudah ada!");

        return;

    }

    tasks.push({

        text:text,

        done:false

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));

    taskInput.value="";

    renderTasks();

}

// Hapus
function deleteTask(index){

    tasks.splice(index,1);

    localStorage.setItem("tasks",JSON.stringify(tasks));

    renderTasks();

}

// Checklist
function toggleTask(index){

    tasks[index].done=!tasks[index].done;

    localStorage.setItem("tasks",JSON.stringify(tasks));

    renderTasks();

}

function editTask(index){

    const li = taskList.children[index];

    const span = li.querySelector("span");

    const buttons = li.querySelector(".task-buttons");

    const input = document.createElement("input");

    input.type = "text";
    input.value = tasks[index].text;
    input.className = "edit-input";

    span.replaceWith(input);

    input.focus();

    buttons.innerHTML = `
        <button class="save-btn">Save</button>
        <button class="delete-btn" onclick="deleteTask(${index})">
            Delete
        </button>
    `;

    buttons.querySelector(".save-btn").onclick = function(){

        const value = input.value.trim();

        if(value==="") return;

       tasks[index].text = value;

        localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

    };

}
// Update greeting agar memakai nama
function getGreetingText(hour){

    let greeting = "";

    if(hour < 12){
        greeting = "☀️ Good Morning";
    }else if(hour < 17){
        greeting = "🌤 Good Afternoon";
    }else if(hour < 20){
        greeting = "🌇 Good Evening";
    }else{
        greeting = "🌙 Good Night";
    }

    const name = localStorage.getItem("userName");

    if(name){
        greeting += ", " + name + " 👋";
    }

    return greeting;

}
// =========================
// QUOTE OF THE DAY
// =========================

const quotes = [

    "Success comes from consistency, not perfection.",

    "Small progress is still progress.",

    "Stay focused and never give up.",

    "Dream big, start small, act now.",

    "Discipline is the bridge between goals and achievement.",

    "Learning today creates opportunities tomorrow.",

    "Believe in yourself and keep moving forward.",

    "Every expert was once a beginner."

];

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

document.getElementById("quote").textContent = randomQuote;
