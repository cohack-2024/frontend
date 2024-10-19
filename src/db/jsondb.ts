interface GeneratedImage {
  id: string;
  img: string;
  prompt: string;
  selectedText?: string;
}

const readJSONFile = () => {
  const data = localStorage.getItem("db");
  return data ? JSON.parse(data) : {};
};

const database: { [key: string]: GeneratedImage } = readJSONFile();

const addGeneratedImage = (generatedImage: GeneratedImage) => {
  database[generatedImage.id] = generatedImage;

  localStorage.setItem("db", JSON.stringify(database));
  // fs.writeFileSync('db.json', JSON.stringify(database, null, 2))
};

const db = {
  addGeneratedImage,
  database
};

export default db;