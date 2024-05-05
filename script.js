const form = document.getElementById("generate-form")
const qrcode = document.getElementById("qrcode")

const GenerateQRCode = (url, size) => {
    const qr = new QRCode(qrcode, {
        text: url,
        width: size,
        height: size
    })
}

const clearUI = () => {
    qrcode.innerHTML = ""
    const saveBtn = document.getElementById("save-link")
    if(saveBtn) saveBtn.remove()
}

const createSaveBtn = (saveUrl) => {
    const link = document.createElement("a")
    link.id = "save-link"
    link.classList = "bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5";
    link.href = saveUrl;
    link.download = "qrcode";
    link.innerHTML = "Save Image"
    document.getElementById("generated").appendChild(link);
}

const onGenerateSubmit = (e) => {
    e.preventDefault()
    clearUI()
    
    const url = document.getElementById("url").value.trim();
    const size = document.getElementById("size").value.trim();

    if(url === "") {
        alert("Please enter a valid url")
    } else {
        spinner(true)

        setTimeout(() => {
            spinner(false)
            GenerateQRCode(url, size)

            
            setTimeout(() => {
                const qrImg = qrcode.querySelector("img")
                createSaveBtn(qrImg.src)
            }, 50)
        }, 1000)
    }
}

const spinner = (visible) => {
    const spinner = document.getElementById("spinner")
    visible ? spinner.style.display = "block" : spinner.style.display = "none";
}
spinner(false)

form.addEventListener("submit",  onGenerateSubmit)