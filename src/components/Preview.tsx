import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

interface ImgPreview {
  images: string[];
  className?: string;
}

export function PreviewAll({ images, className }: ImgPreview) {
  return (
    <PhotoProvider>
      <div className={className}>
        {images.map((item, index) => (
          <PhotoView key={index} src={item}>
            <img src={item} alt="" />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}

export function Preview({ images, className }: ImgPreview) {
  return (
    <PhotoProvider>
      <div className={`relative ${className}`}>
        {images.length > 0 && (
          <PhotoView src={images[0]}>
            <div className="relative group">
              <img
                className="cursor-pointer h-[280px] w-full"
                src={images[0]}
                alt="Gallery Thumbnail"
              />
              <div className="cursor-pointer absolute inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-white text-lg">
                  Click for more images
                </span>
              </div>
            </div>
          </PhotoView>
        )}

        {images.slice(1).map((item, index) => (
          <PhotoView key={index + 1} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}

export function PreviewText({ images, className }: ImgPreview) {
  return (
    <PhotoProvider>
      <div className={`relative ${className}`}>
        {images.length > 0 && (
          <PhotoView src={images[0]}>
            <div className="relative group">
              <p>View</p>
            </div>
          </PhotoView>
        )}

        {images.slice(1).map((item, index) => (
          <PhotoView key={index + 1} src={item}>
            <span style={{ display: "none" }} />
          </PhotoView>
        ))}
      </div>
    </PhotoProvider>
  );
}
