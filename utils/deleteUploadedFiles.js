import fs from "fs";
const deleteUploadedFiles = (files) => {
  files.forEach((file) => {
    const filePath = file.path;
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error(`Failed to delete file ${filePath}:`, err);
      }
    });
  });
};

export { deleteUploadedFiles };
