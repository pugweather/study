export const isValidName = (value) => {
  return /^[a-zA-Z -]+$/.test(value.trim())
}

export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export const isValidPassword = (password) => {
  if (!/[a-zA-Z]/.test(password)) return false
  if (!/[0-9]/.test(password)) return false
  return true
}

export const isValidUsername = (username) => {
  return /^[a-zA-Z0-9_-]+$/.test(username)
}

export const startsAndEndsWithAlphanumeric = (value) => {
  return /^[a-zA-Z0-9].*[a-zA-Z0-9]$/.test(value)
}