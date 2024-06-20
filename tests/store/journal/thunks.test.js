import { addNewEmptyNote, savingNewNote, setActiveNote } from "../../../src/store/journal/journalSlice";
import { startNewNote } from "../../../src/store/journal/thunks";
import { collection, deleteDoc, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../../../src/firebase/config";


describe('Pruebas en journal thunks', () => {

    const dispatch = jest.fn();
    const getState = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    })

    test('startNewNote debe crear una nueva nota en blanco', async () => {

        const uid = 'test-uid'
        getState.mockReturnValue({
            auth: {uid}
        });

        await startNewNote()(dispatch, getState);

        expect(dispatch).toHaveBeenCalledWith(savingNewNote())
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: [],
        }))

        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number),
            imageUrls: [],
        }));

        // Borrar las notas de prueba de firebase

        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);

        const docs = await getDocs(collectionRef);

        const deletePromises = [];

        docs.forEach(doc => {
            deletePromises.push(deleteDoc( doc.ref));
        });

        await Promise.all(deletePromises);
    })
})