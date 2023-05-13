export const toastifyMessage = (message, type) => {

    // @ts-ignore
    Toastify({
        text: message,
        duration: 3000,
        // close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: type === 'success' ? "linear-gradient(to right, #00b09b, #96c93d)" : "linear-gradient(to right, #b00000, #c93d3d)",
        },
        onClick: function(){} // Callback after click
    }).showToast();
}