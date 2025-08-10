const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksEl = document.getElementById('tasks');
const clearBtn = document.getElementById('clearBtn');
const countEl = document.getElementById('count');

let tasks = JSON.parse(localStorage.getItem('todo.tasks') || '[]');

function save(){
  localStorage.setItem('todo.tasks', JSON.stringify(tasks));
  render();
}
function render(){
  tasksEl.innerHTML = '';
  tasks.forEach((t, i) =>{
    const li = document.createElement('li');
    li.className = 'task' + (t.done ? ' completed' : '');

    const checkbox = document.createElement('button');
    checkbox.className = 'checkbox';
    checkbox.setAttribute('aria-pressed', String(!!t.done));
    checkbox.innerHTML = t.done ? '✓' : '';
    checkbox.addEventListener('click', ()=>{ tasks[i].done = !tasks[i].done; save(); });

    const text = document.createElement('div');
    text.className = 'text';
    text.textContent = t.text;

    const actions = document.createElement('div');
    actions.className = 'actions';

    const del = document.createElement('button');
    del.className = 'icon-btn';
    del.innerHTML = '🗑';
    del.addEventListener('click', ()=>{ tasks.splice(i,1); save(); });

    actions.appendChild(del);
    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(actions);
    tasksEl.appendChild(li);
  });
  countEl.textContent = tasks.length + (tasks.length === 1 ? ' task' : ' tasks');
}
function addTask(text){
  const trimmed = text.trim();
  if(!trimmed) return;
  tasks.unshift({text:trimmed, done:false});
  save();
}
addBtn.addEventListener('click', ()=>{ addTask(taskInput.value); taskInput.value=''; taskInput.focus(); });
taskInput.addEventListener('keydown', (e)=>{ if(e.key === 'Enter'){ addTask(taskInput.value); taskInput.value=''; }});
clearBtn.addEventListener('click', ()=>{ tasks = tasks.filter(t=>!t.done); save(); });
render();