// import useSWR from 'swr';

// const fetcher = (url) => fetch(url).then((res) => res.blob());

// const ImageCache = ({imageUrl}) => {
//   const { data: imageBlob } = useSWR(
//     imageUrl,
//     fetcher,
//     {
//       revalidateOnFocus: false,
//       dedupingInterval: 3600000, // 1 hour
//     }
//   );
// console.log("imageBlob", imageBlob, imageUrl);
//   if (imageBlob) {
//     const imageUrl = URL.createObjectURL(imageBlob);
//     return <img src={imageUrl} alt="Image" />;
//   }

//   return <div>Loading...</div>;
// };

import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const ImageCache = ({ imageUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchImage = async () => {
      try {
        const response = await axios.get(imageUrl, {
          responseType: "blob",
        });

        if (response.status === 402) {
          return "/images/placeholder.png";
        }

        if (mounted) {
          const blobUrl = URL.createObjectURL(response.data);
          setImageSrc(blobUrl);
          setLoading(false);
        }
      } catch (error) {
        if (mounted) {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchImage();

    return () => {
      mounted = false;
    };
  }, [imageUrl]);

  if (loading) {
    return <div>Cargando imagen...</div>;
  }

  if (error) {
    if (error?.response?.status === 402) {
      return (
        <Image
        src="/images/placeholder.png"
        alt="Imagen"
        layout="fill"
        className="rounded-xl object-cover"
      />
      )
    }

    return (
      <Image
        src={imageUrl}
        alt="Imagen"
        layout="fill"
        className="rounded-xl object-cover"
      />
    );
  }

  return;
};

export default ImageCache;
