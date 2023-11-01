import multer from 'multer';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    
    const folder = determineFolder(req.path);
    cb(null, `public/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

// Configura el middleware Multer
const upload = multer({
  storage: storage,
});

function determineFolder(path) {
  // Determina la carpeta en función de la ruta de la solicitud
  if (path.includes('/profile')) {
    return 'profiles';
  } else if (path.includes('/product')) {
    return 'products';
  } else if (path.includes('/document')) {
    return 'documents';
  } else {
    return 'unknown'; // Carpeta predeterminada para otros casos
  }
}

export default upload;
