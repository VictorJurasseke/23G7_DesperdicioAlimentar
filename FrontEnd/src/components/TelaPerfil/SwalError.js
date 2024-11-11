
export const SwalErroToken = (navigate, error) => {
    console.log("Ocorreu o seguinte erro:", error.response.status)
    if (error.response.status = 403 || error.response.status == 501 || error.response.status == 401) {

        let timerInterval;
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            icon: "error",
            title: `Sua sessão expirou ou ocorreu um erro!`,
            html: "Enviando para tela de login em <b></b> milliseconds.",
            timer: 2000,
            timerProgressBar: true,
            allowOutsideClick: false,  // Impede fechar clicando fora
            allowEscapeKey: false,     // Impede fechar com ESC
            allowEnterKey: false,      // Impede fechar com Enter
            showCancelButton: false,   // Remove botão de cancelar
            didOpen: () => {
                Swal.showLoading();
                const timer = Swal.getPopup().querySelector("b");
                timerInterval = setInterval(() => {
                    timer.textContent = `${Math.floor(Swal.getTimerLeft() / 1000)}`; // Mostra o tempo restante em segundos
                }, 100);
            },
            willClose: () => {
                clearInterval(timerInterval);
            }
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {

                // localStorage.removeItem("token"); // Remove o token
                // navigate('/login');
            }
        });
    } else {
        console.log("Ocorreu o seguinte erro:", error.response.status)
    }
}
