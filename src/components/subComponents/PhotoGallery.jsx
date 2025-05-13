// import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Image } from "@heroui/react";

const Gallery = ({ events }) => {
  // const galleryImages = useSelector((state) => state.galleryImages);

  const [galleryImages, setGalleryImages] = useState([]);
  useEffect(() => {
    const fetchGalleryImages = async () => {
      const response = await fetch(import.meta.env.VITE_GET_PHOTOS_URI);
      const data = await response.json();
      setGalleryImages(data.photos.slice(0, 9));
    };
    fetchGalleryImages();
  }, []);

  return (
    <div className="sm:px-10 px-5 ">
      <div className="grid gap-8 xl:px-16 md:px-8 px-5 xl:py-10 sm:py-10 py-5 bg-[#00000000] rounded-t-3xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[200px]">
        {galleryImages.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden hover:shadow-md hover:scale-95 hover:shadow-textColor1 rounded-xl transition-all duration-300 ease-in-out"
          >
            <img
              className="w-full h-full object-cover group-hover:opacity-50 group-hover:blur-sm transition duration-300"
              src={img.url.replace("/upload", "/upload/c_auto,g_auto,f_auto")}
              alt={img._id}
            />
            <div className="absolute inset-0 group-hover:bg-gradient-to-tr group-hover:from-textColor1/40 group-hover:to-transparent items-end justify-start px-5 py-3 invisible group-hover:visible flex">
              <div className="text-textColor2 dark:text-bgColor font-extrabold lg:text-2xl text-base">
                {events.find((event) => event._id === img.event_id)?.name || ""}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
