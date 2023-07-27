const cl=console.log;

const stdForm=document.getElementById("stdForm")
const stdTable=document.getElementById("stdTable")
const fnameControl=document.getElementById("fname")
const lnameControl=document.getElementById("lname")
const emailControl=document.getElementById("email")
const contactControl=document.getElementById("contact")
const submitBtn=document.getElementById("submitBtn")
const updateBtn=document.getElementById("updateBtn")
const stdList=document.getElementById("stdList")
const para=document.getElementById("para")


// cl(stdArr)
const trTemplating=(arr)=>{
    let result="";
    arr.forEach((obj,i) => {
        result +=`<tr id="${obj.stdId}">
                      <td>${i+1}</td>
                      <td>${obj.fname}</td>
                      <td>${obj.lname}</td>
                      <td>${obj.email}</td>
                      <td>${obj.contact}</td>
                      <td class="text-center"><i class="fa-solid fa-pen-to-square edit text-info" onclick="onEdit(this)"></i></td>
                      <td class="text-center"><i class="fa-solid fa-trash-can delete text-danger" onclick="onDelete(this)"></i></td>
                  </tr> `
    });
stdList.innerHTML=result
}
function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }
 let stdArr= [];
if (localStorage.getItem("stdArr") || JSON.parse(localStorage.getItem("stdArr")).length ) {
  stdArr=JSON.parse(localStorage.getItem("stdArr"));
    trTemplating(stdArr);
    para.innerHTML=`No. of students are ${stdArr.length}`
}else{
 
  para.innerHTML=`No Student Data Added Yet!!!`
  stdTable.classList.add("d-none")

}
const onStdAdd=(eve)=>{
eve.preventDefault();
    let stdObj={
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        stdId:uuidv4()
    }
   stdArr.push(stdObj);
   trTemplating(stdArr)
   localStorage.setItem("stdArr",JSON.stringify(stdArr))
   eve.target.reset();
   para.innerHTML=`No. of students are ${stdArr.length}`
   stdTable.classList.remove("d-none")
}
const onEdit=(eve)=>{
    let editId=eve.closest("tr").id
    let editObj=stdArr.find((obj)=>{
       return ( obj.stdId===editId)
     })
    localStorage.setItem("editObj", JSON.stringify(editObj))
    fnameControl.value=editObj.fname;
    lnameControl.value=editObj.lname;
    emailControl.value=editObj.email;
    contactControl.value=editObj.contact;
    submitBtn.classList.add("d-none")
    updateBtn.classList.remove("d-none")
    }
    const onUpdate=(eve)=>{
        let editedObj=JSON.parse(localStorage.getItem("editObj"))
        stdArr.forEach(obj=>{
          if(obj.stdId === editedObj.stdId){
            obj.fname=fnameControl.value;
            obj.lname=lnameControl.value;
            obj.email=emailControl.value;
            obj.contact=contactControl.value;
          }
        })
        localStorage.setItem("stdArr", JSON.stringify(stdArr))
       let tr=[...document.getElementById(editedObj.stdId).children]
       tr[1].innerHTML=fnameControl.value;
       tr[2].innerHTML=lnameControl.value;
       tr[3].innerHTML=emailControl.value;
       tr[4].innerHTML=contactControl.value;
        Swal.fire({
          icon: 'success',
          text: `Hello ${fnameControl.value.toUpperCase()} ${lnameControl.value.toUpperCase()}, Your informaton is updated succesfully!`,
          timer:3000
        })
        stdForm.reset()
        submitBtn.classList.remove("d-none")
      updateBtn.classList.add("d-none")
      }
      const onDelete=(eve)=>{
        let tr=eve.closest("tr")
        if (confirm("Are you sure")) {
          stdArr=stdArr.filter(obj=> obj.stdId != tr.id)
          localStorage.setItem("stdArr", JSON.stringify(stdArr))
          Swal.fire({
            icon: 'success',
            text: `Hello ${tr.children[1].innerText} ${tr.children[2].innerText}, Your information is deleted successfully`,
            timer:3000
          })
          tr.remove()
        } else {
          return false;
        }
      
         if(stdArr.length) {
            para.innerHTML=`No. of students are ${stdArr.length}`
         }else{         
            para.innerHTML=`No Student Data Added Yet!!!`
            stdTable.classList.add("d-none")
         }
      }
updateBtn.addEventListener("click", onUpdate)
stdForm.addEventListener("submit", onStdAdd)