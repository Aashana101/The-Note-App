document.addEventListener("keydown", (e)=>{
    if(e.metaKey && e.key==="s"){
        e.preventDefault();
       SaveNoteData();
    }
});


const Container=document.getElementById("container");
let selectedText="", rangeAt="";
let noteData=localStorage.getItem("noteData");
readNoteData();
function readNoteData(){
    noteData=JSON.parse(noteData);
    noteData.forEach((element)=>{
        CreateNewNote(element.value);
    })
}
function CreateNewNote(e){ 
      let div=document.createElement("div");
      div.classList.add("note-row");
      let newNote=` <div class="note-row">
            <div class="note-editor" contenteditable="true" onmouseup="getSelectedText()" id="note-editor">`+e+`</div>
                <div class="note-control">
                    <div onclick="getSelectedStyle('capitalize')" class="capitalize">Aa</div>
                        <div onclick="getSelectedStyle('bold')" class="bold">B</div>
                        <div onclick="getSelectedStyle('italic')" class="italic">I</div>
                        <div onclick="getSelectedStyle('underline')" class="underline">U</div>
                        <div onclick="getSelectedStyle('linethrough')" class="linethrough">ab</div>
                        <hr/>
                        <img src="img2.png" onclick="DeleteNode(this)"/>
                </div>
            </div>`;
      div.innerHTML=newNote;
      Container.appendChild(div);
      const noteEditorData=document.querySelectorAll(".note-editor");
      noteEditorData.forEach((element)=>{
        element.addEventListener("keypress", (e)=>{
            if(e.key==="Enter"){
                document.execCommand("insertHTML", false, "<br/>");
                return false;
            }
        });
      });
}

function SaveNoteData(){
    noteData=[];
    localStorage.setItem("noteData", []);

    const noteEditorData=document.querySelectorAll(".note-editor");
    noteEditorData.forEach((element)=>{
        if(element.innerHTML!==""){
            let html={value: element.innerHTML};
            noteData.push(html);
        }
    });
    localStorage.setItem("noteData", JSON.stringify(noteData));
}
function getSelectedText(){
    selectedText=window.getSelection().toString();
    rangeAt=window.getSelection().getRangeAt(0);
}
function getSelectedStyle(e){
    if(selectedText){
    let div=document.createElement("span");
    div.classList.add(e);
    div.innerHTML=selectedText;
    rangeAt.deleteContents();
    rangeAt.insertNode(div);
}
}
function DeleteNode(e){
    let confirmed=confirm("Are you sure? Do you want to delete it?");
    if(confirmed){
        e.parentNode.parentNode.remove();
        SaveNoteData();
    }
}

