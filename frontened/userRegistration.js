document.querySelector("#userForm").addEventListener("submit",(e) =>{
    e.preventDefault()

    console.log(document.querySelector("#userInput").value)
    socket.emit("userInit",({
        name: document.querySelector("#userInput").value,
        w:canvas.width,
        h:canvas.height
    }))

    document.querySelector("#userForm").style.display = "none";
})
