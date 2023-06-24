const expenseform=document.getElementById('expenseform')
const expenselist=document.getElementById('expenselist')

async function delexpense(id){
    try{
        await axios.delete(`http://localhost:3000/expense/delexpense/${id}`)
        getExpense()
    }
    catch(err){
        console.log(err)
    }
}

async function getExpense(){
    try{
        const response=await axios.get("http://localhost:3000/expense/getexpense")
        let expenses=response.data

        expenselist.innerHTML=""

        for(let i=0;i<expenses.allexpenses.length;i++){
            const li=document.createElement('li')
            li.textContent=`AMOUNT : Rs.${expenses.allexpenses[i].amount} ==> DESCRIPTION : ${expenses.allexpenses[i].description} ==> CATEGORY : ${expenses.allexpenses[i].category}`
            expenselist.appendChild(li)

            const delbtn = document.createElement('button');
            delbtn.textContent = "Remove"
            li.appendChild(delbtn)

            delbtn.addEventListener('click', () => {
                delexpense(expenses.allexpenses[i].id)
            })
        }
    }
    catch(err){
        console.log(err)
    }
}

async function addexpense(amount,description,category){
    try{
        let expense={
            amount,
            description,
            category
        }
        await axios.post("http://localhost:3000/expense/addexpense",expense)
        getExpense()
    }
    catch(err){
        console.log(err)
    }
}

expenseform.addEventListener('submit',(e)=>{
    e.preventDefault()

    let amount=document.getElementById('amount').value
    let description=document.getElementById('description').value
    let category=document.getElementById('category').value

    addexpense(amount,description,category)

    amount=""
    description=""
    category=""
})

document.addEventListener('DOMContentLoaded',getExpense)