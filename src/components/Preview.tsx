import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider, PhotoView } from "react-photo-view";

export function Preview({ images, className }: { images: string[], className?:string }) {
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
