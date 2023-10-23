const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const button = document.querySelector('.addtask');

button.addEventListener('click', function addTask(){
if(inputBox.value === ''){
    alert("You must write something");
}
else{
    let li =document.createElement('li');
    li.innerHTML =inputBox.value;//the text in the input field
    listContainer.appendChild(li);//the inputfield will be in the listcontainer
    let span = document.createElement("span");
    span.innerHTML ="\u00d7";
    li.appendChild(span);

}
inputBox.value = "";// after typing in inputbox this clears the box
saveData();// it will save our data in the browser
});

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN"){
        e.target.parentElement.remove();
        saveData();
    }
}, false);
// to store the task
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);//whatever content in the listcontainer will be save in the broswer with the name of data
}
// to get the data back
function getData(){
    listContainer.innerHTML= localStorage.getItem("data");// it will give us the items
}
getData();