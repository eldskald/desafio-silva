export function getModal() {
    return document.querySelector("dialog");
}

export function popupMessage(message) {
    const modal = getModal();
    modal.innerHTML = message;

    const btnContainer = document.createElement("div");
    btnContainer.className = "flex flex-row justify-center mt-4";
    const btn = document.createElement("button");
    btn.innerHTML = "Ok";
    btn.className = `
        rounded-sm px-2 duration-100 ease-in-out hover:brightness-150
        bg-teal-800 text-stone-300 focus:brightness-150 focus:outline-none
        active:shadow-inner active:shadow-black active:scale-90
    `;
    btn.onclick = () => modal.close();
    btnContainer.appendChild(btn);

    modal.appendChild(btnContainer);
    modal.showModal();
}
