const api ="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"
const inp =document.getElementById("inp");
const images = document.querySelector('.images');

const getImage = async() =>{
    const methods = {
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${api}`
        },
        body:JSON.stringify(
            {
                "prompt":inp.value,
                "n":1,
                "size":"1024x1024"
            }
        )
    }
    const res = await fetch("https://api.openai.com/v1/images/generations",methods)
    const data = await res.json()
    const listImages = data.data;
    listImages.map(photo => {
        const container = document.createElement("div")
        images.appendChild(container)
        const img = document.createElement("img")
        container.appendChild(img)
        img.src= photo.url

    })
    console.log(data)
}
