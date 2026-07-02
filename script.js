let body = document.body;
let bodytheme = document.querySelector('.theme');
let themebtn = document.querySelector('#themebtn');
let themeval = document.querySelector('span');
let showform = document.querySelector('#showform');
let closebtn = document.querySelector('#closebtn');
let formsection = document.querySelector('.form');
let form = document.querySelector('form');
let tasks = document.querySelector('.tasks')
let task = document.querySelector('.task');
let createtask = document.querySelector('#createtask');



let tasktitle = document.querySelector('#taskTitle');
let taskcategory = document.querySelector('#taskcategory');
let description = document.querySelector('#description');



console.log(themeval.innerText)


let tasksArr = JSON.parse(localStorage.getItem('data')) || [];
let updateindex = null;

// theme conversion logic
themebtn.addEventListener('click', () => {
    if (themeval.innerText === "White") {
        body.classList.toggle('theme')
        themeval.textContent = "Black"
        console.log(themeval);
    }
    else {
        body.classList.toggle('theme')
        themeval.textContent = "White"
        console.log(themeval);
    }
})


// Logic of Opening the Form
showform.addEventListener('click', () => {
    formsection.style.display = 'flex';
})



// Logic of Close the Form 
closebtn.addEventListener('click', () => {
    formsection.style.display = 'none';
})


// update task logic
function updatetask(index) {
    formsection.style.display = 'flex';
    createtask.textContent = 'Update';
    let taskcard = tasksArr[index];
    console.log(taskcard);

    tasktitle.value = taskcard.tasktitle;
    taskcategory.value = taskcard.taskcategory;
    description.value = taskcard.description;

    updateindex = tasksArr.findIndex((ele) => ele.tasktitle === taskcard.tasktitle);
    console.log(updateindex);
}


// delete task logic
function deletetask(index) {
    tasksArr.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(tasksArr));
    ui();
}


// delete completed function 
function deletecompletedtask(index) {
    completetasksArr.splice(index, 1);
    localStorage.setItem('completetasksArr', JSON.stringify(completetasksArr));
    completedtaskui();
}


let completetasksArr = JSON.parse(localStorage.getItem('completetasksArr')) || [];
let completedtasks = document.querySelector('.completedtasks');
let heading = document.querySelector("#head");
console.log(heading);

function completedtaskui() {
    completedtasks.innerHTML = '';

    completetasksArr.forEach((ele, index) => {
        if(completetasksArr[index] === null) return;
        else{
            completedtasks.innerHTML += `<div class="completedtask">
    
                    <div class="completedtaskinfo">
                        <h3> ${ele.tasktitle} </h3>
                        <h3> ${ele.taskcategory} </h3>
                        <p>  ${ele.description} </p>
                    </div>
                
                    <div class="completedtaskbtns">
                        <button onclick='deletecompletedtask(${index})' id="delete"> Delete Task </button>
                        <button onclick='completetask()' id="complete"> Completed ✅ </button>
                    </div>
    
                </div>`
        }


    })
}



console.log(completetasksArr);
// complete task logic
function completetask(index, btn) {
    completetasksArr.push(tasksArr[index]);


    localStorage.setItem('completetasksArr', JSON.stringify(completetasksArr));

    completedtaskui();
    deletetask(index);

}
console.log(tasksArr.length);
console.log(completetasksArr.length);




// UI part logic 

function ui() {
    tasks.innerHTML = '';
    tasksArr.forEach((ele, index) => {
        tasks.innerHTML += `<div class="completedtask">

                <div class="taskinfo">
                    <h3> ${ele.tasktitle} </h3>
                    <h3> ${ele.taskcategory} </h3>
                    <p>  ${ele.description} </p>
                </div>
            
                <div class="taskbtns">
                    <button onclick='updatetask(${index})' id="edit"> Edit Task </button>
                    <button onclick='deletetask(${index})' id="delete"> Delete Task </button>
                    <button onclick='completetask(${index}, this)' id="complete"> Complete Task </button>
                </div>

            </div>`

    })


}


form.addEventListener('submit', (event) => {
    event.preventDefault()


    let obj = {
        tasktitle: tasktitle.value.trim(),
        taskcategory: taskcategory.value.trim(),
        description: description.value.trim()
    }

    if (tasktitle.value.trim() !== '' && taskcategory.value.trim() !== '' && description.value.trim() !== '') {
    } else {
        alert('Invalid User');
    }

    if (updateindex !== null) {
        tasksArr[updateindex] = obj;
        updateindex = null;
        localStorage.setItem('data', JSON.stringify(tasksArr));
    } else {
        tasksArr.push(obj);
        localStorage.setItem('data', JSON.stringify(tasksArr));
    }


    console.log(tasksArr);
    console.log(obj);

    ui();


    // Local Storage logic 
    localStorage.setItem('data', JSON.stringify(tasksArr));


    form.reset();
    formsection.style.display = 'none';
})


ui();
completedtaskui();








// Event Bubbling :- the default behaviour of Javascript , which activated, when we click any child element in the HTML, this click create bubles  OR runs toward the its parent-> gradparent-> document (till document)  OR   It runs from Bottom to TOP
// let grandparent = document.querySelector('.grandparent');
// let parent = document.querySelector('.parent');

// let childbtn = document.querySelector('.child');
// childbtn.addEventListener('click',()=>{
//     console.log('child clicked');
// });

// parent.addEventListener('click',()=>{
//     console.log('parent clicked');
// });


// Event Capturing :- Event Capturing shows , how actually line by line code runs. to enalble event capturing we use  attr:property {capture:true} in parent or outer most parent. OR It runs Top to Bottom  

// childbtn.addEventListener('click',()=>{
//     console.log('child clicked');
// });

// parent.addEventListener('click',()=>{
//     console.log('parent clicked');
// }, true);






// // Event Propagation -> Event Propagation is process , Where Browser Decides how events works in the DOM tree.

// let EPform = document.querySelector('#EP');

// EPform.addEventListener('click', (e)=>{
//     e.preventDefault();
//     console.log(e.target);
// })

