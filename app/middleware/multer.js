import multer from "multer";

const storage = multer.diskStorage({
  filename: (req, file, callback) => {
    callback(null, file.originalname); // This keeps the original file name
  },
});

export const upload = multer({ storage });
