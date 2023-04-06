import express, { Request, Response} from 'express'
import multer from 'multer'
import Jimp from 'jimp';
import { Photo, PhotoDoc } from '../models/photo'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.get('/api/photo', [], async (req: Request, res: Response) => {
    const photos = await Photo.find({})
    return res.render('imagePage',{items: photos})
})

router.post('/api/photo', upload.array('photos', 12), async (req: Request, res: Response) => {
    if (!req.files) return res.status(400).send("Missing files.")

    const photos = req.files instanceof Array ? req.files : req.files['photos']

    const savedPhotos: PhotoDoc[] = []

    try{
        photos.forEach(photo => {
            const photoToSave = Photo.build({ filename: photo.originalname, 
                file: { 
                    data: photo.buffer, 
                    contentType: photo.mimetype
                },
                uploadTime: new Date() })
            photoToSave.save()
            savedPhotos.push(photoToSave)
            // tslint:disable-next-line: no-console
            console.log(`Saved photo: ${photoToSave.filename}.`)
        })
        return res.status(201).send(savedPhotos)
    }catch (err){
        let errorMessage = "Failed to do something exceptional.";
        if (err instanceof Error) {
          errorMessage = err.message;
        }
        return res.status(400).send(`Error: ${errorMessage}`).end();
    }
})

router.delete('/api/photo', async (req: Request, res: Response) => {
    const photos = await Photo.deleteMany({})
    return res.send(photos)
})

export { router as photoRouter }