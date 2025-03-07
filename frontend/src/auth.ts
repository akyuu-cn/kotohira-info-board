let login = false

export async function init() {
    const username = localStorage.getItem('username')
    const password = localStorage.getItem('password')
    if (username && password) {

        const res = await fetch('/api/v1/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })

        const data = await res.json()


        if (data.success) {
            document.getElementById("btn-login")!.style.display = "none"
            login = true
        } else {
            document.getElementById("btn-logout")!.style.display = "none"
        }

    } else {
        document.getElementById("btn-logout")!.style.display = "none"
    }

}

function hideAdminActions() {
    (document.querySelectorAll(".admin-actions") as NodeListOf<HTMLElement>).forEach(element => {
        element.style.display = "none"
    })
}

export function updateAdminElements() {
    if (!login) {
        hideAdminActions()
    }
}