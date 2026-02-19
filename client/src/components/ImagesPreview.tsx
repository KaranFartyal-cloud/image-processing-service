import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useDarkMode } from "@/hooks/useDarkMode";

type Props = {
  previews: string[];
};

const ImagesPreview = ({ previews }: Props) => {
  const { isDarkEnabled } = useDarkMode();
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className={`${isDarkEnabled && "dark"}  w-full mt-6 mb-4 p-4 dark:bg-gray-700 rounded-lg shadow-inner`}
    >
      <CarouselContent className="w-full">
        {previews.map((src, index) => (
          <CarouselItem key={index} className="md:basis-1/4">
            <img
              key={index}
              src={src}
              alt={`preview-${index}`}
              className="h-40 w-full object-cover rounded-lg shadow"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ImagesPreview;
