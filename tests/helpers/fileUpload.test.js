import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: 'dsg0bfdfz',
    api_key: '276872956671978',
    api_secret: 'ryFSPWftn2vnPi1CSAoQHfxtpbM',
    secure: true
});

describe('Pruebas en fileUpload', () => { 

    test('debe subir el archivo correctamente a cloudinary', async () => { 

        const imageUrl = 'https://cdn.create.vista.com/api/media/small/75333089/stock-photo-sumatran-orangutan-pongo-abelii';

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.jpg');

        const url = await fileUpload(file);
        expect(typeof url).toBe('string');
   
        const segments = url.split('/');
        const imageId = segments[segments.length - 1].replace('.jpg', '');

        await cloudinary.api.delete_resources([imageId], {
            resource_type: 'image'
        });

    });

    test('debe retornar null', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload(file);
        expect(url).toBe(null);
    });
})