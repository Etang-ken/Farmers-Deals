export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const isValidPassword = (pwd) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(pwd)
}

export const isValidPhoneNumber = (num) => {
    return /^\d+$/.test(num)
}

export const isValidCode = (num) => {
    return /^\d+$/.test(num)
}
