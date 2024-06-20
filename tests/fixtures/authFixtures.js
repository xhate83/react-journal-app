
export const initialState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState = {
    status: 'authenticated',
    uid: '123abc',
    email: 'test@gmail.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg',
    errorMessage: null
}

export const notAuthenticatedState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const testUser = {
    uid: '123abc',
    email: 'test@gmail.com',
    displayName: 'Test User',
    photoURL: 'https://example.com/photo.jpg'
}
