import { FC, useRef } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import { Photo } from '@/models/product';
import './index.scss';

interface Props {
	images: Photo[];
	photo: {
		url_part: string;
		url_part2: string;
	};
}

// Extend the ImageGallery type to include the toggleFullScreen method
type ImageGalleryWithMethods = {
	toggleFullScreen: () => void;
};

export const ReactImageGallery: FC<Props> = ({ photo, images = [] }) => {
	const imageGalleryRef = useRef<ImageGalleryWithMethods | null>(null);

	const onePhoto: ReactImageGalleryItem = {
		original: photo.url_part,
		thumbnail: photo.url_part2,
	};

	const imgArr: ReactImageGalleryItem[] = images.map((item) => ({
		original: item.big,
		thumbnail: item.small,
	}));

	const items = [ onePhoto, ...imgArr ];

	const onClickHandler = () => {
		imageGalleryRef.current?.toggleFullScreen();
	};

	return (
		<div className="max-w-72 mx-auto">
			<ImageGallery
				items={ items }
				showPlayButton={ false }
				ref={ imageGalleryRef as any } // safe because we control the type above
				onClick={ onClickHandler }
				showThumbnails={ items.length > 1 }
			/>
		</div>
	);
};
