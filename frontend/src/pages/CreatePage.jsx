import { toast } from 'react-toastify';
import InputField from '../components/InputField';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const navigate = useNavigate();

  // Formun gönderilmesi
  const handleSubmit = (e) => {
    // Sayfa yenilemeyi engelle
    e.preventDefault();

    // Inputlardaki verilerden bir obje oluşturma
    const form = new FormData(e.target);

    const data = Object.fromEntries(form.entries());

    // Veriyi API'te gönder.
    axios
      .post('http://127.0.0.1:5001/api/movies', data)
      .then(() => {
        // Bildirim ver
        toast.success('The Movie was Created Successfully');

        // Anasayfaya yönlendir
        navigate('/');
      })
      .catch(() => {
        // Bildirim ver
        toast.error('The Movie Could not be Created');
      });
  };

  return (
    <div className="grid place-items-center bg-yellow-600 h-[calc(100vh-81px)]">
      <div className="max-w-[1000px] grid grid-cols-1 sm:grid-cols-2  gap-10 bg-white rounded p-10 shadow-lg">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-8"
        >
          <h1 className="text-4xl font-bold mb-10">
          Create a Movie
          </h1>
  
          <InputField label="Title" type="text" name="title" />
          <InputField label="Genre" type="text" name="genre" />
          <InputField label="Raiting" type="number" name="rating" />
          <InputField label="Year" type="number" name="year" />
  
          <button className="bg-yellow-600 p-1 rounded-md text-white font-semibold hover:bg-yellow-500">
            Create
          </button>
        </form>
  
        <div className="flex items-center justify-center">
          <img
            className="rounded-full max-h-[300px]"
            src="movie-bg.jpg"
            alt="Movie Background"
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
